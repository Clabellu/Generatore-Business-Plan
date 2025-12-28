"""
Test completo per il sistema di gestione crediti
Testa aggiunta, consumo, verifica e storico crediti

Uso: python3 test_credits.py
"""
from app import app
from database import db
from models import User, Credit, Order
from credits import (
    aggiungi_crediti,
    consuma_credito,
    verifica_crediti,
    get_storico_crediti,
    get_pacchetti_crediti,
    get_pacchetto_by_id,
    calcola_totale_crediti_acquistati,
    calcola_totale_crediti_consumati
)

print("\n" + "="*70)
print("TEST SISTEMA CREDITI - Business Plan Generator")
print("="*70 + "\n")

def test_credits():
    """Test completo del sistema crediti"""

    with app.app_context():

        # ========== SETUP: Crea utente test ==========
        print("🔧 Setup: Creazione utente test...")

        # Rimuovi utente test se esiste
        existing = User.query.filter_by(email='credits_test@example.com').first()
        if existing:
            # Rimuovi crediti associati
            Credit.query.filter_by(user_id=existing.id).delete()
            Order.query.filter_by(user_id=existing.id).delete()
            db.session.delete(existing)
            db.session.commit()

        # Crea nuovo utente
        user = User(
            email='credits_test@example.com',
            nome='Credits',
            cognome='Test'
        )
        user.set_password('testpass123')
        db.session.add(user)
        db.session.commit()

        print(f"   ✅ Utente test creato: {user.email} (ID: {user.id})\n")

        # ========== TEST 1: Aggiunta crediti ==========
        print("1️⃣  Test: Aggiunta crediti brevi...")
        try:
            credito = aggiungi_crediti(user.id, 'breve', 5)
            assert credito.quantita == 5
            assert credito.tipo == 'breve'
            assert user.get_credits('breve') == 5
            print(f"   ✅ Aggiunti 5 crediti brevi")
            print(f"   ℹ️  Crediti disponibili: {user.get_credits('breve')}\n")
        except Exception as e:
            print(f"   ❌ Errore: {e}\n")
            return False

        # ========== TEST 2: Aggiunta crediti completi ==========
        print("2️⃣  Test: Aggiunta crediti completi...")
        try:
            credito = aggiungi_crediti(user.id, 'completo', 3)
            assert credito.quantita == 3
            assert credito.tipo == 'completo'
            assert user.get_credits('completo') == 3
            print(f"   ✅ Aggiunti 3 crediti completi")
            print(f"   ℹ️  Crediti disponibili: {user.get_credits('completo')}\n")
        except Exception as e:
            print(f"   ❌ Errore: {e}\n")
            return False

        # ========== TEST 3: Verifica crediti ==========
        print("3️⃣  Test: Verifica crediti disponibili...")
        verifica_brevi = verifica_crediti(user.id, 'breve', 1)
        verifica_completi = verifica_crediti(user.id, 'completo', 1)

        assert verifica_brevi['ha_crediti'] == True
        assert verifica_brevi['disponibili'] == 5
        assert verifica_completi['ha_crediti'] == True
        assert verifica_completi['disponibili'] == 3

        print(f"   ✅ Verifica crediti brevi: {verifica_brevi}")
        print(f"   ✅ Verifica crediti completi: {verifica_completi}\n")

        # ========== TEST 4: Consumo credito ==========
        print("4️⃣  Test: Consumo 1 credito breve...")
        try:
            consuma_credito(user.id, 'breve')
            crediti_rimanenti = user.get_credits('breve')
            assert crediti_rimanenti == 4
            print(f"   ✅ Credito consumato con successo")
            print(f"   ℹ️  Crediti rimanenti: {crediti_rimanenti}\n")
        except Exception as e:
            print(f"   ❌ Errore: {e}\n")
            return False

        # ========== TEST 5: Consumo multiplo ==========
        print("5️⃣  Test: Consumo multiplo (3 crediti brevi)...")
        try:
            consuma_credito(user.id, 'breve')
            consuma_credito(user.id, 'breve')
            consuma_credito(user.id, 'breve')
            crediti_rimanenti = user.get_credits('breve')
            assert crediti_rimanenti == 1
            print(f"   ✅ Consumati 3 crediti")
            print(f"   ℹ️  Crediti rimanenti: {crediti_rimanenti}\n")
        except Exception as e:
            print(f"   ❌ Errore: {e}\n")
            return False

        # ========== TEST 6: Tentativo consumo senza crediti ==========
        print("6️⃣  Test: Tentativo consumo senza crediti sufficienti...")
        try:
            # Consuma l'ultimo credito breve
            consuma_credito(user.id, 'breve')
            assert user.get_credits('breve') == 0

            # Prova a consumarne un altro (dovrebbe fallire)
            consuma_credito(user.id, 'breve')
            print("   ❌ Non ha rilevato crediti insufficienti!\n")
            return False
        except Exception as e:
            if "insufficienti" in str(e).lower():
                print(f"   ✅ Errore rilevato correttamente: {e}\n")
            else:
                print(f"   ❌ Errore inaspettato: {e}\n")
                return False

        # ========== TEST 7: Storico crediti ==========
        print("7️⃣  Test: Storico movimenti crediti...")
        storico = get_storico_crediti(user.id)
        print(f"   ✅ Storico recuperato: {len(storico)} movimenti")

        # Dovremmo avere:
        # - 1 aggiunta di 5 crediti brevi
        # - 1 aggiunta di 3 crediti completi
        # - 5 consumi di crediti brevi (4 + 1 che ha svuotato)
        assert len(storico) >= 7

        for movimento in storico[:3]:  # Mostra i primi 3
            segno = "+" if movimento.quantita > 0 else "-"
            print(f"   {segno} {abs(movimento.quantita)} crediti '{movimento.tipo}' - {movimento.created_at.strftime('%Y-%m-%d %H:%M')}")
        print()

        # ========== TEST 8: Pacchetti disponibili ==========
        print("8️⃣  Test: Recupero pacchetti crediti...")
        pacchetti = get_pacchetti_crediti()
        assert len(pacchetti) == 4
        print(f"   ✅ Trovati {len(pacchetti)} pacchetti:")
        for pac in pacchetti:
            print(f"      - {pac['nome']}: €{pac['prezzo']:.2f} ({pac['quantita']} crediti)")
        print()

        # ========== TEST 9: Recupero pacchetto specifico ==========
        print("9️⃣  Test: Recupero pacchetto per ID...")
        pacchetto = get_pacchetto_by_id('completo_singolo')
        assert pacchetto is not None
        assert pacchetto['tipo'] == 'completo'
        assert pacchetto['quantita'] == 1
        assert pacchetto['prezzo'] == 59.90
        print(f"   ✅ Pacchetto trovato: {pacchetto['nome']}")
        print(f"   ℹ️  Prezzo: €{pacchetto['prezzo']:.2f}\n")

        # ========== TEST 10: Calcolo totali ==========
        print("🔟 Test: Calcolo totali crediti...")
        totali_acquistati = calcola_totale_crediti_acquistati(user.id)
        totali_consumati = calcola_totale_crediti_consumati(user.id)

        print(f"   ✅ Totale acquistati: {totali_acquistati}")
        print(f"   ✅ Totale consumati: {totali_consumati}")

        # Verifica calcoli
        assert totali_acquistati['brevi'] == 5
        assert totali_acquistati['completi'] == 3
        assert totali_consumati['brevi'] == 5  # Abbiamo consumato tutti i 5 crediti brevi
        assert totali_consumati['completi'] == 0
        print()

        # ========== TEST 11: Validazione tipo errato ==========
        print("1️⃣1️⃣  Test: Validazione tipo credito errato...")
        try:
            aggiungi_crediti(user.id, 'invalido', 1)
            print("   ❌ Non ha rilevato tipo errato!\n")
            return False
        except ValueError as e:
            if "tipo" in str(e).lower():
                print(f"   ✅ Validazione corretta: {e}\n")
            else:
                print(f"   ❌ Errore inaspettato: {e}\n")
                return False

        # ========== TEST 12: Validazione quantità negativa ==========
        print("1️⃣2️⃣  Test: Validazione quantità negativa...")
        try:
            aggiungi_crediti(user.id, 'breve', -5)
            print("   ❌ Non ha rilevato quantità negativa!\n")
            return False
        except ValueError as e:
            if "positiv" in str(e).lower():
                print(f"   ✅ Validazione corretta: {e}\n")
            else:
                print(f"   ❌ Errore inaspettato: {e}\n")
                return False

        return True


# Esegui i test
try:
    print("🚀 Avvio test sistema crediti...\n")

    success = test_credits()

    if success:
        print("="*70)
        print("✅ TUTTI I TEST COMPLETATI CON SUCCESSO!")
        print("="*70 + "\n")

        print("📋 RIEPILOGO SISTEMA CREDITI:")
        print("="*70)
        print("Funzionalità implementate:")
        print("  ✓ aggiungi_crediti() - Aggiunge crediti a un utente")
        print("  ✓ consuma_credito() - Consuma 1 credito (con validazione)")
        print("  ✓ verifica_crediti() - Verifica disponibilità crediti")
        print("  ✓ get_storico_crediti() - Storico movimenti")
        print("  ✓ get_pacchetti_crediti() - Lista pacchetti disponibili")
        print("  ✓ get_pacchetto_by_id() - Dettaglio pacchetto")
        print("  ✓ calcola_totale_crediti_acquistati() - Totale acquisti")
        print("  ✓ calcola_totale_crediti_consumati() - Totale consumi")
        print("\nValidazioni implementate:")
        print("  ✓ Tipo credito deve essere 'breve' o 'completo'")
        print("  ✓ Quantità deve essere positiva")
        print("  ✓ Verifica crediti sufficienti prima del consumo")
        print("  ✓ Utente deve esistere nel database")
        print("\nPacchetti disponibili:")
        print("  • Business Plan Breve (1x): €29.90")
        print("  • Business Plan Completo (1x): €59.90")
        print("  • Pack 10 Brevi: €249.00 (risparmi €50)")
        print("  • Pack 10 Completi: €499.00 (risparmi €100)")
        print("="*70 + "\n")

        print("🌐 PROSSIMI PASSI:")
        print("="*70)
        print("1. Avvia l'app: python3 app.py")
        print("2. Login con il tuo account")
        print("3. Vai alla dashboard")
        print("4. Clicca su 'Vai allo Shop' per acquistare crediti")
        print("5. Seleziona un pacchetto e conferma")
        print("6. I crediti verranno aggiunti istantaneamente")
        print("\n📌 NOTA: Sistema pronto per STEP 4 (Integrazione Stripe)")
        print("   Al momento i pagamenti sono simulati (test mode)")
        print("="*70 + "\n")

        import sys
        sys.exit(0)
    else:
        print("="*70)
        print("❌ ALCUNI TEST SONO FALLITI")
        print("="*70 + "\n")
        import sys
        sys.exit(1)

except Exception as e:
    print(f"\n❌ ERRORE DURANTE I TEST: {e}\n")
    import traceback
    traceback.print_exc()
    import sys
    sys.exit(1)

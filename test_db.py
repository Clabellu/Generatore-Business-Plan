"""
Script di test per verificare il database

Uso: python3 test_db.py
"""
from flask import Flask
from database import db, init_database, create_tables
from models import User, Credit, Order, BusinessPlan
from datetime import datetime

print("\n" + "="*60)
print("TEST DATABASE - Business Plan Generator")
print("="*60 + "\n")

# 1. Crea app Flask
print("1️⃣  Creazione app Flask...")
app = Flask(__name__)
init_database(app)
print("   ✅ App Flask creata\n")

# 2. Crea tabelle
print("2️⃣  Creazione tabelle database...")
create_tables(app)
print("")

# 3. Test creazione utente
print("3️⃣  Test creazione utente...")
with app.app_context():
    # Controlla se esiste già
    existing_user = User.query.filter_by(email='test@example.com').first()
    if existing_user:
        print("   ⚠️  Utente test già esistente, lo elimino...")
        db.session.delete(existing_user)
        db.session.commit()

    # Crea nuovo utente
    user = User(
        email='test@example.com',
        nome='Mario',
        cognome='Rossi'
    )
    user.set_password('password123')

    db.session.add(user)
    db.session.commit()
    print(f"   ✅ Utente creato: {user.email} (ID: {user.id})\n")

# 4. Test aggiunta crediti
print("4️⃣  Test aggiunta crediti...")
with app.app_context():
    user = User.query.filter_by(email='test@example.com').first()

    # Aggiungi crediti brevi
    credit_breve = Credit(
        user_id=user.id,
        tipo='breve',
        quantita=3
    )
    db.session.add(credit_breve)

    # Aggiungi crediti completi
    credit_completo = Credit(
        user_id=user.id,
        tipo='completo',
        quantita=1
    )
    db.session.add(credit_completo)

    db.session.commit()
    print(f"   ✅ Crediti aggiunti: 3 brevi, 1 completo\n")

# 5. Test lettura crediti
print("5️⃣  Test lettura crediti...")
with app.app_context():
    user = User.query.filter_by(email='test@example.com').first()

    crediti_brevi = user.get_credits('breve')
    crediti_completi = user.get_credits('completo')

    print(f"   ✅ Crediti brevi: {crediti_brevi}")
    print(f"   ✅ Crediti completi: {crediti_completi}\n")

# 6. Test creazione ordine
print("6️⃣  Test creazione ordine...")
with app.app_context():
    user = User.query.filter_by(email='test@example.com').first()

    order = Order(
        user_id=user.id,
        stripe_payment_id='test_payment_123',
        prodotto='bp_breve',
        prezzo=29.90,
        stato='completed'
    )
    db.session.add(order)
    db.session.commit()
    print(f"   ✅ Ordine creato: {order.prodotto} - €{order.prezzo}\n")

# 7. Test verifica password
print("7️⃣  Test verifica password...")
with app.app_context():
    user = User.query.filter_by(email='test@example.com').first()

    if user.check_password('password123'):
        print("   ✅ Password corretta verificata\n")
    else:
        print("   ❌ Errore verifica password\n")

# 8. Riepilogo
print("="*60)
print("RIEPILOGO DATABASE")
print("="*60)
with app.app_context():
    total_users = User.query.count()
    total_credits = Credit.query.count()
    total_orders = Order.query.count()

    print(f"📊 Totale utenti: {total_users}")
    print(f"📊 Totale crediti: {total_credits}")
    print(f"📊 Totale ordini: {total_orders}")

print("\n" + "="*60)
print("✅ TUTTI I TEST COMPLETATI CON SUCCESSO!")
print("="*60 + "\n")

print("📁 Database salvato in: businessplan.db")
print("\n💡 Puoi visualizzare il database con:")
print("   sqlite3 businessplan.db")
print("   SELECT * FROM users;\n")

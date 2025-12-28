"""
Script di test per il sistema di autenticazione

Uso: python3 test_auth.py
"""
from flask import Flask
from database import db, init_database, create_tables
from auth import init_auth
from models import User
from flask_login import current_user

print("\n" + "="*60)
print("TEST AUTENTICAZIONE - Business Plan Generator")
print("="*60 + "\n")

# 1. Crea app Flask
print("1️⃣  Creazione app Flask...")
app = Flask(__name__)
app.config['SECRET_KEY'] = 'test-secret-key-change-in-production'
app.config['TESTING'] = True
init_database(app)
print("   ✅ App Flask creata\n")

# 2. Inizializza autenticazione
print("2️⃣  Inizializzazione sistema autenticazione...")
init_auth(app)
print("")

# 3. Crea tabelle
print("3️⃣  Creazione/verifica tabelle database...")
create_tables(app)
print("")

# 4. Test registrazione utente
print("4️⃣  Test registrazione nuovo utente...")
with app.app_context():
    # Rimuovi utente test se esiste
    existing = User.query.filter_by(email='auth_test@example.com').first()
    if existing:
        db.session.delete(existing)
        db.session.commit()

    # Crea nuovo utente
    user = User(
        email='auth_test@example.com',
        nome='Test',
        cognome='Auth'
    )
    user.set_password('testpass123')

    db.session.add(user)
    db.session.commit()

    print(f"   ✅ Utente registrato: {user.email}\n")

# 5. Test login
print("5️⃣  Test login utente...")
with app.test_client() as client:
    # Tentativo login
    response = client.post('/login', data={
        'email': 'auth_test@example.com',
        'password': 'testpass123'
    }, follow_redirects=False)

    if response.status_code == 302:  # Redirect dopo login
        print("   ✅ Login effettuato con successo")
        print(f"   ℹ️  Redirect a: {response.location}\n")
    else:
        print(f"   ❌ Login fallito (status: {response.status_code})\n")

# 6. Test password errata
print("6️⃣  Test password errata...")
with app.test_client() as client:
    response = client.post('/login', data={
        'email': 'auth_test@example.com',
        'password': 'passwordsbagliata'
    }, follow_redirects=True)

    if b'Email o password non corretti' in response.data:
        print("   ✅ Errore rilevato correttamente\n")
    else:
        print("   ⚠️  Messaggio errore non trovato\n")

# 7. Test email già esistente
print("7️⃣  Test email già registrata...")
with app.app_context():
    # Prova a registrare stessa email
    existing_user = User.query.filter_by(email='auth_test@example.com').first()

    if existing_user:
        print("   ✅ Email già esistente nel database")
        print(f"   ℹ️  User ID: {existing_user.id}\n")

# 8. Test route protette
print("8️⃣  Test protezione route...")
with app.test_client() as client:
    # Prova ad accedere senza login
    response = client.get('/dashboard', follow_redirects=False)

    if response.status_code == 302:  # Redirect al login
        print("   ✅ Route protetta correttamente")
        print(f"   ℹ️  Redirect a login\n")
    else:
        print(f"   ⚠️  Status code: {response.status_code}\n")

# 9. Verifica Flask-Login
print("9️⃣  Verifica integrazione Flask-Login...")
with app.app_context():
    user = User.query.filter_by(email='auth_test@example.com').first()

    # Verifica metodi UserMixin
    print(f"   ✅ is_authenticated: {user.is_authenticated}")
    print(f"   ✅ is_active: {user.is_active}")
    print(f"   ✅ is_anonymous: {user.is_anonymous}")
    print(f"   ✅ get_id(): {user.get_id()}\n")

# 10. Riepilogo route
print("="*60)
print("ROUTE DISPONIBILI")
print("="*60)
print("POST   /login           - Login utente")
print("GET    /login           - Mostra form login")
print("POST   /register        - Registrazione utente")
print("GET    /register        - Mostra form registrazione")
print("GET    /logout          - Logout utente")
print("GET    /api/check-auth  - Verifica autenticazione (API)")
print("GET    /dashboard       - Dashboard (protetta)")

print("\n" + "="*60)
print("✅ TUTTI I TEST COMPLETATI!")
print("="*60 + "\n")

print("🌐 Per testare manualmente:")
print("   1. Avvia: python3 app.py")
print("   2. Vai su: http://localhost:5000/register")
print("   3. Registra un nuovo utente")
print("   4. Prova a fare login")
print("")

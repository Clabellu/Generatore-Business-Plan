"""
Sistema di autenticazione per Business Plan Generator
Gestisce login, logout, registrazione e protezione route
"""
from flask import Blueprint, render_template, request, redirect, url_for, flash, jsonify
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from models import User
from database import db

# Crea Blueprint per le route di autenticazione
auth_bp = Blueprint('auth', __name__)

# Inizializza Flask-Login
login_manager = LoginManager()


def init_auth(app):
    """
    Inizializza il sistema di autenticazione

    Args:
        app: Istanza Flask
    """
    login_manager.init_app(app)
    login_manager.login_view = 'auth.login'
    login_manager.login_message = 'Devi effettuare il login per accedere a questa pagina.'
    login_manager.login_message_category = 'info'

    # Registra il blueprint
    app.register_blueprint(auth_bp)

    print("✅ Sistema autenticazione inizializzato")


@login_manager.user_loader
def load_user(user_id):
    """
    Carica l'utente dalla sessione
    Richiesto da Flask-Login
    """
    return User.query.get(int(user_id))


# ============================================================================
# ROUTE REGISTRAZIONE
# ============================================================================

@auth_bp.route('/register', methods=['GET', 'POST'])
def register():
    """
    Pagina e gestione registrazione nuovo utente
    """
    # Se già loggato, redirect alla dashboard
    if current_user.is_authenticated:
        return redirect(url_for('dashboard'))

    if request.method == 'POST':
        # Ottieni dati dal form
        email = request.form.get('email', '').strip().lower()
        password = request.form.get('password', '')
        password_confirm = request.form.get('password_confirm', '')
        nome = request.form.get('nome', '').strip()
        cognome = request.form.get('cognome', '').strip()

        # Validazioni
        errors = []

        if not email or '@' not in email:
            errors.append('Email non valida')

        if not password or len(password) < 6:
            errors.append('La password deve essere di almeno 6 caratteri')

        if password != password_confirm:
            errors.append('Le password non corrispondono')

        # Controlla se email già esiste
        if User.query.filter_by(email=email).first():
            errors.append('Email già registrata')

        # Se ci sono errori, mostra messaggio
        if errors:
            for error in errors:
                flash(error, 'error')
            return render_template('register.html')

        # Crea nuovo utente
        user = User(
            email=email,
            nome=nome,
            cognome=cognome
        )
        user.set_password(password)

        # Salva nel database
        db.session.add(user)
        db.session.commit()

        # Login automatico dopo registrazione
        login_user(user)

        flash('Registrazione completata con successo!', 'success')
        return redirect(url_for('dashboard'))

    # GET request - mostra form registrazione
    return render_template('register.html')


# ============================================================================
# ROUTE LOGIN
# ============================================================================

@auth_bp.route('/login', methods=['GET', 'POST'])
def login():
    """
    Pagina e gestione login
    """
    # Se già loggato, redirect alla dashboard
    if current_user.is_authenticated:
        return redirect(url_for('dashboard'))

    if request.method == 'POST':
        email = request.form.get('email', '').strip().lower()
        password = request.form.get('password', '')
        remember = request.form.get('remember', False) == 'on'

        # Trova utente
        user = User.query.filter_by(email=email).first()

        # Verifica credenziali
        if not user or not user.check_password(password):
            flash('Email o password non corretti', 'error')
            return render_template('login.html')

        # Verifica se account attivo
        if not user.is_active:
            flash('Account disabilitato. Contatta il supporto.', 'error')
            return render_template('login.html')

        # Login utente
        login_user(user, remember=remember)

        # Redirect alla pagina richiesta o dashboard
        next_page = request.args.get('next')
        if next_page:
            return redirect(next_page)

        flash(f'Benvenuto, {user.nome or user.email}!', 'success')
        return redirect(url_for('dashboard'))

    # GET request - mostra form login
    return render_template('login.html')


# ============================================================================
# ROUTE LOGOUT
# ============================================================================

@auth_bp.route('/logout')
@login_required
def logout():
    """
    Logout utente
    """
    logout_user()
    flash('Logout effettuato con successo', 'success')
    return redirect(url_for('index'))


# ============================================================================
# API ENDPOINT (per frontend JavaScript)
# ============================================================================

@auth_bp.route('/api/check-auth', methods=['GET'])
def check_auth():
    """
    Verifica se utente è autenticato (per chiamate AJAX)
    """
    if current_user.is_authenticated:
        return jsonify({
            'authenticated': True,
            'user': {
                'id': current_user.id,
                'email': current_user.email,
                'nome': current_user.nome,
                'cognome': current_user.cognome
            }
        })

    return jsonify({'authenticated': False}), 401

"""
Modelli database per Business Plan Generator
"""
from database import db
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash


class User(db.Model):
    """
    Modello Utente
    Gestisce registrazione, login e profilo utente
    """
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)
    nome = db.Column(db.String(100))
    cognome = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    email_verified = db.Column(db.Boolean, default=False)
    is_active = db.Column(db.Boolean, default=True)

    # Relazioni
    credits = db.relationship('Credit', backref='user', lazy='dynamic')
    orders = db.relationship('Order', backref='user', lazy='dynamic')
    business_plans = db.relationship('BusinessPlan', backref='user', lazy='dynamic')

    def set_password(self, password):
        """Hash della password"""
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        """Verifica password"""
        return check_password_hash(self.password_hash, password)

    def get_credits(self, tipo):
        """
        Ottieni crediti disponibili per tipo

        Args:
            tipo: 'breve' o 'completo'

        Returns:
            int: Numero di crediti disponibili
        """
        total = db.session.query(db.func.sum(Credit.quantita)).filter(
            Credit.user_id == self.id,
            Credit.tipo == tipo
        ).scalar()
        return total or 0

    def __repr__(self):
        return f'<User {self.email}>'


class Credit(db.Model):
    """
    Modello Crediti
    Gestisce i crediti acquistati dall'utente
    """
    __tablename__ = 'credits'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    tipo = db.Column(db.String(20), nullable=False)  # 'breve' o 'completo'
    quantita = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    expires_at = db.Column(db.DateTime, nullable=True)  # Opzionale: scadenza crediti

    def __repr__(self):
        return f'<Credit user_id={self.user_id} tipo={self.tipo} qty={self.quantita}>'


class Order(db.Model):
    """
    Modello Ordini
    Registra tutti gli acquisti effettuati
    """
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    stripe_payment_id = db.Column(db.String(255), unique=True, index=True)
    prodotto = db.Column(db.String(50), nullable=False)  # 'bp_breve', 'bp_completo', etc.
    prezzo = db.Column(db.Numeric(10, 2), nullable=False)
    stato = db.Column(db.String(20), default='pending')  # 'pending', 'completed', 'failed'
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    completed_at = db.Column(db.DateTime, nullable=True)

    def __repr__(self):
        return f'<Order {self.id} user={self.user_id} prodotto={self.prodotto}>'


class BusinessPlan(db.Model):
    """
    Modello Business Plan
    Salva tutti i business plan generati
    """
    __tablename__ = 'business_plans'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    tipo = db.Column(db.String(20), nullable=False)  # 'breve' o 'completo'
    titolo = db.Column(db.String(255))
    contenuto_text = db.Column(db.Text)  # Testo markdown
    contenuto_html = db.Column(db.Text)  # HTML renderizzato
    dati_input = db.Column(db.JSON)  # Dati originali dei 7 form
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<BusinessPlan {self.id} tipo={self.tipo}>'

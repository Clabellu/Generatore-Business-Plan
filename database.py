"""
Configurazione database per Business Plan Generator
"""
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

# Inizializza SQLAlchemy
db = SQLAlchemy()

def init_database(app):
    """
    Inizializza il database con l'applicazione Flask

    Args:
        app: Istanza Flask
    """
    # Configurazione database
    # Per sviluppo usiamo SQLite, per produzione PostgreSQL
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///businessplan.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Inizializza db con app
    db.init_app(app)

    return db


def create_tables(app):
    """
    Crea tutte le tabelle nel database

    Args:
        app: Istanza Flask
    """
    with app.app_context():
        db.create_all()
        print("✅ Tabelle database create con successo!")

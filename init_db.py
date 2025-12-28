"""
Script per inizializzare il database
Esegui questo file per creare tutte le tabelle

Uso: python3 init_db.py
"""
from flask import Flask
from database import db, init_database, create_tables
from models import User, Credit, Order, BusinessPlan

# Crea app Flask temporanea per inizializzare DB
app = Flask(__name__)

# Inizializza database
init_database(app)

# Crea tutte le tabelle
create_tables(app)

print("\n" + "="*50)
print("DATABASE INIZIALIZZATO CON SUCCESSO!")
print("="*50)
print("\nTabelle create:")
print("  ✓ users")
print("  ✓ credits")
print("  ✓ orders")
print("  ✓ business_plans")
print("\nFile database: businessplan.db")
print("="*50 + "\n")

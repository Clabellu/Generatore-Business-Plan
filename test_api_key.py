#!/usr/bin/env python3
"""
Test rapido per verificare la connessione con Anthropic
"""

import os
from dotenv import load_dotenv

# Carica il file .env
load_dotenv()

# Verifica API key
api_key = os.getenv("ANTHROPIC_API_KEY")

print("=" * 60)
print("TEST CONFIGURAZIONE ANTHROPIC")
print("=" * 60)
print()

if not api_key:
    print("❌ ERRORE: API key non trovata nel file .env")
    print()
    print("Soluzione:")
    print("1. Crea un file .env nella cartella principale")
    print("2. Aggiungi la riga:")
    print("   ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxx")
    print()
    exit(1)

if api_key == "your-api-key-here":
    print("❌ ERRORE: API key non configurata!")
    print()
    print("Hai lasciato il valore di default 'your-api-key-here'")
    print()
    print("Soluzione:")
    print("1. Vai su https://console.anthropic.com/")
    print("2. Crea una API key")
    print("3. Sostituisci 'your-api-key-here' nel file .env")
    print()
    exit(1)

print(f"✅ API key trovata: {api_key[:20]}...{api_key[-4:]}")
print()

# Prova a connettersi
print("🔄 Test connessione con Anthropic...")
print()

try:
    from anthropic import Anthropic

    client = Anthropic(api_key=api_key)

    # Test semplice senza prompt caching
    response = client.messages.create(
        model="claude-3-5-sonnet-20241022",  # Modello standard, funziona sempre
        max_tokens=50,
        messages=[
            {"role": "user", "content": "Rispondi solo con 'OK' se ricevi questo messaggio."}
        ]
    )

    result = response.content[0].text.strip()

    print("✅ Connessione riuscita!")
    print(f"✅ Risposta da Claude: {result}")
    print()
    print("=" * 60)
    print("TUTTO OK! L'API key funziona correttamente.")
    print("=" * 60)
    print()
    print("Il problema potrebbe essere:")
    print("1. Prompt Caching non disponibile per il tuo account")
    print("2. Un errore nei dati del form")
    print()
    print("Manda a Claude i log del server Flask per diagnosi.")

except Exception as e:
    print(f"❌ ERRORE durante il test:")
    print(f"   {e}")
    print()
    print("Possibili cause:")
    print("1. API key non valida")
    print("2. Nessuna connessione internet")
    print("3. Account Anthropic sospeso/disabilitato")
    print()
    print("Verifica su: https://console.anthropic.com/")
    exit(1)

#!/bin/bash
# Script di avvio per Generatore Business Plan

echo "================================================"
echo "  Generatore Business Plan - Avvio Server"
echo "================================================"
echo ""

# Verifica che l'API key sia configurata
if grep -q "your-api-key-here" .env 2>/dev/null; then
    echo "❌ ERRORE: API key non configurata!"
    echo ""
    echo "Per favore, modifica il file .env e inserisci la tua API key di Anthropic:"
    echo "  ANTHROPIC_API_KEY=sk-ant-..."
    echo ""
    echo "Ottieni una chiave gratuita su: https://console.anthropic.com/"
    exit 1
fi

# Verifica che il file .env esista
if [ ! -f .env ]; then
    echo "❌ ERRORE: File .env non trovato!"
    echo "Crea un file .env con la tua API key:"
    echo "  ANTHROPIC_API_KEY=sk-ant-..."
    exit 1
fi

echo "✅ Configurazione verificata"
echo ""
echo "🚀 Avvio server Flask su http://localhost:5000"
echo ""
echo "📋 Per testare l'applicazione:"
echo "   1. Apri il browser su: http://localhost:5000"
echo "   2. Compila i 7 form guidati"
echo "   3. Genera il business plan (con Prompt Caching!)"
echo ""
echo "💡 Premi CTRL+C per fermare il server"
echo ""
echo "================================================"
echo ""

# Avvia Flask
python3 app.py

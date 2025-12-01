================================================================================
                    GENERATORE BUSINESS PLAN AI
                         Versione Portable
================================================================================

REQUISITI SISTEMA:
------------------
- Windows 7 o superiore
- Python 3.8+ installato (https://www.python.org/downloads/)
  IMPORTANTE: Durante l'installazione selezionare "Add Python to PATH"
- Connessione internet (per API e installazione dipendenze)


PRIMO AVVIO:
------------
1. Assicurati di avere Python installato
2. IMPORTANTE: Crea il file .env con la tua API key (vedi sotto)
3. Doppio click su "AVVIA.bat"
4. La prima volta installerà automaticamente le dipendenze (1-2 minuti)
5. Il browser si aprirà automaticamente su http://localhost:5000


CONFIGURAZIONE API KEY:
-----------------------
PRIMA DI USARE L'APP, crea un file chiamato ".env" in questa cartella
con questo contenuto:

ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxx

Sostituisci xxxxx con la tua chiave API di Anthropic.


UTILIZZO NORMALE:
-----------------
1. Doppio click su "AVVIA.bat"
2. Attendi l'apertura automatica del browser
3. Compila i 7 form con i dati della tua azienda
4. Nel Form 7, scegli tra:
   - Business Plan COMPLETO (8 sezioni, ~15-20 pagine)
   - Business Plan SINTETICO (5 sezioni, max 5 pagine)
5. Clicca su "Genera Business Plan"
6. Attendi 2-5 minuti per la generazione
7. Scarica in PDF o DOCX


FERMARE IL SERVER:
------------------
- Premi CTRL+C nella finestra del terminale
- Oppure chiudi la finestra del terminale


RISOLUZIONE PROBLEMI:
---------------------

Problema: "Python non trovato"
Soluzione: Installa Python da https://www.python.org/downloads/
          Seleziona "Add Python to PATH" durante l'installazione

Problema: "ModuleNotFoundError"
Soluzione: Elimina la cartella "Lib" se presente, riavvia AVVIA.bat

Problema: "Errore Anthropic API"
Soluzione: Verifica che il file .env contenga una API key valida

Problema: Il browser non si apre
Soluzione: Apri manualmente http://localhost:5000


NOTE IMPORTANTI:
----------------
- Questa versione richiede una API key di Anthropic
- Monitora l'utilizzo nel dashboard Anthropic
- La generazione costa circa $0.10-0.50 per business plan
- Imposta limiti di spesa se necessario


STRUTTURA FILES:
----------------
AVVIA.bat           - Script di avvio
app.py              - Applicazione principale
requirements.txt    - Dipendenze Python
.env                - Configurazione (API key) - DA CREARE!
static/             - File CSS e JavaScript
templates/          - Template HTML
README.txt          - Questo file


SUPPORTO:
---------
Per problemi o domande, contatta il creatore dell'app.


================================================================================
                        Versione 1.0 - Dicembre 2025
================================================================================

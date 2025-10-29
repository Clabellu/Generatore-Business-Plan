# 🚀 Guida Rapida - Avvio Generatore Business Plan

## Prerequisiti

✅ Python 3.11+ (già installato)
✅ Dipendenze installate (già fatto)
⚠️ **API Key Anthropic Claude** (da configurare)

---

## 📝 Passo 1: Ottieni l'API Key

1. Vai su [https://console.anthropic.com/](https://console.anthropic.com/)
2. Crea un account gratuito (se non ce l'hai già)
3. Vai su "API Keys" nel menu
4. Clicca "Create Key"
5. Copia la chiave (inizia con `sk-ant-...`)

**Nota**: Anthropic offre crediti gratuiti iniziali per testare!

---

## 🔧 Passo 2: Configura l'API Key

Modifica il file `.env` e sostituisci `your-api-key-here` con la tua chiave:

```bash
ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxxxxxxxxxx
```

**Oppure esegui questo comando:**

```bash
# Sostituisci YOUR_ACTUAL_KEY con la tua chiave vera
echo "ANTHROPIC_API_KEY=YOUR_ACTUAL_KEY" > .env
```

---

## ▶️ Passo 3: Avvia il Server

### Opzione A: Script automatico (consigliato)

```bash
./start_server.sh
```

### Opzione B: Manuale

```bash
python3 app.py
```

Il server si avvierà su: **http://localhost:5000**

---

## 🌐 Passo 4: Apri l'Applicazione

1. Apri il browser
2. Vai su: **http://localhost:5000**
3. Vedrai la landing page del Generatore Business Plan

---

## 📋 Passo 5: Genera il Business Plan

### Flusso completo:

1. **Clicca "Inizia Ora Gratuitamente"**

2. **Form 1 - Informazioni Base**
   - Stato azienda (avviata/da avviare)
   - Scopo del BP (finanziamento/investitori/pianificazione)
   - Lingua (IT/EN/FR/ES/DE)

3. **Form 2 - Dettagli Azienda**
   - Nome azienda
   - Settore
   - Descrizione business
   - Punti di forza
   - Analisi concorrenza

4. **Form 3 - Clienti e Mercato**
   - Target clienti
   - Dimensione mercato
   - Canali distribuzione
   - Strategia marketing

5. **Form 4 - Prodotti/Servizi**
   - Descrizione offerta
   - Proposta di valore
   - Pricing
   - Roadmap

6. **Form 5 - Analisi SWOT**
   - Strengths (punti di forza)
   - Weaknesses (debolezze)
   - Opportunities (opportunità)
   - Threats (minacce)

7. **Form 6 - Investimenti**
   - Capitale richiesto
   - Utilizzo fondi
   - Timeline
   - Valuta

8. **Form 7 - Dati Finanziari**
   - Vendite anno 1
   - Crescita % annuale
   - Tabella costi dettagliata

9. **Clicca "Completa e Genera Business Plan"**
   - ⏱️ Attendi 45-60 secondi (con Prompt Caching!)
   - 📊 Vedrai 8 sezioni generate automaticamente
   - 💾 Scarica in PDF o DOCX

---

## 🎯 Cosa Aspettarsi

### Tempi di Generazione (CON Prompt Caching):

```
Sezione 1 - Riassunto Esecutivo        → ~15 sec (crea cache)
Sezione 2 - Analisi della Situazione   → ~6 sec  (usa cache ✓)
Sezione 3 - Marketing                  → ~6 sec  (usa cache ✓)
Sezione 4 - Operazioni                 → ~6 sec  (usa cache ✓)
Sezione 5 - Gestione                   → ~6 sec  (usa cache ✓)
Sezione 6 - Strategia di Crescita      → ~7 sec  (usa cache ✓)
Sezione 7 - Finanza                    → ~7 sec  (usa cache ✓)
Sezione 8 - Rischio e Mitigazione      → ~7 sec  (usa cache ✓)
───────────────────────────────────────────────────────────
TOTALE:                                ~60 sec
```

**Nota**: Senza Prompt Caching sarebbero ~120 sec! 🚀

### Log nella Console:

Vedrai log dettagliati come:

```
>>> Avvio generazione business plan per sezioni CON PROMPT CACHING...
>>> Generazione Sezione 1/8: 'Riassunto Esecutivo'...
    → Invio richiesta con 2 blocchi system cachati...
    → Cache created: 2458 tokens
    → Input tokens: 892 tokens
>>> Sezione 'Riassunto Esecutivo' generata con successo.

>>> Generazione Sezione 2/8: 'Analisi della Situazione'...
    → Invio richiesta con 3 blocchi system cachati...
    → Cache read: 2458 tokens (RISPARMIO!)  ← 🎉
    → Input tokens: 145 tokens
>>> Sezione 'Analisi della Situazione' generata con successo.
...
```

---

## 📦 Output Generato

Il business plan includerà:

### 8 Sezioni Complete:

1. **Riassunto Esecutivo** - Sintesi per investitori
2. **Analisi della Situazione** - Contesto di mercato + SWOT
3. **Marketing** - Strategia commerciale
4. **Operazioni** - Piano operativo
5. **Gestione** - Team e governance
6. **Strategia di Crescita** - Vision e milestone
7. **Finanza** - Proiezioni finanziarie a 5 anni (con tabella!)
8. **Rischio e Mitigazione** - Gestione rischi

### Formati di Export:

- 📄 **PDF** - Layout professionale per stampa
- 📝 **DOCX** - Modificabile in Microsoft Word

---

## 🛑 Come Fermare il Server

Premi **CTRL+C** nel terminale dove hai avviato il server.

---

## ❓ Risoluzione Problemi

### Problema: "API key non configurata"

**Soluzione**: Modifica `.env` con la tua vera API key:
```bash
ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxxxx
```

### Problema: "Port 5000 already in use"

**Soluzione**: Cambia porta in `app.py` (ultima riga):
```python
app.run(debug=True, host='0.0.0.0', port=5001)  # Usa 5001
```

### Problema: Errore dipendenze

**Soluzione**: Reinstalla:
```bash
pip3 install -r requirements.txt --force-reinstall
```

### Problema: Generazione lenta

**Verifica**: Controlla i log. Dovresti vedere "Cache read" dalla sezione 2.
Se non vedi "Cache read", il Prompt Caching potrebbe non essere attivo.

---

## 💡 Suggerimenti

1. **Dati Realistici**: Più dettagli fornisci, migliore sarà il business plan
2. **Salvataggio Automatico**: I dati sono salvati nel localStorage, puoi tornare indietro
3. **Costi API**: Con Prompt Caching risparmi ~75% sui costi!
4. **Qualità**: Usa dati veri per ottenere un documento veramente professionale

---

## 📊 Monitoraggio Cache

Nel terminale vedrai:
- **Cache created**: Prima sezione (crea la cache)
- **Cache read**: Sezioni successive (riutilizza la cache)
- **Input tokens**: Drasticamente ridotti dalla sezione 2

Più basso è "Input tokens", più stai risparmiando! 💰

---

## 🎉 Buon Test!

Hai domande? Controlla i log del server o rileggi questa guida.

**Ricorda**: Il Prompt Caching è ora attivo e ottimizzato! 🚀

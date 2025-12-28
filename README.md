# 🚀 Business Plan Generator - SaaS Platform

Piattaforma SaaS completa per la generazione di Business Plan professionali utilizzando l'AI di Anthropic Claude.

## 📋 Caratteristiche

### ✅ Implementato (STEP 1-4)

- **🗄️ Database & Modelli** (STEP 1)
  - SQLAlchemy ORM con SQLite (dev) / PostgreSQL (prod)
  - Modelli: User, Credit, Order, BusinessPlan
  - Relazioni e vincoli di integrità

- **🔐 Sistema Autenticazione** (STEP 2)
  - Registrazione utenti con validazione email
  - Login/Logout sicuro con Flask-Login
  - Hash password con Werkzeug
  - Protezione route con @login_required

- **💳 Sistema Crediti** (STEP 3)
  - Gestione crediti per tipo (breve/completo)
  - Tracking acquisti e consumi
  - Storico movimenti completo
  - Validazioni e protezioni

- **💰 Integrazione Stripe** (STEP 4)
  - Stripe Checkout per pagamenti sicuri
  - Gestione webhook automatica
  - Supporto carte di credito, Google Pay, Apple Pay
  - Modalità TEST e LIVE
  - Protezione contro webhook duplicati

### 🔜 Da Implementare (STEP 5-7)

- **📊 Dashboard Completa** (STEP 5)
  - Visualizzazione storico Business Plan
  - Statistiche utilizzo
  - Download PDF/DOCX

- **🤖 Generazione BP con Crediti** (STEP 6)
  - Collegamento generazione → consumo crediti
  - Validazione crediti disponibili
  - Salvataggio automatico

- **🌐 Deploy Produzione** (STEP 7)
  - Configurazione server
  - Database PostgreSQL
  - HTTPS con SSL
  - Stripe in modalità LIVE

## 🛠️ Stack Tecnologico

### Backend
- **Python 3.11+**
- **Flask 3.1.1** - Web framework
- **SQLAlchemy** - ORM database
- **Flask-Login** - Gestione sessioni
- **Stripe 11.1.1** - Pagamenti
- **Anthropic API** - Generazione AI

### Frontend
- HTML5 + CSS3
- Design moderno con gradients
- Responsive mobile-first
- Font Awesome icons

### Database
- **SQLite** (sviluppo)
- **PostgreSQL** (produzione)

### Payments
- **Stripe Checkout** - Pagamenti sicuri
- **Webhook** - Conferme automatiche

## 📦 Installazione

### 1. Clona il Repository
```bash
git clone https://github.com/Clabellu/Generatore-Business-Plan.git
cd Generatore-Business-Plan
```

### 2. Crea Virtual Environment
```bash
python3 -m venv venv
source venv/bin/activate  # Linux/Mac
# oppure
venv\Scripts\activate  # Windows
```

### 3. Installa Dipendenze
```bash
pip install -r requirements.txt
```

### 4. Configura Environment Variables
Copia e modifica il file `.env.example`:
```bash
cp DISTRIBUZIONE/.env.example .env
```

Modifica `.env` con le tue chiavi:
```env
# Anthropic API
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxx

# Stripe API (modalità TEST per sviluppo)
STRIPE_PUBLIC_KEY=pk_test_xxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxx

# Flask
SECRET_KEY=genera-chiave-casuale-sicura
```

### 5. Inizializza Database
Il database viene creato automaticamente al primo avvio:
```bash
python3 app.py
```

## 🧪 Testing

### Test Sistema Autenticazione
```bash
python3 test_auth_integration.py
```

Verifica:
- ✅ Registrazione utenti
- ✅ Login/Logout
- ✅ Protezione route
- ✅ Validazione email/password

### Test Sistema Crediti
```bash
python3 test_credits.py
```

Verifica:
- ✅ Aggiunta crediti
- ✅ Consumo crediti
- ✅ Verifica disponibilità
- ✅ Storico movimenti
- ✅ Validazioni

### Test Integrazione Stripe
```bash
python3 test_stripe_webhook.py
```

Verifica:
- ✅ Creazione ordini
- ✅ Simulazione webhook
- ✅ Aggiunta crediti automatica
- ✅ Protezione duplicati
- ✅ Ordini multipli

## 🎯 Configurazione Stripe

Per testare i pagamenti reali, segui la guida completa in:
**[STRIPE_SETUP.md](./STRIPE_SETUP.md)**

### Quick Start Stripe Test

1. **Crea account Stripe**: https://dashboard.stripe.com/register
2. **Ottieni chiavi TEST** da Dashboard → Developers → API keys
3. **Configura .env** con le chiavi ottenute
4. **Installa ngrok** per esporre webhook:
   ```bash
   ngrok http 5001
   ```
5. **Configura webhook Stripe** con URL ngrok
6. **Testa con carte di test**:
   - Carta Successo: `4242 4242 4242 4242`
   - Scadenza: qualsiasi futuro (es: 12/25)
   - CVC: qualsiasi 3 cifre (es: 123)

## 🚀 Avvio Applicazione

### Sviluppo
```bash
python3 app.py
```
App disponibile su: `http://localhost:5001`

### Produzione
```bash
# Usa un server WSGI production-ready
gunicorn -w 4 -b 0.0.0.0:5001 app:app
```

## 📊 Struttura Prezzi

### Pacchetti Disponibili

| Pacchetto | Tipo | Crediti | Prezzo | Risparmio |
|-----------|------|---------|--------|-----------|
| BP Breve Singolo | breve | 1 | €29.90 | - |
| BP Completo Singolo | completo | 1 | €59.90 | - |
| Pack 10 Brevi | breve | 10 | €249.00 | €50.00 |
| Pack 10 Completi | completo | 10 | €499.00 | €100.00 |

### Differenze Tipologie

**Business Plan Breve** (€29.90)
- Lunghezza: 15-20 pagine
- Sezioni essenziali
- Ideale per startup early-stage
- Tempo generazione: ~5 minuti

**Business Plan Completo** (€59.90)
- Lunghezza: 40-60 pagine
- Analisi approfondita
- Proiezioni finanziarie dettagliate
- Include analisi SWOT, Porter, ecc.
- Tempo generazione: ~15 minuti

## 🗂️ Struttura Progetto

```
Generatore-Business-Plan/
├── app.py                    # Applicazione Flask principale
├── database.py               # Configurazione database
├── models.py                 # Modelli SQLAlchemy
├── auth.py                   # Sistema autenticazione
├── credits.py                # Gestione crediti
├── requirements.txt          # Dipendenze Python
├── .env                      # Config environment (non committare!)
├── .gitignore               # File da ignorare
│
├── templates/                # Template HTML
│   ├── index.html           # Homepage
│   ├── login.html           # Login page
│   ├── register.html        # Registrazione
│   ├── dashboard.html       # Dashboard utente
│   ├── buy_credits.html     # Shop crediti
│   ├── payment_success.html # Successo pagamento
│   └── forms/               # Form business plan
│
├── static/                   # File statici
│   ├── forms.css            # Stili
│   └── images/              # Immagini
│
├── instance/                 # Database locale (gitignored)
│   └── businessplan.db      # SQLite database
│
├── DISTRIBUZIONE/           # File per distribuzione
│   └── .env.example         # Template environment
│
├── test_auth_integration.py  # Test autenticazione
├── test_credits.py           # Test crediti
├── test_stripe_webhook.py    # Test Stripe
│
├── STRIPE_SETUP.md          # Guida Stripe
└── README.md                # Questo file
```

## 🔐 Sicurezza

### Best Practices Implementate

✅ **Password**
- Hash con Werkzeug (bcrypt)
- Nessuna password in chiaro nel DB
- Validazione lunghezza minima

✅ **Sessioni**
- Flask-Login per gestione sessioni
- SECRET_KEY sicura da environment
- Cookie HttpOnly

✅ **Stripe**
- Verifica firma webhook
- Chiavi API da environment
- Protezione webhook duplicati
- HTTPS richiesto in produzione

✅ **Database**
- Prepared statements (SQLAlchemy)
- Prevenzione SQL injection
- Validazione input

✅ **API**
- Rate limiting (da implementare in prod)
- CORS configurato
- Validazione richieste

## 📈 Roadmap

### ✅ Fase 1: Fondamenta (Completata)
- [x] STEP 1: Database e modelli
- [x] STEP 2: Sistema autenticazione
- [x] STEP 3: Sistema crediti
- [x] STEP 4: Integrazione Stripe

### 🔄 Fase 2: Funzionalità (In corso)
- [ ] STEP 5: Dashboard completa
  - [ ] Storico business plan
  - [ ] Download PDF/DOCX
  - [ ] Statistiche utilizzo
- [ ] STEP 6: Collegamento generazione BP
  - [ ] Consumo crediti automatico
  - [ ] Validazione pre-generazione
  - [ ] Salvataggio automatico

### 🚀 Fase 3: Produzione
- [ ] STEP 7: Deploy produzione
  - [ ] Server production-ready
  - [ ] Database PostgreSQL
  - [ ] HTTPS/SSL
  - [ ] Stripe modalità LIVE
  - [ ] Monitoring e logging
  - [ ] Backup automatici

### 💡 Fase 4: Miglioramenti Futuri
- [ ] Integrazione PayPal (richiesto dall'utente)
- [ ] UI migliorata crediti (mostra tipo pacchetto)
- [ ] Email di conferma ordini
- [ ] Export business plan in più formati
- [ ] Template business plan personalizzabili
- [ ] Sistema referral/affiliazione
- [ ] Dashboard analytics avanzata

## 🤝 Contributi

Progetto in sviluppo attivo. Per suggerimenti o bug:
1. Apri una Issue su GitHub
2. Fork e crea Pull Request
3. Contatta il team

## 📝 Licenza

Copyright © 2025 - Tutti i diritti riservati

## 🆘 Supporto

### Documentazione
- **Stripe**: [STRIPE_SETUP.md](./STRIPE_SETUP.md)
- **API Anthropic**: https://docs.anthropic.com/
- **Flask**: https://flask.palletsprojects.com/

### Problemi Comuni

**"Database locked"**
- Chiudi altre connessioni al DB
- In produzione usa PostgreSQL

**"Stripe API key invalid"**
- Verifica file `.env`
- Usa chiavi TEST (pk_test_, sk_test_)
- Riavvia app dopo modifica .env

**"Webhook signature verification failed"**
- Verifica STRIPE_WEBHOOK_SECRET
- Assicurati di usare ngrok in locale
- Controlla URL webhook su Stripe Dashboard

**"Crediti non aggiunti dopo pagamento"**
- Controlla webhook logs su Stripe
- Verifica endpoint /stripe-webhook accessibile
- Controlla logs app per errori

## 📞 Contatti

- **GitHub**: https://github.com/Clabellu/Generatore-Business-Plan
- **Email**: [da configurare]
- **Website**: [da configurare]

---

**Sviluppato con ❤️ usando Claude AI**

*Last updated: 28 Dicembre 2025*

# 🔐 Guida Configurazione Stripe

## Prerequisiti
Prima di iniziare, devi avere un account Stripe. Se non ce l'hai:
1. Vai su https://dashboard.stripe.com/register
2. Registrati gratuitamente
3. Completa la verifica dell'account

## 📋 STEP 1: Ottieni le Chiavi API

### 1.1 Accedi alla Dashboard Stripe
- Vai su https://dashboard.stripe.com/
- Assicurati di essere in **modalità Test** (toggle in alto a destra)

### 1.2 Trova le Chiavi API
1. Nel menu laterale, clicca su **Developers** → **API keys**
2. Vedrai due chiavi:
   - **Publishable key** (inizia con `pk_test_`)
   - **Secret key** (inizia con `sk_test_`) - clicca "Reveal test key"

### 1.3 Crea il Webhook
1. Vai su **Developers** → **Webhooks**
2. Clicca **Add endpoint**
3. Inserisci l'URL: `https://tuo-dominio.com/stripe-webhook`
   - Per test locale usa: `https://your-ngrok-url.ngrok.io/stripe-webhook`
4. In **Events to send** seleziona:
   - `checkout.session.completed`
5. Clicca **Add endpoint**
6. Copia il **Signing secret** (inizia con `whsec_`)

## 🔧 STEP 2: Configura l'Applicazione

### 2.1 Crea il file .env
Nella root del progetto, crea un file `.env`:

```bash
# Anthropic API
ANTHROPIC_API_KEY=your_anthropic_key_here

# Stripe API Keys (modalità TEST)
STRIPE_PUBLIC_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Flask Secret Key (genera una chiave casuale sicura)
SECRET_KEY=your-super-secret-random-key-change-this
```

**IMPORTANTE:**
- Usa le chiavi di **TEST** (iniziano con `pk_test_` e `sk_test_`)
- NON committare il file `.env` su git (è già in .gitignore)
- In produzione, usa le chiavi LIVE

### 2.2 Installa le Dipendenze
```bash
pip3 install -r requirements.txt
```

## 🧪 STEP 3: Test in Locale con ngrok

Per testare i webhook Stripe in locale, devi esporre la tua app su internet:

### 3.1 Installa ngrok
```bash
# Linux/Mac
wget https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-linux-amd64.tgz
tar -xvzf ngrok-v3-stable-linux-amd64.tgz
sudo mv ngrok /usr/local/bin/
```

### 3.2 Avvia l'App Flask
```bash
python3 app.py
```
L'app sarà su `http://localhost:5001`

### 3.3 Esponi con ngrok
In un altro terminale:
```bash
ngrok http 5001
```

Vedrai un output tipo:
```
Forwarding  https://abc123.ngrok.io -> http://localhost:5001
```

### 3.4 Aggiorna il Webhook Stripe
1. Vai su Dashboard Stripe → Developers → Webhooks
2. Modifica l'endpoint
3. Cambia l'URL in: `https://abc123.ngrok.io/stripe-webhook`
4. Salva

## 🎯 STEP 4: Testa il Pagamento

### 4.1 Registrati nell'App
1. Vai su `http://localhost:5001`
2. Registrati con email/password
3. Fai login

### 4.2 Vai allo Shop
1. Dalla dashboard, clicca **Vai allo Shop**
2. Scegli un pacchetto
3. Clicca **Acquista**

### 4.3 Completa il Pagamento Test
Verrai reindirizzato alla pagina Stripe Checkout. Usa queste carte di test:

**Carta di Successo:**
- Numero: `4242 4242 4242 4242`
- Scadenza: qualsiasi data futura (es: 12/25)
- CVC: qualsiasi 3 cifre (es: 123)
- Nome: qualsiasi nome

**Altre Carte di Test:**
- **3D Secure:** `4000 0025 0000 3155` (richiede autenticazione)
- **Carta Declinata:** `4000 0000 0000 0002`
- **Fondi Insufficienti:** `4000 0000 0000 9995`

**Riferimento completo:** https://stripe.com/docs/testing

### 4.4 Verifica il Risultato
Dopo il pagamento:
1. Verrai reindirizzato alla pagina di successo
2. I crediti verranno aggiunti automaticamente
3. Controlla la dashboard per vedere i nuovi crediti

## 🔍 Debugging

### Verifica i Webhook
1. Vai su Dashboard Stripe → Developers → Webhooks
2. Clicca sul tuo endpoint
3. Vai alla tab **Logs** per vedere gli eventi ricevuti

### Logs Applicazione
L'app stampa logs quando:
- Stripe viene inizializzato
- Un ordine viene creato
- I crediti vengono aggiunti dal webhook

Controlla il terminale dove hai avviato `python3 app.py`

### Problemi Comuni

**"Pagamenti non disponibili"**
- Verifica che `STRIPE_SECRET_KEY` sia nel file `.env`
- Controlla che inizi con `sk_test_`
- Riavvia l'app dopo aver modificato `.env`

**"Invalid signature" nel webhook**
- Verifica che `STRIPE_WEBHOOK_SECRET` sia corretto
- Deve iniziare con `whsec_`
- Assicurati che l'URL ngrok sia aggiornato

**I crediti non vengono aggiunti**
- Controlla i logs del webhook su Stripe Dashboard
- Verifica che il webhook stia ricevendo l'evento `checkout.session.completed`
- Controlla i logs dell'app per errori

## 🚀 Deploy in Produzione

Quando sei pronto per il deploy:

### 1. Cambia alle Chiavi LIVE
1. Nella Dashboard Stripe, passa alla modalità **Live** (toggle in alto)
2. Ottieni le nuove chiavi (iniziano con `pk_live_` e `sk_live_`)
3. Aggiorna il `.env` di produzione

### 2. Configura il Webhook di Produzione
1. Crea un nuovo endpoint webhook con l'URL di produzione
2. Esempio: `https://tuodominio.com/stripe-webhook`
3. Seleziona gli eventi: `checkout.session.completed`
4. Copia il nuovo signing secret

### 3. Test Finale
- Fai un acquisto REALE di importo minimo (€0.50 o simile)
- Verifica che funzioni tutto
- IMPORTANTE: Stripe applica una commissione (2.9% + €0.25 per transazione EU)

## 📊 Monitoraggio

### Dashboard Stripe
- **Payments:** Vedi tutti i pagamenti ricevuti
- **Customers:** Lista clienti
- **Billing:** Fatture e commissioni

### Report
- Stripe genera automaticamente report fiscali
- Esporta dati per contabilità
- Configura notifiche email

## 🔐 Sicurezza

### Best Practices
✅ Non committare mai le chiavi su git
✅ Usa chiavi TEST in sviluppo, LIVE solo in produzione
✅ Verifica sempre la firma dei webhook
✅ Usa HTTPS in produzione (obbligatorio per Stripe)
✅ Monitora i logs per attività sospette

## 📚 Risorse

- **Stripe Docs:** https://stripe.com/docs
- **Stripe Checkout:** https://stripe.com/docs/payments/checkout
- **Test Cards:** https://stripe.com/docs/testing
- **Webhooks:** https://stripe.com/docs/webhooks
- **Dashboard:** https://dashboard.stripe.com/

## 💡 Supporto

Se hai problemi:
1. Controlla i logs dell'app
2. Verifica i logs webhook su Stripe
3. Consulta la documentazione Stripe
4. Contatta il supporto Stripe (molto reattivo!)

---

**Pronto per iniziare!** 🎉
Segui gli step in ordine e in pochi minuti avrai Stripe funzionante!

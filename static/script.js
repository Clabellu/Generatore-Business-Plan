function showLoadingModal() {
    const overlay = document.getElementById('loadingOverlay');
    const button = document.getElementById('nextButtonForm7');
    
    // Mostra il modal
    if (overlay) {
        overlay.style.display = 'flex';
    }
    
    // Disabilita il pulsante e cambia testo
    if (button) {
        button.classList.add('btn-loading');
        button.disabled = true;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generazione in corso...';
    }
    
    console.log('🚀 Loading modal mostrato - Generazione avviata');
}

function hideLoadingModal() {
    const overlay = document.getElementById('loadingOverlay');
    const button = document.getElementById('nextButtonForm7');
    
    // Nasconde il modal
    if (overlay) {
        overlay.style.display = 'none';
    }
    
    // Riabilita il pulsante e ripristina testo originale
    if (button) {
        button.classList.remove('btn-loading');
        button.disabled = false;
        button.innerHTML = '<i class="fas fa-check-circle"></i> Completa e Genera Business Plan';
    }
    
    console.log('✅ Loading modal nascosto');
}

// Funzione per salvare i dati del business plan nel localStorage
function salvaDatiBP(nuoviDati) {
    let datiEsistenti = JSON.parse(localStorage.getItem('businessPlanData')) || {};
    let datiAggiornati = { ...datiEsistenti, ...nuoviDati };
    localStorage.setItem('businessPlanData', JSON.stringify(datiAggiornati));
    console.log("Dati salvati nel localStorage:", datiAggiornati);
}

// Funzione per caricare i dati del business plan dal localStorage
function caricaDatiBP() {
    const dati = JSON.parse(localStorage.getItem('businessPlanData'));
    console.log("Dati caricati dal localStorage:", dati);
    return dati || {}; // Restituisce un oggetto vuoto se non ci sono dati
}

// Codice da eseguire quando il DOM è completamente caricato
document.addEventListener('DOMContentLoaded', function() {

    // Logica per la Landing Page (index.html)
    const startButton = document.getElementById('startButton');
    if (startButton) {
        startButton.addEventListener('click', function() {
            // Pulisce i dati precedenti prima di iniziare un nuovo business plan
            localStorage.removeItem('businessPlanData'); 
            console.log("LocalStorage pulito. Inizio nuovo business plan.");
            window.location.href = '/forms/form1'; // Reindirizza al primo form
        });
    }

    // In script.js

    const formStep1 = document.getElementById('formStep1');
    if (formStep1) {
        const datiSalvati = caricaDatiBP();
        // --- INIZIO LOGICA RIPOPOLAMENTO MODIFICATA ---
        if (datiSalvati.form1) {
            // Ripopolamento per statoAzienda (invariato)
            if (datiSalvati.form1.statoAzienda) {
                const radioStato = document.querySelector(`input[name="statoAzienda"][value="${datiSalvati.form1.statoAzienda}"]`);
                if (radioStato) radioStato.checked = true;
            }
        
            // Ripopolamento per scopoBusinessPlan (MODIFICATO)
            if (datiSalvati.form1.scopoBusinessPlan) { // Ora è una stringa, non un array
                const radioScopo = document.querySelector(`input[name="scopoBP"][value="${datiSalvati.form1.scopoBusinessPlan}"]`);
                if (radioScopo) radioScopo.checked = true;
            }

            // Ripopolamento per lingua (invariato)
            if (datiSalvati.form1.lingua) {
                const selectLingua = document.getElementById('linguaBP');
                if (selectLingua) selectLingua.value = datiSalvati.form1.lingua;
            }
        }
        // --- FINE LOGICA RIPOPOLAMENTO MODIFICATA ---

        formStep1.addEventListener('submit', function(event) {
            event.preventDefault();
        
            // --- INIZIO LOGICA RACCOLTA DATI MODIFICATA ---
            const statoAzienda = document.querySelector('input[name="statoAzienda"]:checked')?.value;
            const scopoBP = document.querySelector('input[name="scopoBP"]:checked')?.value; // MODIFICATO
            const linguaBP = document.getElementById('linguaBP')?.value;

            // Validazione (ora controlliamo scopoBP come singola stringa)
            if (!statoAzienda || !scopoBP || !linguaBP) {
                alert('Per favore, compila tutti i campi obbligatori.');
                return;
            }

            const datiForm1 = {
                form1: {
                    statoAzienda: statoAzienda,
                    scopoBusinessPlan: scopoBP, // Ora salviamo una stringa
                    lingua: linguaBP
                }
            };
             // --- FINE LOGICA RACCOLTA DATI MODIFICATA ---

            salvaDatiBP(datiForm1);
            window.location.href = '/forms/form2'; // Usiamo le rotte
        });
    }
    

    // Logica per il Secondo Form (forms/form2.html)
    const formStep2 = document.getElementById('formStep2');
    if (formStep2) {
        // ... (il tuo codice di ripopolamento per form2 va qui, se lo hai) ...
        const datiSalvati = caricaDatiBP(); // Assicurati che caricaDatiBP() sia definita
            if (datiSalvati.form2) {
                const nomeAziendaEl = document.getElementById('nomeAzienda');
                const descrizioneAziendaEl = document.getElementById('descrizioneAzienda');
                const numeroDipendentiEl = document.getElementById('numeroDipendenti');
                const modalitaRicezioneEl = document.getElementById('modalitaRicezione');
                const areaClientiEl = document.getElementById('areaClienti');

                if (nomeAziendaEl) nomeAziendaEl.value = datiSalvati.form2.nomeAzienda || '';
                if (descrizioneAziendaEl) descrizioneAziendaEl.value = datiSalvati.form2.descrizioneAzienda || '';
                if (numeroDipendentiEl) numeroDipendentiEl.value = datiSalvati.form2.numeroDipendenti || '';
            
                if (datiSalvati.form2.tipoOfferta) {
                    const radioTipoOfferta = document.querySelector(`input[name="tipoOfferta"][value="${datiSalvati.form2.tipoOfferta}"]`);
                    if (radioTipoOfferta) radioTipoOfferta.checked = true;
                }
                if (modalitaRicezioneEl) modalitaRicezioneEl.value = datiSalvati.form2.modalitaRicezione || '';
                if (areaClientiEl) areaClientiEl.value = datiSalvati.form2.areaClienti || '';
            }


        formStep2.addEventListener('submit', function(event) {
            event.preventDefault();
            // Raccogli i dati dal Form 2
            const nomeAzienda = document.getElementById('nomeAzienda').value.trim();
            const descrizioneAzienda = document.getElementById('descrizioneAzienda').value.trim();
            const numeroDipendenti = document.getElementById('numeroDipendenti').value;
            const tipoOfferta = document.querySelector('input[name="tipoOfferta"]:checked')?.value;
            const modalitaRicezione = document.getElementById('modalitaRicezione').value;
            const areaClienti = document.getElementById('areaClienti').value.trim();

            // Validazione semplice (esempio)
            if (!nomeAzienda || !descrizioneAzienda || !numeroDipendenti || !tipoOfferta || !modalitaRicezione || !areaClienti) {
                alert('Per favore, compila tutti i campi obbligatori del secondo form.');
                console.log("Validazione Form 2 fallita:", {nomeAzienda, descrizioneAzienda, numeroDipendenti, tipoOfferta, modalitaRicezione, areaClienti});
                return;
            }

            const datiForm2 = {
                form2: {
                    nomeAzienda,
                    descrizioneAzienda,
                    numeroDipendenti,
                    tipoOfferta,
                    modalitaRicezione,
                    areaClienti
                }
            };
            salvaDatiBP(datiForm2);
        
            // --- CORREZIONE 1: Aggiungi questa riga ---
            console.log("Dati Form 2 salvati, reindirizzamento a form3.html...");
            window.location.href = '/forms/form3'; // Porta al Form 3
        });

        const backButtonForm2 = document.getElementById('backButtonForm2');
        if (backButtonForm2) {
            backButtonForm2.addEventListener('click', function() {
                // --- CORREZIONE 2: Modifica questa riga ---
                console.log("Pulsante Indietro su Form 2 cliccato, vado a form1.html");
                window.location.href = '/forms/form1'; // Deve portare al Form 1
            });
        }
    }

    // Logica per il Terzo Form (forms/form3.html)
    const formStep3 = document.getElementById('formStep3');
    if (formStep3) {
        const datiSalvati = caricaDatiBP();

        // Funzione helper per ripopolare un singolo cliente
        function popolaCliente(numeroCliente, datiCliente) {
            const descEl = document.getElementById(`cliente${numeroCliente}Descrizione`);
            const redditoEl = document.getElementById(`cliente${numeroCliente}Reddito`);
            if (descEl) descEl.value = datiCliente.descrizione || '';
            if (redditoEl) redditoEl.value = datiCliente.reddito || '';
        }

        // Ripopola i campi di form3 se esistono dati salvati
        if (datiSalvati.datiClienti && Array.isArray(datiSalvati.datiClienti)) {
            datiSalvati.datiClienti.forEach((cliente, index) => {
                if (index < 3) { // Abbiamo campi per al massimo 3 clienti
                // Assumiamo che i datiCliente abbiano 'descrizione' e 'reddito'
                // e che l'array datiClienti corrisponda a Cliente 1, 2, 3
                // Se hai un ID o un nome univoco per cliente nei dati salvati,
                // potresti dover adattare questa logica.
                // Per ora, la corrispondenza è basata sull'indice.
                    popolaCliente(index + 1, cliente);
                }
            });
        }

        formStep3.addEventListener('submit', function(event) {
            event.preventDefault();

            const datiClientiRaccolti = [];

            // Cliente 1 (Obbligatorio)
            const cliente1Descrizione = document.getElementById('cliente1Descrizione').value.trim();
            const cliente1Reddito = document.getElementById('cliente1Reddito').value;

            if (!cliente1Descrizione || !cliente1Reddito) {
                alert('Per favore, compila tutti i campi per il Cliente 1 (descrizione e livello di reddito).');
                return;
            }
            datiClientiRaccolti.push({
                id: 'cliente1', // Aggiungiamo un identificatore
                descrizione: cliente1Descrizione,
                reddito: cliente1Reddito
            });

            // Cliente 2 (Opzionale, ma se uno è compilato, l'altro diventa obbligatorio)
            const cliente2Descrizione = document.getElementById('cliente2Descrizione').value.trim();
            const cliente2Reddito = document.getElementById('cliente2Reddito').value;

            if (cliente2Descrizione || cliente2Reddito) { // Se almeno uno dei campi per Cliente 2 è stato toccato
                if (!cliente2Descrizione || !cliente2Reddito) {
                    alert('Per il Cliente 2, se fornisci la descrizione devi fornire anche il livello di reddito, e viceversa.');
                    return;
                }
                datiClientiRaccolti.push({
                     id: 'cliente2',
                    descrizione: cliente2Descrizione,
                    reddito: cliente2Reddito
                });
            }

            // Cliente 3 (Opzionale, stessa logica del Cliente 2)
            const cliente3Descrizione = document.getElementById('cliente3Descrizione').value.trim();
            const cliente3Reddito = document.getElementById('cliente3Reddito').value;

            if (cliente3Descrizione || cliente3Reddito) { // Se almeno uno dei campi per Cliente 3 è stato toccato
                 if (!cliente3Descrizione || !cliente3Reddito) {
                    alert('Per il Cliente 3, se fornisci la descrizione devi fornire anche il livello di reddito, e viceversa.');
                    return;
                }
                datiClientiRaccolti.push({
                    id: 'cliente3',
                    descrizione: cliente3Descrizione,
                    reddito: cliente3Reddito
                });
            }

            // Salva i dati dei clienti
            // Usiamo una nuova chiave 'datiClienti' dentro l'oggetto principale businessPlanData
            salvaDatiBP({ datiClienti: datiClientiRaccolti }); 

            window.location.href = '/forms/form4';
        });

        const backButtonForm3 = document.getElementById('backButtonForm3');
        if (backButtonForm3) {
            backButtonForm3.addEventListener('click', function() {
                window.location.href = '/forms/form2'; // Torna a form2.html
            });
        }
    }

    // Logica per il Quarto Form (forms/form4.html) - Dettagli Prodotti/Servizi
    const formStep4 = document.getElementById('formStep4');
    if (formStep4) {
        const maxProdotti = 5;
        let prodottiVisibili = 1; // Il primo è sempre visibile
        const aggiungiProdottoBtn = document.getElementById('aggiungiProdottoBtn');

        // Funzione per mostrare/nascondere i campi prodotto e il pulsante "Aggiungi"
        function aggiornaVisibilitaProdotti() {
            for (let i = 2; i <= maxProdotti; i++) {
                const prodottoDiv = document.getElementById(`prodottoServizio${i}`);
                if (prodottoDiv) {
                    if (i <= prodottiVisibili) {
                        prodottoDiv.classList.remove('nascosto');
                    } else {
                        prodottoDiv.classList.add('nascosto');
                    }
                }
            }
            if (aggiungiProdottoBtn) {
                if (prodottiVisibili >= maxProdotti) {
                    aggiungiProdottoBtn.classList.add('nascosto'); // Nasconde il pulsante se tutti sono visibili
                } else {
                    aggiungiProdottoBtn.classList.remove('nascosto');
                }
            }
        }

        // Inizializza la visibilità al caricamento della pagina
        aggiornaVisibilitaProdotti(); 

        if (aggiungiProdottoBtn) {
            aggiungiProdottoBtn.addEventListener('click', function() {
                if (prodottiVisibili < maxProdotti) {
                    prodottiVisibili++;
                    aggiornaVisibilitaProdotti();
                }
            });
        }

        // Ripopolamento Campi Form 4
        const datiSalvati = caricaDatiBP();
        if (datiSalvati.datiProdottiServizi && Array.isArray(datiSalvati.datiProdottiServizi)) {
            datiSalvati.datiProdottiServizi.forEach((prodotto, index) => {
                const i = index + 1; // i prodotti sono numerati da 1 a 5
                if (i > maxProdotti) return;

                const nomeEl = document.getElementById(`prodotto${i}Nome`);
                const descEl = document.getElementById(`prodotto${i}Descrizione`);

                if (nomeEl) nomeEl.value = prodotto.nome || '';
                if (descEl) descEl.value = prodotto.descrizione || '';

                if (i > 1 && (prodotto.nome || prodotto.descrizione)) { // Se è un prodotto opzionale e ha dati
                    prodottiVisibili = Math.max(prodottiVisibili, i); // Assicura che sia visibile
                }
            });
            aggiornaVisibilitaProdotti(); // Aggiorna la visibilità dopo il ripopolamento
        }


        formStep4.addEventListener('submit', function(event) {
            event.preventDefault();
            const datiProdottiRaccolti = [];

            // Prodotto/Servizio 1 (Obbligatorio)
            const prodotto1Nome = document.getElementById('prodotto1Nome').value.trim();
            const prodotto1Descrizione = document.getElementById('prodotto1Descrizione').value.trim();

            if (!prodotto1Nome || !prodotto1Descrizione) {
                alert('Per favore, compila Nome e Descrizione per il Prodotto/Servizio 1.');
                return;
            }
            datiProdottiRaccolti.push({
                id: 'prodotto1',
                nome: prodotto1Nome,
                descrizione: prodotto1Descrizione
            });

            // Prodotti/Servizi Opzionali (2-5)
            for (let i = 2; i <= prodottiVisibili; i++) { // Itera solo sui prodotti resi visibili
                const nomeInput = document.getElementById(`prodotto${i}Nome`);
                const descInput = document.getElementById(`prodotto${i}Descrizione`);

                const nome = nomeInput ? nomeInput.value.trim() : '';
                const descrizione = descInput ? descInput.value.trim() : '';

                if (nome || descrizione) { // Se almeno uno dei campi è compilato per questo prodotto opzionale
                    if (!nome || !descrizione) {
                        alert(`Per il Prodotto/Servizio ${i}, se fornisci il nome devi fornire anche la descrizione, e viceversa.`);
                        return;
                    }
                    datiProdottiRaccolti.push({
                        id: `prodotto${i}`,
                        nome: nome,
                        descrizione: descrizione
                    });
                }
            }

            salvaDatiBP({ datiProdottiServizi: datiProdottiRaccolti });

            window.location.href = '/forms/form5';
        });

        const backButtonForm4 = document.getElementById('backButtonForm4');
        if (backButtonForm4) {
            backButtonForm4.addEventListener('click', function() {
                window.location.href = '/forms/form3'; // Torna a form3.html
            });
        }
    }

    // Logica per il Quinto Form (forms/form5.html) - Analisi SWOT
    const formStep5 = document.getElementById('formStep5');
    if (formStep5) {
        console.log("Caricamento di form5.html - Inizio ripopolamento."); // DEBUG
        const datiSalvati = caricaDatiBP();

        // Funzione helper per ripopolare una sezione SWOT (array di 3 elementi)
        function popolaSezioneSwot(sezionePrefix, datiArray) {
            console.log(`Ripopolamento sezione: ${sezionePrefix}, Dati ricevuti:`, datiArray); // DEBUG
            if (datiArray && Array.isArray(datiArray)) {
                for (let i = 0; i < 3; i++) {
                    const elementId = `${sezionePrefix}${i + 1}`;
                    const el = document.getElementById(elementId);
                    if (el) {
                        el.value = datiArray[i] || ''; // Imposta il valore o stringa vuota se datiArray[i] è undefined
                        console.log(`Campo: ${elementId}, Trovato:`, el, `Impostato a: "${el.value}"`); // DEBUG
                    } else {
                        console.warn(`Elemento HTML non trovato per ripopolamento: ${elementId}`); // DEBUG
                    }

                }
            } else {
                console.log(`Nessun dato array per ${sezionePrefix} o non è un array. Pulisco i campi.`); // DEBUG
                 for (let i = 0; i < 3; i++) {
                    const elementId = `${sezionePrefix}${i + 1}`;
                    const el = document.getElementById(elementId);
                    if (el) el.value = '';
                 }
            }
        }

        // Ripopolamento Campi Form 5
        if (datiSalvati.datiSwot) {
            console.log("Dati SWOT trovati in localStorage:", datiSalvati.datiSwot); // DEBUG
            popolaSezioneSwot('swotForza', datiSalvati.datiSwot.puntiDiForza);
            popolaSezioneSwot('swotDebolezza', datiSalvati.datiSwot.debolezze);
            popolaSezioneSwot('swotOpportunita', datiSalvati.datiSwot.opportunita);
            popolaSezioneSwot('swotMinaccia', datiSalvati.datiSwot.minacce);
        } else {
            console.log("Nessun dato SWOT trovato in localStorage per il ripopolamento. Pulisco i campi."); // DEBUG
            popolaSezioneSwot('swotForza', null); // Chiama per pulire i campi
            popolaSezioneSwot('swotDebolezza', null);
            popolaSezioneSwot('swotOpportunita', null);
            popolaSezioneSwot('swotMinaccia', null);
        }

        formStep5.addEventListener('submit', function(event) {
            event.preventDefault();

            // Funzione helper per raccogliere dati da una sezione SWOT
            function raccogliDatiSezioneSwot(sezionePrefix) {
                const dati = [];
                for (let i = 1; i <= 3; i++) {
                    const elementId = `${sezionePrefix}${i}`;
                    const el = document.getElementById(elementId);
                    const valore = el ? el.value.trim() : '';
                    dati.push(el ? el.value.trim() : '');
                }
                return dati;
            }
            
            const puntiDiForza = raccogliDatiSezioneSwot('swotForza');
            const debolezze = raccogliDatiSezioneSwot('swotDebolezza');
            const opportunita = raccogliDatiSezioneSwot('swotOpportunita');
            const minacce = raccogliDatiSezioneSwot('swotMinaccia');

            // DEBUG: Mostra cosa è stato raccolto per puntiDiForza prima della validazione
            console.log('Array puntiDiForza raccolto:', puntiDiForza);
            console.log('Valore di puntiDiForza[0] prima della validazione:', puntiDiForza[0]);

            if (!puntiDiForza[0]) { /* ... validazioni ... */ return; }
            if (!debolezze[0]) { /* ... validazioni ... */ return; }
            if (!opportunita[0]) { /* ... validazioni ... */ return; }
            if (!minacce[0]) { /* ... validazioni ... */ return; }   

            const datiSwot = {
                puntiDiForza: puntiDiForza.filter(item => item !== ''), // Salva solo i campi compilati
                debolezze: debolezze.filter(item => item !== ''),
                opportunita: opportunita.filter(item => item !== ''),
                minacce: minacce.filter(item => item !== '')
            };

            // Se vuoi salvare anche i campi vuoti opzionali (come stringhe vuote)
            // invece di filtrarli, puoi usare direttamente gli array:
            // const datiSwot = {
            //     puntiDiForza: puntiDiForza,
            //     debolezze: debolezze,
            //     opportunita: opportunita,
            //     minacce: minacce
            // };

            salvaDatiBP({ datiSwot: datiSwot }); 

            window.location.href = '/forms/form6';
        });

        const backButtonForm5 = document.getElementById('backButtonForm5');
        if (backButtonForm5) {
            backButtonForm5.addEventListener('click', function() {
                window.location.href = '/forms/form4'; // Torna a form4.html
            });
        }
    }

    // Logica per il Sesto Form (forms/form6.html) - Dettagli Investimenti
    const formStep6 = document.getElementById('formStep6');
    if (formStep6) {
        const valutaSelect = document.getElementById('valutaInvestimenti');
        const sommaInvestimentiEl = document.getElementById('sommaInvestimentiTotale');
        const valutaVisualizzataEl = document.getElementById('valutaVisualizzata');
        const numRigheInvestimenti = 3; // Numero di righe per gli investimenti

        // Funzione per calcolare e aggiornare la somma
        function aggiornaSommaInvestimenti() {
            let somma = 0;
            for (let i = 1; i <= numRigheInvestimenti; i++) {
                const importoEl = document.getElementById(`investImporto${i}`);
                if (importoEl && importoEl.value) {
                    const valore = parseFloat(importoEl.value);
                    if (!isNaN(valore)) {
                        somma += valore;
                    }
                }
            }
            if (sommaInvestimentiEl) {
                sommaInvestimentiEl.textContent = somma.toFixed(2); // Mostra con 2 decimali
            }
            if (valutaVisualizzataEl && valutaSelect) {
                 // Mostra il simbolo della valuta o il codice se selezionato
                const selectedOption = valutaSelect.options[valutaSelect.selectedIndex];
                valutaVisualizzataEl.textContent = selectedOption.value ? `(${selectedOption.text.split('(')[1] || selectedOption.value})` : '';
            }
        }

        // Aggiungi event listener ai campi importo e al select della valuta
        for (let i = 1; i <= numRigheInvestimenti; i++) {
            const importoEl = document.getElementById(`investImporto${i}`);
            if (importoEl) {
                importoEl.addEventListener('input', aggiornaSommaInvestimenti);
            }
        }
        if (valutaSelect) {
            valutaSelect.addEventListener('change', aggiornaSommaInvestimenti);
        }

        // Ripopolamento Campi Form 6
        const datiSalvati = caricaDatiBP();
        if (datiSalvati.datiInvestimenti) {
            if (valutaSelect) {
                valutaSelect.value = datiSalvati.datiInvestimenti.valuta || '';
            }
            if (datiSalvati.datiInvestimenti.investimenti && Array.isArray(datiSalvati.datiInvestimenti.investimenti)) {
                datiSalvati.datiInvestimenti.investimenti.forEach((item, index) => {
                    const i = index + 1; // Le nostre righe sono numerate da 1
                    if (i <= numRigheInvestimenti) {
                        const oggettoEl = document.getElementById(`investOggetto${i}`);
                        const importoEl = document.getElementById(`investImporto${i}`);
                        if (oggettoEl) oggettoEl.value = item.oggetto || '';
                        if (importoEl) importoEl.value = item.importo || '';
                    }
                });
            }
        }
        // Aggiorna la somma visualizzata al caricamento della pagina dopo il ripopolamento
        aggiornaSommaInvestimenti();


        formStep6.addEventListener('submit', function(event) {
            event.preventDefault();

            const valuta = valutaSelect ? valutaSelect.value : '';
            const investimentiRaccolti = [];
            let validazioneSuperata = true;
            let almenoUnInvestimentoInserito = false;

            for (let i = 1; i <= numRigheInvestimenti; i++) {
                const oggettoEl = document.getElementById(`investOggetto${i}`);
                const importoEl = document.getElementById(`investImporto${i}`);

                const oggetto = oggettoEl ? oggettoEl.value.trim() : '';
                const importoStr = importoEl ? importoEl.value.trim() : '';
                let importo = null;

                if (importoStr) {
                    importo = parseFloat(importoStr);
                    if (isNaN(importo) || importo < 0) {
                        alert(`L'importo per la riga ${i} non è un numero valido o è negativo.`);
                        if(importoEl) importoEl.focus();
                        validazioneSuperata = false;
                        break; 
                    }
                }

                if (oggetto || importoStr) { // Se almeno uno dei due campi della riga è compilato
                    almenoUnInvestimentoInserito = true;
                    if (!oggetto) {
                        alert(`Per la riga ${i}, hai inserito un importo ma non l'oggetto dell'investimento.`);
                        if(oggettoEl) oggettoEl.focus();
                        validazioneSuperata = false;
                        break;
                    }
                    if (!importoStr) { // o importo === null dopo il parseFloat se importoStr era ''
                        alert(`Per la riga ${i}, hai inserito l'oggetto ma non l'importo dell'investimento.`);
                        if(importoEl) importoEl.focus();
                        validazioneSuperata = false;
                        break;
                    }
                    investimentiRaccolti.push({ oggetto, importo });
                }
            }

            if (!validazioneSuperata) {
                return; // Interrompi se la validazione della tabella fallisce
            } 

            // Opzionale: Rendi la valuta obbligatoria se è stato inserito almeno un investimento
            if (almenoUnInvestimentoInserito && !valuta) {
                alert('Per favore, seleziona una valuta per gli investimenti inseriti.');
                if(valutaSelect) valutaSelect.focus();
                return;
            }

            const sommaFinale = parseFloat(sommaInvestimentiEl.textContent) || 0;

            const datiInvestimenti = {
                valuta: valuta,
                investimenti: investimentiRaccolti,
                sommaInvestimenti: sommaFinale 
            };

            salvaDatiBP({ datiInvestimenti: datiInvestimenti }); 

            window.location.href = '/forms/form7'; 
        });

        const backButtonForm6 = document.getElementById('backButtonForm6');
        if (backButtonForm6) {
            backButtonForm6.addEventListener('click', function() {
                window.location.href = '/forms/form5'; // Torna a form5.html
            });
        }
    }

    // Logica per il Settimo Form (forms/form7.html) - Dettagli Finanziari
const formStep7 = document.getElementById('formStep7');
if (formStep7) {
    console.log("Caricamento formStep7 (versione corretta ripopolamento)..."); 

    const venditeAnno1El = document.getElementById('venditeAnno1');
    const crescitaFatturatoEl = document.getElementById('crescitaFatturatoAnnuale');
    const tabellaCostiBodyEl = document.querySelector('#tabellaCosti tbody');
    
    const totaleCostiOperativiEl = document.getElementById('totaleCostiOperativi');
    const ebtEl = document.getElementById('ebt');
    const importoTasseCalcolatoEl = document.getElementById('importoTasseCalcolato');
    const utileNettoEl = document.getElementById('utileNetto');

    const vociDiCostoStruttura = [ // Assicurati che 'isTaxInputRow' sia usato o rimosso consistentemente
        { id: 'costoDelVenduto', nome: 'Costo del venduto', defaultPercent: 40 },
        { id: 'salariEBenefici', nome: 'Salari e benefici', defaultPercent: 6 },
        { id: 'marketing', nome: 'Marketing', defaultPercent: 5 },
        { id: 'affitto', nome: 'Affitto', defaultPercent: 0 },
        { id: 'generaleEAmministrazione', nome: 'Generale e amministrazione', defaultPercent: 1 },
        { id: 'ammortamento', nome: 'Ammortamento', defaultPercent: 2 },
        { id: 'costiAccessori', nome: 'Costi accessori', defaultPercent: 0 },
        { id: 'altreSpese', nome: 'Altre spese', defaultPercent: 1 },
        { id: 'interessiPassivi', nome: 'Interessi passivi', defaultPercent: 0 },
        { id: 'importoTasse', nome: 'Importo tasse (% EBT)', defaultPercent: 20 } // Rimosso isTaxInputRow se non usato specificamente
    ];

    function popolaTabellaCosti() {
        if (!tabellaCostiBodyEl) return;
        tabellaCostiBodyEl.innerHTML = ''; 
        vociDiCostoStruttura.forEach(voce => {
            const row = tabellaCostiBodyEl.insertRow();
            const cellNome = row.insertCell();
            const cellPercent = row.insertCell();
            const cellTotale = row.insertCell();
            cellNome.textContent = voce.nome;

            const inputPercent = document.createElement('input');
            inputPercent.type = 'number';
            inputPercent.id = `costoVoce_${voce.id}_percent`;
            inputPercent.name = `costoVoce_${voce.id}_percent`;
            inputPercent.value = voce.defaultPercent; // Imposta il default
            inputPercent.min = 0;
            inputPercent.step = 1;
            inputPercent.addEventListener('input', calcolaTutto);
            cellPercent.appendChild(inputPercent);

            const spanTotale = document.createElement('span');
            spanTotale.id = `costoVoce_${voce.id}_totale`;
            spanTotale.textContent = '0.00';
            cellTotale.appendChild(spanTotale);
        });
    }
    
    function calcolaTutto() { /* ... identica a prima ... */ 
        if (!venditeAnno1El || !tabellaCostiBodyEl || !totaleCostiOperativiEl || !ebtEl || !importoTasseCalcolatoEl || !utileNettoEl) return;
        const vendite1 = parseFloat(venditeAnno1El.value) || 0;
        let sommaCostiOperativi = 0;
        vociDiCostoStruttura.forEach(voce => {
            if (voce.id === 'importoTasse') return; 
            const inputPercentEl = document.getElementById(`costoVoce_${voce.id}_percent`);
            const spanTotaleEl = document.getElementById(`costoVoce_${voce.id}_totale`);
            if (inputPercentEl && spanTotaleEl) {
                const percentuale = parseFloat(inputPercentEl.value) || 0;
                const costoCalcolato = (vendite1 * percentuale) / 100;
                spanTotaleEl.textContent = costoCalcolato.toFixed(2);
                sommaCostiOperativi += costoCalcolato;
            }
        });
        totaleCostiOperativiEl.textContent = sommaCostiOperativi.toFixed(2);
        const ebtCalcolato = vendite1 - sommaCostiOperativi;
        ebtEl.textContent = ebtCalcolato.toFixed(2);
        const inputPercentTasseEl = document.getElementById('costoVoce_importoTasse_percent');
        const spanTotaleTasseEl = document.getElementById('costoVoce_importoTasse_totale');
        let tasseCalcolate = 0;
        if (inputPercentTasseEl && spanTotaleTasseEl) {
            const percentualeTasseUtente = parseFloat(inputPercentTasseEl.value) || 0;
            if (ebtCalcolato > 0) {
                tasseCalcolate = (ebtCalcolato * percentualeTasseUtente) / 100;
            }
            spanTotaleTasseEl.textContent = tasseCalcolate.toFixed(2);
        }
        importoTasseCalcolatoEl.textContent = tasseCalcolate.toFixed(2);
        const utileNettoCalcolato = ebtCalcolato - tasseCalcolate;
        utileNettoEl.textContent = utileNettoCalcolato.toFixed(2);
    }

    popolaTabellaCosti(); 

    console.log("Inizio ripopolamento Form 7 da localStorage...");
    const datiSalvati = caricaDatiBP();
    if (datiSalvati && datiSalvati.datiFinanziari) {
        console.log("DatiFinanziari trovati:", datiSalvati.datiFinanziari);

        if (venditeAnno1El) venditeAnno1El.value = datiSalvati.datiFinanziari.venditeAnno1 || '';
        if (crescitaFatturatoEl) crescitaFatturatoEl.value = datiSalvati.datiFinanziari.crescitaFatturatoAnnuale || '';
        
        if (datiSalvati.datiFinanziari.costiTable && Array.isArray(datiSalvati.datiFinanziari.costiTable)) {
            console.log("Ripopolamento percentuali da costiTable:", datiSalvati.datiFinanziari.costiTable);
            datiSalvati.datiFinanziari.costiTable.forEach(itemCosto => {
                const elementId = `costoVoce_${itemCosto.id}_percent`;
                const inputPercentEl = document.getElementById(elementId);
                
                // console.log(`Tentativo ripopolamento per ID: ${elementId}`);
                // console.log(`  Valore salvato itemCosto.percentuale:`, itemCosto.percentuale, `(tipo: ${typeof itemCosto.percentuale})`);
                // console.log(`  Elemento input trovato:`, inputPercentEl);

                if (inputPercentEl) {
                    // Se il valore salvato è un numero valido, usalo.
                    // Altrimenti, l'input manterrà il valore di default già impostato da popolaTabellaCosti().
                    if (itemCosto.percentuale !== null && typeof itemCosto.percentuale === 'number' && !isNaN(itemCosto.percentuale)) {
                        inputPercentEl.value = itemCosto.percentuale;
                        // console.log(`  SUCCESS: ${elementId} impostato a ${itemCosto.percentuale}`);
                    } 
                    // Non c'è bisogno di un 'else' qui, perché se non sovrascriviamo,
                    // il valore di default da popolaTabellaCosti() rimane.
                } else {
                    // console.warn(`  FAIL: Elemento input ${elementId} non trovato per ripopolamento.`);
                }
            });
        } else {
            console.log("costiTable non presente o non è un array in datiFinanziari.");
        }
    } else {
        console.log("Nessun datoFinanziari trovato in localStorage.");
    }
    
    console.log("Esecuzione di calcolaTutto() dopo ripopolamento.");
    calcolaTutto();

    formStep7.addEventListener('submit', function(event) {
        event.preventDefault();
        const vendite1Val = venditeAnno1El ? (parseFloat(venditeAnno1El.value) || 0) : null; // Default to 0 for calculation if empty
        const crescitaVal = crescitaFatturatoEl ? (parseFloat(crescitaFatturatoEl.value) || 0) : null; // Default to 0

        // Validazione per i campi principali
        if (venditeAnno1El.value === '' || vendite1Val === null || vendite1Val < 0) { 
            alert('Per favore, inserisci un valore valido per le vendite previste nel primo anno.'); 
            if(venditeAnno1El) venditeAnno1El.focus(); return; 
        }
        if (crescitaFatturatoEl.value === '' || crescitaVal === null || crescitaVal < 0) { 
            alert('Per favore, inserisci un valore valido per la crescita del fatturato annuale.'); 
            if(crescitaFatturatoEl) crescitaFatturatoEl.focus(); return; 
        }

        const tabellaCostiRaccolta = [];
        vociDiCostoStruttura.forEach(voce => {
            const inputPercentEl = document.getElementById(`costoVoce_${voce.id}_percent`);
            const spanTotaleEl = document.getElementById(`costoVoce_${voce.id}_totale`);
            
            let percentualeVal = 0; // Default a 0
            if (inputPercentEl && inputPercentEl.value !== '') { // Solo se l'utente ha inserito qualcosa
                percentualeVal = parseFloat(inputPercentEl.value);
            } else if (inputPercentEl) { // Se il campo è vuoto, usa il default della struttura
                 percentualeVal = voce.defaultPercent;
            }


            const costoTotaleVal = spanTotaleEl ? parseFloat(spanTotaleEl.textContent) : 0;

            tabellaCostiRaccolta.push({
                id: voce.id,
                nome: voce.nome,
                // Se la percentuale letta è NaN (es. campo vuoto o testo non valido), salva il defaultPercent della struttura.
                // Altrimenti salva il valore numerico.
                percentuale: isNaN(percentualeVal) ? voce.defaultPercent : percentualeVal,
                costoTotale: isNaN(costoTotaleVal) ? 0 : costoTotaleVal
            });
        });

        // Leggi la scelta del tipo di business plan
        const tipoBP = document.querySelector('input[name="tipoBP"]:checked')?.value || 'completo';

        const datiFinanziari = {
            venditeAnno1: vendite1Val,
            crescitaFatturatoAnnuale: crescitaVal,
            costiTable: tabellaCostiRaccolta,
            riepilogo: {
                totaleCostiOperativi: totaleCostiOperativiEl ? parseFloat(totaleCostiOperativiEl.textContent) : 0,
                ebt: ebtEl ? parseFloat(ebtEl.textContent) : 0,
                importoTasse: importoTasseCalcolatoEl ? parseFloat(importoTasseCalcolatoEl.textContent) : 0,
                utileNetto: utileNettoEl ? parseFloat(utileNettoEl.textContent) : 0
            }
        };

        // Salva sia i dati finanziari che il tipo di BP scelto
        salvaDatiBP({
            datiFinanziari: datiFinanziari,
            tipoBP: tipoBP
        });

        console.log(`Tipo di Business Plan selezionato: ${tipoBP}`); 

        // Ora, invece dell'alert, prepariamo per la generazione
        const datiCompletiPerBP = caricaDatiBP(); // Carica TUTTI i dati da localStorage
        console.log("Dati completi pronti per essere inviati al backend:", datiCompletiPerBP);

        showLoadingModal();

        // LA VERA CHIAMATA FETCH AL BACKEND (DA IMPLEMENTARE QUANDO app.py È PRONTO)
        fetch('/genera-business-plan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datiCompletiPerBP)
        })
        .then(response => {
            if (!response.ok) {
                // Se la risposta non è OK, prova a leggere il messaggio di errore se presente
                return response.json().then(errData => {
                    throw new Error(errData.message || `Errore dal server: ${response.status}`);
                }).catch(() => {
                    // Se il corpo dell'errore non è JSON o c'è un altro problema
                    throw new Error(`Errore dal server: ${response.status}`);
                });
            }
            return response.json();
        })
        .then(data => {
            hideLoadingModal();

            console.log("Dati ricevuti dal server:", data);

            // NUOVO FLUSSO: Redirect alla pagina di anteprima
            if (data.status === 'success' && data.redirect_url) {
                console.log("Business Plan generato! Redirect a:", data.redirect_url);
                // Pulisci sessionStorage (non serve più, BP è in sessione server)
                sessionStorage.removeItem('generatedBusinessPlanText');
                sessionStorage.removeItem('generatedBusinessPlanHTML');
                // Redirect alla pagina di anteprima
                window.location.href = data.redirect_url;
            } else {
                // Errore nella generazione
                alert('Errore nella generazione del business plan: ' + (data.message || 'Risposta non valida dal server.'));
                const submitButton = document.getElementById('nextButtonForm7');
                if(submitButton) submitButton.disabled = false;
            }
        })
        .catch(error => {
            hideLoadingModal();

            console.error('Errore durante la chiamata fetch per generare il business plan:', error);
            alert('Si è verificato un errore di comunicazione con il server: ' + error.message);
            if(submitButton) submitButton.disabled = false;
        });

        
        
    });

    window.addEventListener('beforeunload', function() {
            const overlay = document.getElementById('loadingOverlay');
            if (overlay && overlay.style.display === 'flex') {
                e.preventDefault();
                e.returnValue = 'La generazione del Business Plan è in corso. Sei sicuro di voler uscire?';
                return e.returnValue;
            }
        });

    const backButtonForm7 = document.getElementById('backButtonForm7');
    if (backButtonForm7) {
        backButtonForm7.addEventListener('click', function() {
            window.location.href = '/forms/form6';
        });
    }
}

// In script.js, usa questo come blocco UNICO per la pagina dei risultati

// --- Inizio Blocco Unificato per la Pagina dei Risultati ---

// 1. DICHIARIAMO la variabile una sola volta all'inizio
const contenutoBusinessPlanDiv = document.getElementById('contenutoBusinessPlan');

// 2. ESEGUIAMO TUTTA LA LOGICA solo se la variabile esiste (cioè, se siamo su risultato.html)
if (contenutoBusinessPlanDiv) {

    console.log("PASSO D: Sto cercando 'generatedBusinessPlanHTML' in sessionStorage...");

    // --- Logica per visualizzare il testo del piano (già corretta) ---
    const htmlDelPiano = sessionStorage.getItem('generatedBusinessPlanHTML');
    console.log("PASSO E: Valore recuperato da sessionStorage per HTML:", htmlDelPiano);
    if (htmlDelPiano) {
        contenutoBusinessPlanDiv.innerHTML = htmlDelPiano;
    } else {
        contenutoBusinessPlanDiv.innerHTML = '<p>Errore: Dati del piano non trovati.</p>';
    }

    // --- Logica per i pulsanti (ora ANNIDATA CORRETTAMENTE) ---

    // Pulsante "Crea un Altro Piano"
    const tornaInizioBtn = document.getElementById('tornaInizioBtn');
    if (tornaInizioBtn) {
        tornaInizioBtn.addEventListener('click', function() {
            localStorage.removeItem('businessPlanData');
            sessionStorage.removeItem('generatedBusinessPlanHTML');
            sessionStorage.removeItem('generatedBusinessPlanText');
            window.location.href = '/'; 
        });
    }
    
    // Pulsante "Scarica PDF"
    const downloadPdfBtn = document.getElementById('download-pdf-btn');
    if (downloadPdfBtn) {
        downloadPdfBtn.addEventListener('click', function() {
            console.log("Pulsante 'Scarica PDF' cliccato.");
            const planText = sessionStorage.getItem('generatedBusinessPlanText');
            if (!planText) {
                alert("Nessun business plan trovato...");
                return;
            }
            downloadPdfBtn.innerText = 'Creazione PDF in corso...';
            downloadPdfBtn.disabled = true;
            fetch('/scarica-pdf', { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: planText }) 
            })
            .then(response => {
                if (!response.ok) throw new Error('Errore del server...');
                return response.blob();
            })
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = 'business_plan.pdf';
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
                downloadPdfBtn.innerText = 'Scarica PDF';
                downloadPdfBtn.disabled = false;
            })
            .catch(error => {
                console.error('Errore:', error);
                alert('Si è verificato un problema...');
                downloadPdfBtn.innerText = 'Scarica PDF';
                downloadPdfBtn.disabled = false;
            });
        });
    }

    // Pulsante "Scarica DOCX"
    const downloadDocxBtn = document.getElementById('download-docx-btn');
    if (downloadDocxBtn) {
        downloadDocxBtn.addEventListener('click', function() {
            console.log("Pulsante 'Scarica DOCX' cliccato.");
            const planText = sessionStorage.getItem('generatedBusinessPlanText');
            if (!planText) {
                alert("Nessun business plan trovato...");
                return;
            }
            downloadDocxBtn.innerText = 'Creazione DOCX in corso...';
            downloadDocxBtn.disabled = true;
            fetch('/scarica-docx', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: planText })
            })
            .then(response => {
                if (!response.ok) throw new Error('Errore del server...');
                return response.blob();
            })
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = 'business_plan.docx';
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
                downloadDocxBtn.innerText = 'Scarica DOCX';
                downloadDocxBtn.disabled = false;
            })
            .catch(error => {
                console.error('Errore DOCX:', error);
                alert('Si è verificato un problema...');
                downloadDocxBtn.innerText = 'Scarica DOCX';
                downloadDocxBtn.disabled = false;
            });
        });
    }

} // <-- FINE DEL BLOCCO IF PRINCIPALE. TUTTO È CONTENUTO QUI DENTRO.

// --- Fine Blocco Unificato ---
    

}); // Fine di document.addEventListener('DOMContentLoaded')





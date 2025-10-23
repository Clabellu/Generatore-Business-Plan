# File: test_weasyprint.py

from weasyprint import HTML

print(">>> Sto per iniziare il test di WeasyPrint...")

try:
    # Creiamo un semplice contenuto HTML
    html_content = "<h1>Ciao Mondo!</h1><p>Se vedi questo in un PDF, l'installazione di WeasyPrint funziona!</p>"

    # Creiamo un oggetto HTML
    html_object = HTML(string=html_content)

    # Scriviamo il file PDF
    # Questa è la riga che prima causava il crash nella tua app
    html_object.write_pdf("test_output.pdf")

    # Se lo script arriva qui, è un successo!
    print("✅ PDF di prova creato con successo! Controlla il file 'test_output.pdf'.")

except Exception as e:
    # Questo catturerà eventuali errori a livello di Python
    print(f"❌ Si è verificato un errore Python: {e}")
@echo off
title Generatore Business Plan AI
color 0A

echo ========================================
echo   GENERATORE BUSINESS PLAN AI
echo ========================================
echo.
echo Avvio in corso...
echo.

cd /d "%~dp0"

REM Controlla se Python e' disponibile
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERRORE] Python non trovato!
    echo.
    echo Installa Python da: https://www.python.org/downloads/
    echo Assicurati di selezionare "Add Python to PATH"
    echo.
    pause
    exit /b 1
)

REM Controlla se le dipendenze sono installate
echo Controllo dipendenze...
python -c "import flask" >nul 2>&1
if errorlevel 1 (
    echo.
    echo Prima installazione rilevata...
    echo Installazione dipendenze in corso (richiede 1-2 minuti)...
    echo.
    pip install -r requirements.txt
    if errorlevel 1 (
        echo.
        echo [ERRORE] Installazione fallita!
        pause
        exit /b 1
    )
    echo.
    echo Dipendenze installate con successo!
    echo.
)

REM Controlla che esista il file .env
if not exist ".env" (
    echo.
    echo [AVVISO] File .env non trovato!
    echo L'app potrebbe non funzionare correttamente.
    echo.
    timeout /t 3
)

REM Avvia il server Flask
echo Server in avvio sulla porta 5000...
echo.
echo ========================================
echo   Aprendo il browser...
echo   URL: http://localhost:5000
echo ========================================
echo.
echo IMPORTANTE: NON chiudere questa finestra!
echo Per fermare il server, premi CTRL+C
echo.

REM Aspetta 2 secondi e apri il browser
timeout /t 2 /nobreak >nul
start http://localhost:5000

REM Avvia l'applicazione
python app.py

REM Se il server si ferma
echo.
echo Server arrestato.
pause

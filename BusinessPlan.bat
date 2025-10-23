@echo off
title Business Plan Generator - Avvio
color 0A

echo ========================================
echo   BUSINESS PLAN GENERATOR - AVVIO
echo ========================================
echo.

echo [1/3] Attivazione ambiente virtuale...
call venv\Scripts\activate.bat

echo [2/3] Avvio server Flask...
echo.
echo Server in avvio su: http://localhost:5000
echo.
echo NOTA: Per fermare il server premi CTRL+C
echo      Poi chiudi questa finestra
echo.
echo ========================================

timeout /t 2 /nobreak >nul

echo [3/3] Apertura browser...
start http://localhost:5000

echo.
echo Server avviato! Il browser si apre automaticamente.
echo.

python app.py

pause
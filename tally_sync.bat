@echo off
title Proalfa — Tally Sync
color 0A
echo.
echo  ============================================
echo   Proalfa Dynamic  ^|  Tally Finance Sync
echo  ============================================
echo.

:: Check Python
python --version >nul 2>&1
if errorlevel 1 (
    echo  [ERROR] Python not found.
    echo  Download from: https://www.python.org/downloads/
    echo  Tick "Add Python to PATH" during install.
    pause
    exit /b
)

:: Install dependencies if needed
echo  Checking dependencies...
pip show requests >nul 2>&1
if errorlevel 1 (
    echo  Installing requests...
    pip install requests --quiet
)

echo.
echo  BEFORE RUNNING:
echo   - Open TallyPrime
echo   - Load your company
echo   - Go to: Help ^> Settings ^> Connectivity ^> Enable Server (port 9000)
echo.
pause

python tally_sync.py

echo.
echo  Done. Press any key to close.
pause >nul

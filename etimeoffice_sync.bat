@echo off
title Proalfa — Attendance Sync
color 0B
echo.
echo  ============================================
echo   Proalfa Dynamic  ^|  Attendance Sync
echo   eTimeOffice  -^>  Supabase
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
pip show pyodbc >nul 2>&1
if errorlevel 1 (
    echo  Installing pyodbc...
    pip install pyodbc --quiet
)
pip show requests >nul 2>&1
if errorlevel 1 (
    echo  Installing requests...
    pip install requests --quiet
)

echo.
echo  ============================================
echo   FIRST TIME SETUP — check these settings
echo   in etimeoffice_sync.py before running:
echo.
echo     DB_SERVER   = your SQL Server name
echo     DB_NAME     = eTimeOffice database name
echo     SYNC_DAYS   = how many days to sync
echo  ============================================
echo.
echo  Press any key to run sync, or Ctrl+C to cancel.
pause >nul

echo.
python etimeoffice_sync.py

echo.
echo  Done. Press any key to close.
pause >nul

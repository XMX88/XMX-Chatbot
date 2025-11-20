@echo off
color 0A
cls
title XMX Chatbot Startup

echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║                    XMX CHATBOT                             ║
echo ║                  Starting Server...                        ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed!
    echo Please download and install Node.js from: https://nodejs.org
    echo.
    pause
    exit /b 1
)

REM Check if .env file exists
if not exist .env (
    echo ERROR: .env file not found!
    echo Please create .env file with your Google API key.
    echo.
    echo Copy .env.example to .env:
    echo   copy .env.example .env
    echo.
    echo Then edit .env and add your API key.
    echo.
    pause
    exit /b 1
)

REM Install dependencies if needed
if not exist node_modules (
    echo.
    echo Installing dependencies...
    echo.
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo ERROR: Failed to install dependencies!
        pause
        exit /b 1
    )
)

REM Start the server
echo.
echo ✅ Starting XMX Chatbot...
echo.
echo 🌐 Open your browser and go to: http://localhost:3000
echo.
echo 🛑 Press Ctrl+C to stop the server
echo.
call npm run dev

pause

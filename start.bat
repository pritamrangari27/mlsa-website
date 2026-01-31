@echo off
title MLSA Website Launcher
echo ========================================
echo    MLSA AISSMS IOIT Website Launcher
echo ========================================
echo.

:: Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org
    pause
    exit /b 1
)

echo [INFO] Node.js found: 
node --version
echo.

:: Get the directory where the batch file is located
set "PROJECT_DIR=%~dp0"

:: Install backend dependencies and start server
echo [INFO] Starting Backend Server...
start "MLSA Backend" cmd /k "cd /d %PROJECT_DIR%backend && echo Installing backend dependencies... && npm install && echo. && echo Starting backend server on http://localhost:5000 && npm run dev"

:: Wait a moment for backend to initialize
timeout /t 3 /nobreak >nul

:: Install frontend dependencies and start app
echo [INFO] Starting Frontend App...
start "MLSA Frontend" cmd /k "cd /d %PROJECT_DIR%frontend && echo Installing frontend dependencies... && npm install && echo. && echo Starting frontend app on http://localhost:3000 && npm start"

echo.
echo ========================================
echo    Both servers are starting...
echo ========================================
echo.
echo    Backend: http://localhost:5000
echo    Frontend: http://localhost:3000
echo.
echo    Close this window or press any key to exit.
echo    (The servers will continue running)
echo ========================================
pause >nul

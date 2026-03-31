@echo off
title Checklist App Launcher

echo ==============================
echo Starting Checklist App
echo ==============================

REM Start Python server
echo Starting local server on port 5500...
start cmd /k "cd /d %~dp0 && py -m http.server 5500"

REM Wait a bit so server boots
timeout /t 3 > nul

REM Start Cloudflare Tunnel
echo Starting Cloudflare tunnel...
start cmd /k "cloudflared tunnel --url http://localhost:5500"

echo ==============================
echo App is running!
echo ==============================
echo.
echo Local:  http://localhost:5500
echo Public: Check the Cloudflare window for URL
echo.
pause

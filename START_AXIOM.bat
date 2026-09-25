@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo AXIOM needs Node.js 22.5 or newer.
  echo Install the current Node.js LTS, then double-click this file again.
  echo.
  pause
  exit /b 1
)
start "" powershell -NoProfile -WindowStyle Hidden -Command "Start-Sleep -Milliseconds 700; Start-Process 'http://127.0.0.1:4173'"
echo.
echo  AXIOM is running locally at http://127.0.0.1:4173
 echo  Close this window to stop the local server.
echo.
node --no-warnings server.mjs
if errorlevel 1 pause

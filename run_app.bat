@echo off
title DrainCare - Smart Drainage & Sewage Care Management
color 0A
echo ========================================================
echo   DrainCare - Smart Drainage & Sewage Care System
echo   Social Internship Project
echo ========================================================
echo.
echo Setting Node.js environment path...
set "PATH=C:\Program Files\nodejs;%PATH%"

echo Starting server at http://localhost:3000 ...
echo Opening website in browser...
timeout /t 2 >nul
start "" "http://localhost:3000"

npm run dev -- --host 0.0.0.0 --port 3000
pause

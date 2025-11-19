# ASI 倒數儀表板 - 本地開發啟動腳本

Write-Host "🚀 啟動 ASI 倒數儀表板開發服務器..." -ForegroundColor Cyan
Write-Host ""

# 檢查是否在正確的目錄
if (-not (Test-Path "package.json")) {
    Write-Host "❌ 錯誤：請在專案根目錄執行此腳本" -ForegroundColor Red
    Write-Host "   當前目錄：$(Get-Location)" -ForegroundColor Yellow
    exit 1
}

# 檢查 node_modules
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 安裝依賴中..." -ForegroundColor Yellow
    npm install
}

Write-Host "✅ 啟動開發服務器..." -ForegroundColor Green
Write-Host ""
Write-Host "📍 訪問地址: http://localhost:3000" -ForegroundColor Cyan
Write-Host "📍 API 端點: http://localhost:3000/api/readiness" -ForegroundColor Cyan
Write-Host ""
Write-Host "按 Ctrl+C 停止服務器" -ForegroundColor Yellow
Write-Host ""

# 啟動開發服務器
npm run dev



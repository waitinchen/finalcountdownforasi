# 詳細啟動腳本 - 顯示完整輸出

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  ASI 倒數儀表板 - 開發服務器啟動" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 檢查目錄
if (-not (Test-Path "package.json")) {
    Write-Host "❌ 錯誤：請在專案根目錄執行此腳本" -ForegroundColor Red
    Write-Host "   當前目錄：$(Get-Location)" -ForegroundColor Yellow
    exit 1
}

Write-Host "📁 專案目錄: $(Get-Location)" -ForegroundColor Green
Write-Host ""

# 檢查 Node.js
$nodeVersion = node --version 2>$null
if (-not $nodeVersion) {
    Write-Host "❌ Node.js 未安裝或不在 PATH 中" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Node.js: $nodeVersion" -ForegroundColor Green

# 檢查 npm
$npmVersion = npm --version 2>$null
if (-not $npmVersion) {
    Write-Host "❌ npm 未安裝或不在 PATH 中" -ForegroundColor Red
    exit 1
}
Write-Host "✅ npm: $npmVersion" -ForegroundColor Green
Write-Host ""

# 檢查依賴
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 安裝依賴中..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ 依賴安裝失敗" -ForegroundColor Red
        exit 1
    }
    Write-Host ""
}

# 清理舊的構建
if (Test-Path ".next") {
    Write-Host "🧹 清理舊的構建緩存..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
}

Write-Host "🚀 啟動開發服務器..." -ForegroundColor Cyan
Write-Host ""
Write-Host "════════════════════════════════════════" -ForegroundColor Gray
Write-Host "  服務器輸出（請查看下方信息）" -ForegroundColor Gray
Write-Host "════════════════════════════════════════" -ForegroundColor Gray
Write-Host ""
Write-Host "📍 預期訪問地址: http://localhost:3000" -ForegroundColor Green
Write-Host "📍 API 端點: http://localhost:3000/api/readiness" -ForegroundColor Green
Write-Host ""
Write-Host "💡 提示：" -ForegroundColor Yellow
Write-Host "   - 如果看到 'Ready' 或 'Local: http://localhost:3000'，表示成功" -ForegroundColor Yellow
Write-Host "   - 如果端口被占用，Next.js 會自動使用其他端口" -ForegroundColor Yellow
Write-Host "   - 按 Ctrl+C 停止服務器" -ForegroundColor Yellow
Write-Host ""
Write-Host "════════════════════════════════════════" -ForegroundColor Gray
Write-Host ""

# 啟動開發服務器（前台運行，顯示所有輸出）
npm run dev


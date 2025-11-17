# 診斷並啟動開發服務器

Write-Host "🔍 檢查開發環境..." -ForegroundColor Cyan
Write-Host ""

# 檢查 Node.js
$nodeVersion = node --version 2>$null
if ($nodeVersion) {
    Write-Host "✅ Node.js: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "❌ Node.js 未安裝或不在 PATH 中" -ForegroundColor Red
    exit 1
}

# 檢查 npm
$npmVersion = npm --version 2>$null
if ($npmVersion) {
    Write-Host "✅ npm: $npmVersion" -ForegroundColor Green
} else {
    Write-Host "❌ npm 未安裝或不在 PATH 中" -ForegroundColor Red
    exit 1
}

# 檢查專案目錄
if (-not (Test-Path "package.json")) {
    Write-Host "❌ 錯誤：請在專案根目錄執行此腳本" -ForegroundColor Red
    Write-Host "   當前目錄：$(Get-Location)" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ 專案目錄正確" -ForegroundColor Green
Write-Host ""

# 檢查依賴
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 安裝依賴中..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ 依賴安裝失敗" -ForegroundColor Red
        exit 1
    }
}

Write-Host "✅ 依賴已安裝" -ForegroundColor Green
Write-Host ""

# 檢查端口
$port3000 = netstat -ano | findstr :3000
if ($port3000) {
    Write-Host "⚠️  警告：端口 3000 已被占用" -ForegroundColor Yellow
    Write-Host "   Next.js 會自動使用下一個可用端口 (3001, 3002...)" -ForegroundColor Yellow
    Write-Host ""
}

# 嘗試構建檢查
Write-Host "🔨 檢查專案配置..." -ForegroundColor Cyan
$buildCheck = npm run build 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ 專案配置正確" -ForegroundColor Green
} else {
    Write-Host "⚠️  構建檢查有警告，但繼續啟動開發服務器..." -ForegroundColor Yellow
}
Write-Host ""

# 啟動開發服務器
Write-Host "🚀 啟動開發服務器..." -ForegroundColor Cyan
Write-Host ""
Write-Host "📍 訪問地址: http://localhost:3000" -ForegroundColor Green
Write-Host "📍 API 端點: http://localhost:3000/api/readiness" -ForegroundColor Green
Write-Host ""
Write-Host "💡 提示：" -ForegroundColor Yellow
Write-Host "   - 如果 3000 端口被占用，Next.js 會自動使用其他端口" -ForegroundColor Yellow
Write-Host "   - 查看終端輸出確認實際端口號" -ForegroundColor Yellow
Write-Host "   - 按 Ctrl+C 停止服務器" -ForegroundColor Yellow
Write-Host ""

# 啟動開發服務器（前台運行以便看到輸出）
npm run dev


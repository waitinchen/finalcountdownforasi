# 診斷並啟動開發服務器

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  ASI 倒數儀表板 - 服務器診斷" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 檢查目錄
if (-not (Test-Path "package.json")) {
    Write-Host "❌ 錯誤：請在專案根目錄執行此腳本" -ForegroundColor Red
    exit 1
}

Write-Host "📁 專案目錄: $(Get-Location)" -ForegroundColor Green
Write-Host ""

# 停止所有 Node 進程
Write-Host "🛑 停止所有 Node 進程..." -ForegroundColor Yellow
$nodeProcesses = Get-Process -Name node -ErrorAction SilentlyContinue
if ($nodeProcesses) {
    $nodeProcesses | Stop-Process -Force
    Write-Host "✅ 已停止 $($nodeProcesses.Count) 個 Node 進程" -ForegroundColor Green
} else {
    Write-Host "ℹ️  沒有運行中的 Node 進程" -ForegroundColor Gray
}
Write-Host ""

# 等待端口釋放
Write-Host "⏳ 等待端口釋放..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

# 檢查端口
$port3000 = netstat -ano | findstr :3000
if ($port3000) {
    Write-Host "⚠️  警告：端口 3000 仍被占用" -ForegroundColor Yellow
    Write-Host "   將嘗試使用其他端口..." -ForegroundColor Yellow
} else {
    Write-Host "✅ 端口 3000 可用" -ForegroundColor Green
}
Write-Host ""

# 清理緩存
Write-Host "🧹 清理構建緩存..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
    Write-Host "✅ 已清理 .next 目錄" -ForegroundColor Green
} else {
    Write-Host "ℹ️  .next 目錄不存在" -ForegroundColor Gray
}
Write-Host ""

# 檢查依賴
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 安裝依賴..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ 依賴安裝失敗" -ForegroundColor Red
        exit 1
    }
    Write-Host ""
}

# 啟動開發服務器
Write-Host "🚀 啟動開發服務器..." -ForegroundColor Cyan
Write-Host ""
Write-Host "════════════════════════════════════════" -ForegroundColor Gray
Write-Host "  服務器輸出（請查看下方信息）" -ForegroundColor Gray
Write-Host "════════════════════════════════════════" -ForegroundColor Gray
Write-Host ""
Write-Host "📍 預期訪問地址: http://localhost:3000" -ForegroundColor Green
Write-Host "📍 如果 3000 端口被占用，Next.js 會自動使用其他端口" -ForegroundColor Yellow
Write-Host ""
Write-Host "💡 提示：" -ForegroundColor Yellow
Write-Host "   - 查看終端輸出確認實際端口" -ForegroundColor Yellow
Write-Host "   - 如果看到 'Ready' 表示成功" -ForegroundColor Yellow
Write-Host "   - 按 Ctrl+C 停止服務器" -ForegroundColor Yellow
Write-Host ""
Write-Host "════════════════════════════════════════" -ForegroundColor Gray
Write-Host ""

# 啟動開發服務器
npm run dev



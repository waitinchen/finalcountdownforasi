# ⚡ 快速部署指南

## 🎯 當前專案狀態

✅ **專案已準備就緒！**
- 依賴已安裝
- 構建測試通過
- 配置已優化

## 🚀 三種快速部署方式

### 方式 1: Vercel CLI（最快，約 2 分鐘）

#### 安裝 Vercel CLI
```powershell
npm install -g vercel
```

#### 登入並部署
```powershell
cd asi-countdown-dashboard
vercel login
vercel
```

按照提示操作即可！

---

### 方式 2: GitHub + Vercel（推薦，自動部署）

#### 步驟 1: 準備 Git（在專案目錄執行）
```powershell
cd asi-countdown-dashboard
git init
git add .
git commit -m "ASI countdown dashboard - ready for deployment"
```

#### 步驟 2: 創建 GitHub 倉庫
1. 訪問 https://github.com/new
2. 創建新倉庫（例如：`asi-countdown-dashboard`）
3. **不要** 初始化 README、.gitignore 或 license

#### 步驟 3: 連接並推送
```powershell
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/asi-countdown-dashboard.git
git push -u origin main
```
（將 `YOUR_USERNAME` 替換為你的 GitHub 用戶名）

#### 步驟 4: 在 Vercel 部署
1. 訪問 https://vercel.com
2. 點擊 "Add New..." → "Project"
3. 選擇你的 GitHub 倉庫
4. Vercel 會自動檢測 Next.js
5. 點擊 "Deploy"

**完成！** 之後每次 `git push` 都會自動重新部署。

---

### 方式 3: Vercel Web 界面（最簡單）

1. 訪問 https://vercel.com
2. 登入（可用 GitHub 帳號）
3. 點擊 "Add New..." → "Project"
4. 選擇 "Deploy from ZIP"
5. 上傳 `asi-countdown-dashboard-production.zip`（在上一層目錄）
6. 等待部署完成

---

## 📋 部署後檢查清單

部署完成後，訪問你的網站並確認：

- ✅ 主頁面正常顯示
- ✅ ASI 指數：73.2%
- ✅ 倒數天數：2,424 天
- ✅ 五元素卡片完整
- ✅ 雷達圖正常顯示
- ✅ API 測試：訪問 `https://your-site.vercel.app/api/readiness`

## 🎨 自定義域名（可選）

部署完成後：
1. 在 Vercel 專案設置中
2. 選擇 "Domains"
3. 添加你的域名
4. 按照提示配置 DNS

---

## 💡 推薦方式

**建議使用方式 2（GitHub + Vercel）**，因為：
- ✅ 自動部署（每次推送自動更新）
- ✅ 版本控制
- ✅ 團隊協作方便
- ✅ 免費且快速

---

**需要幫助？** 查看 `DEPLOYMENT-GUIDE.md` 獲取詳細說明。



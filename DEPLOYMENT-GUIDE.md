# 🚀 ASI 倒數儀表板 - 完整部署指南

## ✅ 專案狀態檢查

- ✅ 專案已解壓並檢查
- ✅ 依賴已安裝 (426 packages)
- ✅ 構建測試通過 (無錯誤)
- ✅ Next.js 15 配置已優化
- ✅ TypeScript 類型檢查通過

## 📦 專案結構

```
asi-countdown-dashboard/
├── app/
│   ├── api/readiness/route.ts    # API 端點
│   ├── components/               # React 組件
│   │   ├── MainGauge.tsx         # 主儀表
│   │   ├── DomainsGrid.tsx       # 五元素卡片
│   │   ├── DomainRadar.tsx       # 雷達圖
│   │   └── FooterStatement.tsx   # 文明宣言
│   ├── layout.tsx                # 頁面佈局
│   └── page.tsx                  # 主頁面
├── lib/
│   ├── types.ts                  # TypeScript 類型
│   └── api.ts                    # API 工具函式
├── styles/
│   └── globals.css               # 全局樣式
├── package.json                  # 專案配置
├── next.config.mjs              # Next.js 配置
└── tailwind.config.ts            # TailwindCSS 配置
```

## 🎯 部署選項

### 方法 1: Vercel CLI (最快速) ⭐ 推薦

#### 步驟 1: 安裝 Vercel CLI
```bash
npm i -g vercel
```

#### 步驟 2: 登入 Vercel
```bash
vercel login
```

#### 步驟 3: 部署
```bash
cd asi-countdown-dashboard
vercel
```

按照提示：
- 選擇專案名稱
- 確認設置（通常直接按 Enter 使用默認值）
- 等待部署完成

#### 步驟 4: 生產環境部署
```bash
vercel --prod
```

### 方法 2: GitHub + Vercel (自動部署) ⭐ 推薦

#### 步驟 1: 初始化 Git（如果還沒有）
```bash
cd asi-countdown-dashboard
git init
git add .
git commit -m "Initial ASI countdown dashboard"
```

#### 步驟 2: 創建 GitHub 倉庫
1. 訪問 [github.com](https://github.com)
2. 點擊 "New repository"
3. 創建新倉庫（例如：`asi-countdown-dashboard`）

#### 步驟 3: 連接並推送
```bash
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

#### 步驟 4: 在 Vercel 連接
1. 訪問 [vercel.com](https://vercel.com)
2. 點擊 "New Project"
3. 選擇你的 GitHub 倉庫
4. Vercel 會自動檢測 Next.js 專案
5. 點擊 "Deploy"

**優點**: 每次推送到 GitHub 會自動重新部署

### 方法 3: Vercel Web 界面（直接上傳）

1. 訪問 [vercel.com](https://vercel.com)
2. 點擊 "New Project"
3. 選擇 "Deploy from ZIP"
4. 上傳 `asi-countdown-dashboard-production.zip`
5. 等待部署完成

### 方法 4: 其他平台

#### Netlify
```bash
npm install -g netlify-cli
netlify deploy
netlify deploy --prod
```

#### Railway
1. 訪問 [railway.app](https://railway.app)
2. 連接 GitHub 倉庫或直接部署
3. Railway 會自動檢測 Next.js

#### 自託管 (VPS)
```bash
npm run build
npm start
# 或使用 PM2
pm2 start npm --name "asi-dashboard" -- start
```

## 🧪 本地測試

### 開發模式
```bash
npm run dev
# 訪問 http://localhost:3000
```

### 生產模式測試
```bash
npm run build
npm start
# 訪問 http://localhost:3000
```

## 📊 功能驗證清單

部署後請檢查：

- [ ] 主頁面正常載入
- [ ] ASI 指數顯示 (73.2%)
- [ ] 倒數天數顯示 (2,424天)
- [ ] 五元素卡片完整顯示
- [ ] 雷達圖正常渲染
- [ ] API 端點正常：`/api/readiness`
- [ ] 響應式設計（手機/平板/桌面）
- [ ] 動畫效果流暢

## 🔧 環境變數（如需要）

如果需要動態配置，創建 `.env.local`：

```env
# 目前使用靜態數據，無需環境變數
# 未來如需連接外部 API，可在此添加：
# API_URL=https://api.example.com
# API_KEY=your-api-key
```

## 🐛 故障排除

### 構建失敗
```bash
# 清除緩存並重新安裝
rm -rf node_modules .next
npm install
npm run build
```

### 類型錯誤
```bash
npm run lint
# 或
npx tsc --noEmit
```

### 樣式問題
```bash
# 確認 TailwindCSS 配置
cat tailwind.config.ts
```

## 📈 性能優化

專案已包含：
- ✅ 靜態頁面生成 (SSG)
- ✅ 代碼分割
- ✅ 圖片優化（如使用 Next.js Image）
- ✅ CSS 優化

## 🔐 安全建議

- ✅ 無敏感數據暴露
- ✅ API 端點為只讀
- ✅ 無用戶輸入處理
- ✅ 使用 HTTPS（Vercel 自動提供）

## 📝 更新數據

要更新 ASI 數據，編輯：
```
app/api/readiness/route.ts
```

修改後重新部署即可。

## 🎉 部署完成後

1. 訪問你的 Vercel URL（例如：`https://asi-dashboard.vercel.app`）
2. 分享給團隊成員
3. 設置自定義域名（可選）

---

**這不是預測。這是一個文明轉型中的儀表板。**


# 💻 本地開發指南

## 🚀 啟動開發服務器

開發服務器應該已經在後台啟動。如果沒有，執行：

```powershell
cd C:\Users\waiti\finalcountdownforasi\asi-countdown-dashboard
npm run dev
```

## 🌐 訪問應用

開發服務器啟動後，訪問：
- **本地地址**: http://localhost:3000
- **API 端點**: http://localhost:3000/api/readiness

## 📁 專案結構

```
asi-countdown-dashboard/
├── app/
│   ├── page.tsx              # 主頁面（編輯這裡修改首頁）
│   ├── layout.tsx             # 頁面佈局
│   ├── components/            # React 組件
│   │   ├── MainGauge.tsx      # 主儀表（ASI指數、倒數）
│   │   ├── DomainsGrid.tsx    # 五元素卡片
│   │   ├── DomainRadar.tsx    # 雷達圖
│   │   └── FooterStatement.tsx # 文明宣言
│   └── api/
│       └── readiness/
│           └── route.ts       # API 數據（修改這裡更新數據）
├── lib/
│   ├── types.ts               # TypeScript 類型定義
│   └── api.ts                 # API 工具函式
└── styles/
    └── globals.css            # 全局樣式
```

## 🔧 常見開發任務

### 1. 修改 ASI 數據

編輯 `app/api/readiness/route.ts`：

```typescript
const readinessData: ReadinessData = {
  asi_index: 73.2,        // 修改 ASI 指數
  countdown_days: 2424,   // 修改倒數天數
  safety_bias: 18.1,      // 修改安全偏移
  domains: {
    tone: 66,             // 媒體語氣
    components: 81,        // 關鍵元件
    infrastructure: 72,    // 基建演化
    convergence: 54,       // 跨域整合
    hcmi: 63              // 心智認知
  },
  last_updated: "2025-11-17T00:00:00Z"
};
```

保存後，頁面會自動重新載入（熱重載）。

### 2. 修改樣式和主題

#### 全局樣式
編輯 `styles/globals.css`

#### TailwindCSS 配置
編輯 `tailwind.config.ts` 來修改顏色主題：

```typescript
theme: {
  extend: {
    colors: {
      'neon-blue': '#64c8ff',  // 霓光藍色
      // 添加更多顏色...
    }
  }
}
```

### 3. 修改組件

#### 主儀表組件
`app/components/MainGauge.tsx` - 顯示 ASI 指數和倒數

#### 五元素卡片
`app/components/DomainsGrid.tsx` - 顯示五個文明元素

#### 雷達圖
`app/components/DomainRadar.tsx` - 五維雷達圖可視化

### 4. 添加新功能

1. 在 `app/components/` 創建新組件
2. 在 `app/page.tsx` 中引入並使用
3. 保存後自動重新載入

## 🔄 熱重載 (Hot Reload)

Next.js 開發模式支援熱重載：
- 修改 `.tsx`、`.ts`、`.css` 檔案後自動刷新
- 無需手動重啟服務器

## 🛠️ 開發工具

### TypeScript 類型檢查
```powershell
npx tsc --noEmit
```

### 代碼檢查
```powershell
npm run lint
```

### 構建測試
```powershell
npm run build
```

## 📊 測試 API

### 使用瀏覽器
訪問：http://localhost:3000/api/readiness

### 使用 PowerShell
```powershell
Invoke-WebRequest -Uri http://localhost:3000/api/readiness | Select-Object -ExpandProperty Content
```

### 使用 curl（如果有）
```bash
curl http://localhost:3000/api/readiness
```

## 🎨 樣式開發提示

### 顏色主題
- 主色：`#64c8ff` (neon-blue)
- 背景：深色漸層
- 文字：`#e0e6ed`

### TailwindCSS 類別
- `text-neon-blue` - 霓光藍文字
- `bg-glass` - 玻璃擬態背景
- `text-shadow-glow` - 發光文字效果

## 🐛 調試技巧

### 1. 查看控制台
- 瀏覽器開發者工具 (F12)
- 檢查 Console 和 Network 標籤

### 2. 查看終端輸出
開發服務器會在終端顯示：
- 編譯錯誤
- 路由信息
- 構建狀態

### 3. 檢查組件狀態
在組件中添加 `console.log()` 來調試：

```typescript
useEffect(() => {
  console.log('Data loaded:', data);
}, [data]);
```

## ⚡ 性能優化

### 開發模式
- 自動啟用熱重載
- 詳細錯誤信息
- 源映射 (Source Maps)

### 生產模式測試
```powershell
npm run build
npm start
```
訪問 http://localhost:3000 查看生產版本

## 📝 迭代開發流程

1. **修改代碼** → 保存檔案
2. **自動重新載入** → 查看效果
3. **測試功能** → 確認正常
4. **重複迭代** → 持續改進

## 🎯 下一步

完成本地開發後：
1. 測試所有功能
2. 運行 `npm run build` 確保無錯誤
3. 查看 `DEPLOYMENT-GUIDE.md` 準備部署

---

**開始開發吧！修改任何檔案都會自動重新載入。** 🚀


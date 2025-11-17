# 🚀 C謀開發計畫 - 文明資料接入實施方案

## 📋 專案概述

根據《C謀資料供應標準協議 v1.0》，實現從 Google Sheet 讀取文明五元素數據和語氣標語，並整合到前端儀表板。

---

## 🎯 階段一：數據接入層（Data Access Layer）

### 1.1 創建 Google Sheet API 工具函式

**文件**: `lib/sheets.ts`

**功能**:
- 實現三種讀取方式：
  1. Google Sheet API（官方）
  2. CSV 公開連結（最快）
  3. 本地緩存（1小時刷新）

**優先級**: ⭐⭐⭐⭐⭐

---

### 1.2 創建 API 路由端點

**文件**: `app/api/sheets/route.ts`

**功能**:
- `/api/sheets/civilization` - 獲取文明五元素數據
- `/api/sheets/slogans` - 獲取語氣標語（最近12句）

**優先級**: ⭐⭐⭐⭐⭐

---

### 1.3 環境變數配置

**文件**: `.env.local`

**需要配置**:
```
GOOGLE_SHEET_ID=17UHgrjvnJZNq4cgZSg1MbStafDOoeeJh8__ZRYZeSnI
GOOGLE_API_KEY=your_api_key_here
```

**優先級**: ⭐⭐⭐⭐

---

## 🎯 階段二：數據處理層（Data Processing Layer）

### 2.1 更新數據類型定義

**文件**: `lib/types.ts`

**新增類型**:
```typescript
interface CivilizationData {
  timestamp: string;
  components: number;
  tone: number;
  convergence: number;
  infrastructure: number;
  hcmi: number;
  asi: number;
}

interface SloganData {
  timestamp: string;
  slogan: string;
}
```

**優先級**: ⭐⭐⭐⭐

---

### 2.2 實現數據轉換函式

**文件**: `lib/dataTransform.ts`

**功能**:
- 將 Google Sheet 數據轉換為 `ReadinessData` 格式
- 計算衍生指標（心術平衡、倒數天數等）
- 數據驗證和錯誤處理

**優先級**: ⭐⭐⭐⭐

---

### 2.3 實現本地緩存機制

**文件**: `lib/cache.ts`

**功能**:
- 內存緩存（1小時TTL）
- 自動刷新機制
- 緩存失效處理

**優先級**: ⭐⭐⭐

---

## 🎯 階段三：前端整合層（Frontend Integration）

### 3.1 更新主數據獲取邏輯

**文件**: `lib/api.ts`

**修改**:
- 優先從 `/api/sheets/civilization` 獲取數據
- 回退到 `/api/latest` 或本地緩存

**優先級**: ⭐⭐⭐⭐⭐

---

### 3.2 創建語氣標語組件

**文件**: `app/components/SloganTicker.tsx`

**功能**:
- 跑馬燈顯示最近12句標語
- 自動輪播
- 響應式設計

**優先級**: ⭐⭐⭐⭐

---

### 3.3 更新主頁面

**文件**: `app/page.tsx`

**修改**:
- 添加語氣標語跑馬燈區域
- 確保數據自動刷新

**優先級**: ⭐⭐⭐⭐

---

## 🎯 階段四：自動化更新機制

### 4.1 實現數據刷新 Hook

**文件**: `lib/hooks/useAutoRefresh.ts`

**功能**:
- 每小時自動刷新數據
- 檢測數據更新時間
- 智能刷新（只在數據更新後刷新）

**優先級**: ⭐⭐⭐

---

### 4.2 實現更新通知

**文件**: `app/components/UpdateIndicator.tsx`

**功能**:
- 顯示最後更新時間
- 顯示下次更新倒數
- 手動刷新按鈕

**優先級**: ⭐⭐

---

## 📝 實施步驟詳解

### Step 1: 創建 Google Sheet 工具函式

```typescript
// lib/sheets.ts
export async function fetchCivilizationData(): Promise<CivilizationData[]>
export async function fetchSlogans(count: number = 12): Promise<SloganData[]>
export function getCSVUrl(sheetName: string): string
export function parseCSV(csvText: string): any[]
```

### Step 2: 創建 API 路由

```typescript
// app/api/sheets/civilization/route.ts
export async function GET() {
  // 從 Google Sheet 讀取最新數據
  // 返回 ReadinessData 格式
}

// app/api/sheets/slogans/route.ts
export async function GET() {
  // 從 Google Sheet 讀取最近12句標語
  // 返回 SloganData[] 格式
}
```

### Step 3: 更新前端組件

```typescript
// 更新 lib/api.ts 使用新的端點
// 創建 SloganTicker 組件
// 更新主頁面添加標語顯示
```

### Step 4: 實現緩存機制

```typescript
// lib/cache.ts
class DataCache {
  get(key: string): any
  set(key: string, value: any, ttl: number): void
  clear(): void
}
```

---

## 🔧 技術實現細節

### Google Sheet CSV 讀取方式（推薦）

```typescript
const SHEET_ID = '17UHgrjvnJZNq4cgZSg1MbStafDOoeeJh8__ZRYZeSnI';

// 文明五元素
const csvUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=工作表1`;

// 語氣標語
const slogansUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=語氣標語`;
```

### 數據解析邏輯

```typescript
function parseCSV(csvText: string): any[] {
  const lines = csvText.split('\n');
  const headers = lines[0].split(',');
  return lines.slice(1).map(line => {
    const values = line.split(',');
    return headers.reduce((obj, header, i) => {
      obj[header.trim()] = values[i]?.trim() || '';
      return obj;
    }, {} as any);
  });
}
```

---

## 📊 數據流程圖

```
Google Sheet
    ↓
[方法A] Google Sheet API
[方法B] CSV 公開連結 ← 推薦（最快）
[方法C] 本地緩存（1小時TTL）
    ↓
Next.js API Routes
    /api/sheets/civilization
    /api/sheets/slogans
    ↓
前端組件
    MainGauge
    DomainsGrid
    SloganTicker
    ↓
用戶界面
```

---

## ✅ 檢查清單

### 階段一：數據接入
- [ ] 創建 `lib/sheets.ts` 工具函式
- [ ] 實現 CSV 讀取方式
- [ ] 實現 Google Sheet API 讀取方式
- [ ] 創建 `/api/sheets/civilization` 端點
- [ ] 創建 `/api/sheets/slogans` 端點
- [ ] 配置環境變數

### 階段二：數據處理
- [ ] 更新類型定義
- [ ] 實現數據轉換函式
- [ ] 實現本地緩存機制
- [ ] 添加數據驗證

### 階段三：前端整合
- [ ] 更新 `lib/api.ts` 使用新端點
- [ ] 創建 `SloganTicker` 組件
- [ ] 更新主頁面添加標語顯示
- [ ] 測試數據刷新

### 階段四：自動化
- [ ] 實現自動刷新 Hook
- [ ] 創建更新指示器組件
- [ ] 實現智能刷新邏輯

---

## 🚀 優先實施順序

1. **Step 1**: 創建 CSV 讀取函式（最快實現）
2. **Step 2**: 創建 API 路由端點
3. **Step 3**: 更新前端數據獲取邏輯
4. **Step 4**: 創建語氣標語組件
5. **Step 5**: 實現緩存機制
6. **Step 6**: 添加自動刷新

---

## 📝 注意事項

1. **數據更新時間**: 00:00、06:00、12:00、18:00（台北時區）
2. **緩存策略**: 1小時TTL，避免過度請求
3. **錯誤處理**: 必須有完整的回退機制
4. **性能優化**: CSV 方式最快，優先使用
5. **CORS**: Google Sheet CSV 公開連結無 CORS 問題

---

**準備開始實施！** 🎯


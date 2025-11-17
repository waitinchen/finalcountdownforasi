# 《ASI 指標計算白皮書 v1.0》開發計畫

## 📋 當前實現 vs 白皮書規格對比

### ❌ 當前實現的問題

1. **Tech Index 計算錯誤**
   - 當前：`avgTech = (tone + components + infrastructure + convergence) / 4`（簡單平均）
   - 應為：`Tech = 0.40 × C + 0.35 × I + 0.25 × X`（加權計算，不包含 tone）

2. **Heart Index 未實現**
   - 當前：沒有單獨計算 Heart Index
   - 應為：`Heart = 0.60 × H + 0.40 × M`

3. **Readiness Index 計算錯誤**
   - 當前：使用 `fiveElementMaturity`（五元素平均值）
   - 應為：`Readiness = (Tech × Heart) ÷ 100`（乘法模型）

4. **Countdown Days 計算錯誤**
   - 當前：`daysLeft = (100 - avgTech) × 1024`
   - 應為：`Days = (100 - Readiness) × 1024`

5. **Balance Index 計算錯誤**
   - 當前：`balanceIndex = hcmi / avgTech * 100`
   - 應為：`BalanceIndex = (1 - normGap) × 100`，其中：
     - `gap = |Tech - Heart|`
     - `normGap = min(gap / 50, 1)`

6. **Safety Bias 計算錯誤**
   - 當前：`safety_bias = balanceIndex - 100`
   - 應為：`SafetyBias = Tech - Heart`

7. **Balance Label 未實現**
   - 當前：沒有狀態標籤
   - 應為：根據 BalanceIndex 顯示「心術相隨」、「心快於術/術快於心」、「理想過多/技術暴衝」

---

## ✅ 開發任務清單

### 階段一：核心計算邏輯重構

#### 1.1 更新數據類型定義
- [ ] 在 `lib/types.ts` 中添加：
  - `tech_index: number` - 術指數
  - `heart_index: number` - 心指數
  - `readiness_index: number` - ASI 文明成熟度（替代 `asi_index`）
  - `balance_label: string` - 平衡狀態標籤

#### 1.2 重寫計算函數
- [ ] 在 `lib/dataTransform.ts` 中實現：
  - `calculateTechIndex()` - 計算術指數
  - `calculateHeartIndex()` - 計算心指數
  - `calculateReadinessIndex()` - 計算文明成熟度
  - `calculateCountdownDays()` - 計算倒數天數
  - `calculateBalanceIndex()` - 計算平衡指數
  - `calculateSafetyBias()` - 計算安全偏移
  - `getBalanceLabel()` - 獲取平衡狀態標籤

#### 1.3 更新轉換函數
- [ ] 重寫 `transformToReadinessData()` 使用新的計算公式

---

### 階段二：API 端點更新

#### 2.1 更新所有 API 路由
- [ ] `app/api/sheets/civilization/route.ts`
- [ ] `app/api/readiness/route.ts`
- [ ] `app/api/latest/route.ts`
- [ ] 更新 fallback 數據計算邏輯

#### 2.2 更新客戶端 API
- [ ] `lib/api.ts` - 更新 fallback 數據計算

---

### 階段三：UI 組件更新

#### 3.1 MainGauge 組件
- [ ] 將 `asi_index` 改為 `readiness_index`
- [ ] 更新顯示邏輯和顏色判斷

#### 3.2 BalanceGauge 組件
- [ ] 更新平衡指數計算邏輯
- [ ] 更新狀態標籤顯示（使用 `balance_label`）
- [ ] 調整顏色和狀態判斷邏輯

#### 3.3 DomainRadar 組件
- [ ] 確保使用正確的數據源

#### 3.4 DomainsGrid 組件
- [ ] 更新 fallback 數據計算

---

### 階段四：文檔和測試

#### 4.1 創建白皮書文檔
- [ ] 將白皮書內容保存為 `ASI指標計算白皮書v1.0.md`
- [ ] 添加到項目文檔目錄

#### 4.2 測試驗證
- [ ] 使用白皮書中的範例數據測試：
  ```json
  {
    "tone": 1,
    "components": 100,
    "convergence": 0,
    "infrastructure": 100,
    "hcmi": 100
  }
  ```
- [ ] 驗證計算結果：
  - Tech = 0.40 × 100 + 0.35 × 100 + 0.25 × 0 = 75
  - Heart = 0.60 × 100 + 0.40 × 1 = 60.4
  - Readiness = (75 × 60.4) ÷ 100 = 45.3
  - Days = (100 - 45.3) × 1024 = 56,320
  - BalanceIndex = (1 - min(|75 - 60.4| / 50, 1)) × 100 = (1 - min(14.6/50, 1)) × 100 = (1 - 0.292) × 100 = 70.8
  - SafetyBias = 75 - 60.4 = +14.6

---

## 🔧 技術實現細節

### 核心公式實現

```typescript
// 1. Tech Index
const techIndex = 0.40 * components + 0.35 * infrastructure + 0.25 * convergence;

// 2. Heart Index
const heartIndex = 0.60 * hcmi + 0.40 * tone;

// 3. Readiness Index (乘法模型)
const readinessIndex = (techIndex * heartIndex) / 100;

// 4. Countdown Days
const countdownDays = Math.round((100 - readinessIndex) * 1024);

// 5. Balance Index
const gap = Math.abs(techIndex - heartIndex);
const normGap = Math.min(gap / 50, 1);
const balanceIndex = (1 - normGap) * 100;

// 6. Safety Bias
const safetyBias = techIndex - heartIndex;

// 7. Balance Label
const getBalanceLabel = (balanceIndex: number, techIndex: number, heartIndex: number): string => {
  if (balanceIndex >= 80) return '心術相隨';
  if (balanceIndex >= 40) {
    return techIndex > heartIndex ? '術快於心' : '心快於術';
  }
  return techIndex > heartIndex ? '技術暴衝' : '理想過多';
};
```

---

## 📊 數據結構更新

### 新的 ReadinessData 接口

```typescript
export interface ReadinessData {
  // 五元素原始數據
  domains: {
    tone: number;        // M - 媒體語氣
    components: number;   // C - 技術零件
    infrastructure: number; // I - 基建演化
    convergence: number;   // X - 跨域整合
    hcmi: number;          // H - 心智成熟度
  };
  
  // 計算指標
  tech_index: number;        // 術指數 (0-100)
  heart_index: number;        // 心指數 (0-100)
  readiness_index: number;     // ASI 文明成熟度 (0-100)
  countdown_days: number;      // 倒數天數
  balance_index: number;       // 平衡指數 (0-100)
  balance_label: string;        // 平衡狀態標籤
  safety_bias: number;          // 安全偏移 (Tech - Heart)
  
  // 元數據
  last_updated: string;
}
```

---

## 🎯 優先級

1. **高優先級**：核心計算邏輯重構（階段一）
2. **高優先級**：API 端點更新（階段二）
3. **中優先級**：UI 組件更新（階段三）
4. **低優先級**：文檔和測試（階段四）

---

## 📝 注意事項

1. **向後兼容**：考慮是否需要保留舊的 `asi_index` 字段（設為 0 或映射到 `readiness_index`）
2. **精度處理**：所有計算結果保留適當的小數位數
3. **邊界情況**：處理除零、負數等異常情況
4. **性能優化**：計算函數應該高效，避免重複計算

---

## ✅ 完成標準

- [ ] 所有計算公式符合白皮書規格
- [ ] 使用範例數據驗證計算結果正確
- [ ] UI 正確顯示所有新指標
- [ ] API 返回完整的數據結構
- [ ] 文檔已更新


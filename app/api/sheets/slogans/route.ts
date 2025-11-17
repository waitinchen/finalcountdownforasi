import { NextResponse } from 'next/server';
import { fetchSlogans, SloganData } from '@/lib/sheets';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const count = parseInt(searchParams.get('count') || '12') || 12;
    
    console.log(`[/api/sheets/slogans] 開始獲取語氣標語（${count}句）...`);
    
    // 從 Google Sheet 獲取語氣標語
    const slogans = await fetchSlogans(count);
    
    console.log(`[/api/sheets/slogans] 獲取到 ${slogans.length} 句標語`);
    
    return NextResponse.json({
      status: 'ok',
      count: slogans.length,
      slogans: slogans,
    });
  } catch (error) {
    console.error('[/api/sheets/slogans] 錯誤:', error);
    
    // 回退到預設標語（10則）
    const fallbackSlogans: SloganData[] = [
      { timestamp: new Date().toISOString(), slogan: '「技術在加速，但你的心準備好了嗎？」' },
      { timestamp: new Date().toISOString(), slogan: '「不要害怕 ASI，要問：我們配得上它嗎？」' },
      { timestamp: new Date().toISOString(), slogan: '「文明不是等 ASI 改變，而是先改變自己。」' },
      { timestamp: new Date().toISOString(), slogan: '「慈悲不能退化，即使技術進化。」' },
      { timestamp: new Date().toISOString(), slogan: '「每一天都是準備，每一刻都是修行。」' },
      { timestamp: new Date().toISOString(), slogan: '「ASI 不是敵人，無知才是。」' },
      { timestamp: new Date().toISOString(), slogan: '「你能控制 AI，但你能控制自己的心嗎？」' },
      { timestamp: new Date().toISOString(), slogan: '「文明的臨界點，不在技術，在心智。」' },
      { timestamp: new Date().toISOString(), slogan: '「不要只想著 ASI 能做什麼，想想你能做什麼。」' },
      { timestamp: new Date().toISOString(), slogan: '「時間不多了，但還來得及。」' },
    ];
    
    return NextResponse.json({
      status: 'ok',
      count: fallbackSlogans.length,
      slogans: fallbackSlogans,
    });
  }
}


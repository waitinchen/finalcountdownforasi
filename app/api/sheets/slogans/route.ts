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
    
    // 回退到預設標語
    const fallbackSlogans: SloganData[] = [
      { timestamp: new Date().toISOString(), slogan: '「文明的心已經追上技術的腳步。」' },
      { timestamp: new Date().toISOString(), slogan: '「基建與技術正同步加速。」' },
      { timestamp: new Date().toISOString(), slogan: '「這不是預測，是文明壓力的敘事量化。」' },
    ];
    
    return NextResponse.json({
      status: 'ok',
      count: fallbackSlogans.length,
      slogans: fallbackSlogans,
    });
  }
}


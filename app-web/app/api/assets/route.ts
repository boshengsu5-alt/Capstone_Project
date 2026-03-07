import { NextResponse } from 'next/server';
import { query } from '@/lib/db'; // 确保你的 db.ts 路径正确

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, type, serial, location, status, condition, qr_code } = body;

    // 1. 严格对应组长 001_initial_schema.sql 中的 assets 表字段
    // 注意：去掉了可能冲突的 id 和 created_at，让数据库自动生成
    const sql = `
      INSERT INTO assets (
        name, 
        type, 
        serial, 
        location, 
        status, 
        condition, 
        qr_code
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;

    const values = [
      name, 
      type || 'Hardware', 
      serial || null, 
      location || null, 
      status || 'available', 
      condition || 'good', 
      qr_code || `QR-${Date.now()}`
    ];

    const result = await query(sql, values);

    return NextResponse.json({ 
      success: true, 
      data: result.rows[0] 
    });

  } catch (error: any) {
    console.error('Database Error:', error);
    // 2. 返回更具体的错误，帮我们判断是哪里没对齐
    return NextResponse.json(
      { error: error.message || '数据库写入失败' }, 
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const result = await query('SELECT * FROM assets ORDER BY created_at DESC');
    return NextResponse.json(result.rows);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

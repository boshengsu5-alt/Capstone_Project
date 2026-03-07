import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const { rows } = await query('SELECT * FROM assets ORDER BY id DESC');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching assets:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, type, serial, price, location, status } = body;

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const { rows } = await query(
      `INSERT INTO assets (name, type, serial, price, location, status)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        name,
        type || 'Other',
        serial || 'N/A',
        price || 0,
        location || 'Unassigned',
        status || 'available',
      ]
    );

    return NextResponse.json(rows[0], { status: 201 });
  } catch (error: any) {
    console.error('Error creating asset - Full details:', error);
    if (error.code) {
      console.error('Database Error Code:', error.code);
    }
    return NextResponse.json(
      { 
        error: 'Failed to save asset', 
        details: error.message || String(error),
        code: error.code
      }, 
      { status: 500 }
    );
  }
}

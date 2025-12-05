import { db } from '@/lib/db';
import { users } from '@/db/schema';
import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    // 1. Cek apakah user sudah ada
    const existingUser = await db.select().from(users).where(eq(users.email, 'admin@hris.com'));
    
    if (existingUser.length > 0) {
      return NextResponse.json({ 
        message: 'User admin sudah ada sebelumnya!',
        email: 'admin@hris.com' 
      });
    }

    // 2. Hash password "admin123"
    const hashedPassword = await hash('admin123', 10);

    // 3. Masukkan ke DB
    const result = await db.insert(users).values({
      name: 'Super Admin',
      email: 'admin@hris.com',
      password: hashedPassword,
    }).returning();

    return NextResponse.json({ 
      message: 'User admin berhasil dibuat!',
      user: { name: result[0].name, email: result[0].email }
    });
  } catch (error) {
    return NextResponse.json({ 
      error: 'Gagal membuat user',
      detail: error.message 
    }, { status: 500 });
  }
}
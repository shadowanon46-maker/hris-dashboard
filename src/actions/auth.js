'use server';

import { db } from '@/lib/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { compare } from 'bcryptjs';
import { createSession, deleteSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export async function login(prevState, formData) {
  const email = formData.get('email');
  const password = formData.get('password');

  // 1. Cari user di DB berdasarkan email
  const userResult = await db.select().from(users).where(eq(users.email, email));
  const user = userResult[0];

  if (!user) {
    return { message: 'Email tidak ditemukan.' };
  }

  // 2. Cek apakah password cocok
  const isMatch = await compare(password, user.password);
  
  if (!isMatch) {
    return { message: 'Password salah.' };
  }

  // 3. Jika cocok, buat session
  await createSession({ userId: user.id, name: user.name, role: 'admin' });

  // 4. Redirect ke dashboard
  redirect('/dashboard');
}

export async function logout() {
  await deleteSession();
  redirect('/');
}
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET);

// 1. Fungsi membuat Session (Login)
export async function createSession(payload) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d') // Login berlaku 1 hari
    .sign(SECRET_KEY);

  // Simpan token di Cookies browser
  const cookieStore = await cookies();
  cookieStore.set('session', token, {
    httpOnly: true, // Tidak bisa dibaca JS browser (aman dari XSS)
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });
}

// 2. Fungsi verifikasi Session (Cek apakah login?)
export async function verifySession() {
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;

  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload; // Kembalikan data user (id, email, nama)
  } catch (error) {
    return null; // Token palsu/kadaluarsa
  }
}

// 3. Fungsi Logout
export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
}
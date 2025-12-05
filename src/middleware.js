import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request) {
  // 1. Ambil cookie 'session' dari browser
  const session = request.cookies.get('session')?.value;
  
  // 2. Tentukan halaman yang mau diproteksi & halaman public
  const currentPath = request.nextUrl.pathname;
  const isDashboard = currentPath.startsWith('/dashboard');
  const isLoginPage = currentPath === '/';

  // Kunci rahasia untuk verifikasi token (harus sama dengan .env)
  const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);

  try {
    // 3. Cek validitas token jika ada session
    let isValid = false;
    if (session) {
      await jwtVerify(session, secretKey);
      isValid = true;
    }

    // SKENARIO A: Belum login, tapi maksa masuk Dashboard
    if (isDashboard && !isValid) {
      // Tendang balik ke halaman Login
      return NextResponse.redirect(new URL('/', request.url));
    }

    // SKENARIO B: Sudah login, tapi mau buka halaman Login lagi
    if (isLoginPage && isValid) {
      // Arahkan langsung ke Dashboard (UX yang baik)
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // Lanjut ke halaman yang dituju
    return NextResponse.next();

  } catch (error) {
    // Jika token error/palsu, anggap belum login
    if (isDashboard) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }
}

// Konfigurasi: Middleware hanya jalan di path tertentu (biar gak lemot)
// Kita exclude file statis, gambar, favicon, dll
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
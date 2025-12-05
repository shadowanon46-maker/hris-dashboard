import Sidebar from '@/components/Sidebar';
import { verifySession } from '@/lib/auth'; // Import fungsi helper kita

export default async function DashboardLayout({ children }) {
  // Ambil data session di server component
  const session = await verifySession();
  const userName = session?.name || 'User'; // Fallback jika nama tidak terbaca

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />

      <main className="ml-64 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-xl font-semibold text-slate-800">
              Halo, {userName} 👋
            </h2>
            <p className="text-sm text-slate-500">Selamat bekerja kembali.</p>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-slate-700">{userName}</p>
                <p className="text-xs text-slate-500 capitalize">{session?.role || 'Staff'}</p>
             </div>
             <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                {userName.charAt(0).toUpperCase()}
             </div>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}
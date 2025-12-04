import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content Area */}
      {/* ml-64 memberikan margin kiri sebesar lebar sidebar agar konten tidak tertutup */}
      <main className="ml-64 p-8">
        {/* Header sederhana */}
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-semibold text-slate-800">
            Selamat Datang, Admin
          </h2>
          <div className="h-10 w-10 bg-blue-500 rounded-full"></div>
        </header>

        {/* 'children' adalah halaman yang sedang dibuka (page.js) */}
        {children}
      </main>
    </div>
  );
}
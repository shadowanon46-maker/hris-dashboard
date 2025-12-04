export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-slate-50 text-slate-900">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold tracking-tight text-blue-600">
          HRIS Dashboard
        </h1>
        <p className="text-xl text-slate-600">
          Next.js 15 + Tailwind v4 + JavaScript
        </p>
        
        {/* Tombol dummy untuk tes Tailwind v4 */}
        <button className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition">
          Mulai Sekarang
        </button>
      </div>
    </main>
  );
}
export default function EmployeesPage() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Daftar Karyawan</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          + Tambah Karyawan
        </button>
      </div>
      
      <p className="text-slate-500">
        Tabel data karyawan akan muncul di sini (Database belum terkoneksi).
      </p>
    </div>
  );
}
import EmployeeList from '@/components/EmployeeList';

export default function EmployeesPage() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 min-h-[500px]">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Manajemen Karyawan</h1>
        <p className="text-slate-500">Kelola data karyawan perusahaan (Demo Mode).</p>
      </div>

      {/* Memanggil Client Component di dalam Server Component */}
      <EmployeeList />
    </div>
  );
}
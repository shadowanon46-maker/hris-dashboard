import { db } from '@/lib/db';
import { employees } from '@/db/schema';
import { desc } from 'drizzle-orm';
import EmployeeList from '@/components/EmployeeList';

// Page ini Async karena mengambil data dari DB
export default async function EmployeesPage() {
  // Query ke Database: Ambil semua data urut dari yang terbaru
  const employeeData = await db
    .select()
    .from(employees)
    .orderBy(desc(employees.id));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 min-h-[500px]">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Manajemen Karyawan</h1>
        <p className="text-slate-500">Data Real-Time dari PostgreSQL.</p>
      </div>

      {/* 
         Kirim data dari DB ke komponen Client.
         Komponen 'EmployeeList' sekarang hanya bertugas MENAMPILKAN dan INTERAKSI,
         bukan menyimpan state utama.
      */}
      <EmployeeList initialData={employeeData} />
    </div>
  );
}
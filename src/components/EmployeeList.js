'use client'; // 👈 WAJIB: Menandakan ini adalah Client Component

import { useState } from 'react';

export default function EmployeeList() {
  // 1. STATE: Menyimpan data karyawan sementara
  const [employees, setEmployees] = useState([
    { id: 1, name: 'Budi Santoso', position: 'Software Engineer' },
    { id: 2, name: 'Siti Aminah', position: 'HR Manager' },
    { id: 3, name: 'Agus Pratama', position: 'Product Designer' },
  ]);

  // STATE: Untuk input form
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');

  // 2. FUNCTION: Menambah karyawan
  const handleAddEmployee = (e) => {
    e.preventDefault(); // Mencegah reload halaman saat submit form

    if (!name || !position) return; // Validasi sederhana

    const newEmployee = {
      id: Date.now(), // ID unik sederhana menggunakan timestamp
      name: name,
      position: position,
    };

    // Update state dengan menyalin data lama (...) + data baru
    setEmployees([...employees, newEmployee]);

    // Reset form
    setName('');
    setPosition('');
  };

  // 3. FUNCTION: Menghapus karyawan
  const handleDelete = (id) => {
    // Filter array: ambil semua data KECUALI yang id-nya sama dengan yang dihapus
    const updatedEmployees = employees.filter((emp) => emp.id !== id);
    setEmployees(updatedEmployees);
  };

  return (
    <div className="space-y-6">
      {/* --- FORM INPUT --- */}
      <form onSubmit={handleAddEmployee} className="bg-slate-50 p-4 rounded-lg border border-slate-200 flex gap-4 items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Contoh: Ahmad Dhani"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-slate-700 mb-1">Posisi / Jabatan</label>
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Contoh: Backend Dev"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2.5 rounded-md hover:bg-blue-700 transition font-medium"
        >
          Tambah
        </button>
      </form>

      {/* --- TABEL DATA --- */}
      <div className="overflow-hidden rounded-lg border border-slate-200">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-100 text-slate-800 uppercase font-semibold">
            <tr>
              <th className="px-6 py-3">Nama Karyawan</th>
              <th className="px-6 py-3">Posisi</th>
              <th className="px-6 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {employees.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-center text-slate-400">
                  Belum ada data karyawan.
                </td>
              </tr>
            ) : (
              employees.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4 font-medium text-slate-900">{emp.name}</td>
                  <td className="px-6 py-4">{emp.position}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(emp.id)}
                      className="text-red-500 hover:text-red-700 font-medium text-sm"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
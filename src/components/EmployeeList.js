'use client';

import { useState } from 'react';
import { addEmployee, deleteEmployee } from '@/actions/employees'; // Import Server Actions

export default function EmployeeList({ initialData }) {
  // Kita tidak perlu state 'employees' lagi untuk menyimpan list, 
  // karena list akan otomatis ter-update lewat props 'initialData' 
  // setelah revalidatePath berjalan.
  
  // State form input tetap butuh
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // HANDLE TAMBAH
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name || !position) return;

    setIsSaving(true);
    
    // Panggil Server Action
    await addEmployee(name, position);
    
    // Reset Form
    setName('');
    setPosition('');
    setIsSaving(false);
  };

  // HANDLE HAPUS
  const handleDelete = async (id) => {
    const confirmDelete = confirm('Yakin ingin menghapus karyawan ini?');
    if (!confirmDelete) return;

    await deleteEmployee(id);
  };

  return (
    <div className="space-y-6">
      {/* FORM INPUT */}
      <form onSubmit={handleAdd} className="bg-slate-50 p-4 rounded-lg border border-slate-200 flex gap-4 items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isSaving}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            placeholder="Nama Karyawan..."
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-slate-700 mb-1">Posisi</label>
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            disabled={isSaving}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            placeholder="Contoh: Staff Gudang"
          />
        </div>
        <button
          type="submit"
          disabled={isSaving}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-md hover:bg-blue-700 transition font-medium disabled:bg-blue-400"
        >
          {isSaving ? 'Menyimpan...' : 'Tambah'}
        </button>
      </form>

      {/* TABEL DATA */}
      <div className="overflow-hidden rounded-lg border border-slate-200">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-100 text-slate-800 uppercase font-semibold">
            <tr>
              <th className="px-6 py-3">Nama Karyawan</th>
              <th className="px-6 py-3">Posisi</th>
              <th className="px-6 py-3">Bergabung</th>
              <th className="px-6 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {initialData.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-slate-400">
                  Belum ada data di database.
                </td>
              </tr>
            ) : (
              initialData.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4 font-medium text-slate-900">{emp.name}</td>
                  <td className="px-6 py-4">{emp.position}</td>
                  <td className="px-6 py-4 text-xs text-slate-400">
                    {/* Format tanggal sederhana */}
                    {new Date(emp.createdAt).toLocaleDateString('id-ID')}
                  </td>
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
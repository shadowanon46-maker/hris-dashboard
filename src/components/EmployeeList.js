'use client';

import { useState } from 'react';
import { addEmployee, deleteEmployee } from '@/actions/employees';
// Import komponen shadcn
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function EmployeeList({ initialData }) {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name || !position) return;
    setIsSaving(true);
    await addEmployee(name, position);
    setName('');
    setPosition('');
    setIsSaving(false);
  };

  const handleDelete = async (id) => {
    if (confirm('Yakin ingin menghapus?')) {
      await deleteEmployee(id);
    }
  };

  return (
    <div className="space-y-8">
      {/* 1. MENGGUNAKAN CARD UNTUK FORM */}
      <Card>
        <CardHeader>
          <CardTitle>Tambah Karyawan Baru</CardTitle>
          <CardDescription>Masukkan data karyawan yang ingin ditambahkan ke sistem.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAdd} className="flex gap-4 items-end">
            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium leading-none">Nama Lengkap</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama Karyawan..."
                disabled={isSaving}
              />
            </div>
            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium leading-none">Posisi / Jabatan</label>
              <Input
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                placeholder="Contoh: Staff Gudang"
                disabled={isSaving}
              />
            </div>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? 'Menyimpan...' : 'Simpan Data'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* 2. TABEL DATA (UI SEDERHANA) */}
      <Card>
        <div className="p-0 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100/50 border-b">
              <tr>
                <th className="px-6 py-3 font-medium text-slate-500">Nama</th>
                <th className="px-6 py-3 font-medium text-slate-500">Posisi</th>
                <th className="px-6 py-3 font-medium text-slate-500 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {initialData.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium">{emp.name}</td>
                  <td className="px-6 py-4 text-slate-500">{emp.position}</td>
                  <td className="px-6 py-4 text-right">
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDelete(emp.id)}
                    >
                      Hapus
                    </Button>
                  </td>
                </tr>
              ))}
              {initialData.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-slate-400">
                    Tidak ada data.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
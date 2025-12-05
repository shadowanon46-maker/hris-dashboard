'use server';

import { db } from '@/lib/db';
import { employees } from '@/db/schema';
import { eq, desc } from 'drizzle-orm'; 
import { revalidatePath } from 'next/cache';

// 1. CREATE: Tambah Karyawan
export async function addEmployee(name, position) {
  try {
    await db.insert(employees).values({
      name: name,
      position: position,
    });
    
    // Memberitahu Next.js untuk merefresh halaman ini agar data baru muncul
    revalidatePath('/dashboard/employees');
    return { success: true };
  } catch (error) {
    console.error('Gagal tambah karyawan:', error);
    return { success: false, error: 'Gagal menyimpan data' };
  }
}

// 2. DELETE: Hapus Karyawan
export async function deleteEmployee(id) {
  try {
    await db.delete(employees).where(eq(employees.id, id));
    
    revalidatePath('/dashboard/employees');
    return { success: true };
  } catch (error) {
    console.error('Gagal hapus:', error);
    return { success: false };
  }
}
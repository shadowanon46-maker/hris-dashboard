import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

// Mengambil URL dari .env
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Inisialisasi Drizzle
export const db = drizzle(pool);
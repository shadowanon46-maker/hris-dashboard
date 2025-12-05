import 'dotenv/config'; // Load .env agar terbaca

/** @type {import('drizzle-kit').Config} */
export default {
  schema: './src/db/schema.js', // Lokasi schema
  out: './drizzle',             // Folder output migrasi
  dialect: 'postgresql',        // Jenis database
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
};
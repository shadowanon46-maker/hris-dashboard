import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const employees = pgTable('employees', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  position: text('position').notNull(),
  // createdAt otomatis terisi waktu sekarang
  createdAt: timestamp('created_at').defaultNow(),
});
// src/db/schema/announcements.ts
import { pgTable, serial, varchar, text, timestamp, integer } from 'drizzle-orm/pg-core';
import { users } from './users.js';

export const announcements = pgTable('announcements', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  senderId: integer('sender_id').references(() => users.id).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
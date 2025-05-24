// db/schema/encryptedVotes.ts
import { pgTable, integer, text } from 'drizzle-orm/pg-core';
import { rooms } from './rooms.js';
import { options } from './options.js';

export const encryptedVotes = pgTable('encrypted_votes', {
  roomId: integer('room_id').references(() => rooms.id).notNull(),
  optionId: integer('option_id').references(() => options.id).notNull(),
  encryptedData: text('encrypted_data').notNull(), // stringified ciphertext
  
});

import { relations } from 'drizzle-orm';
import { serial, text, pgTable, timestamp } from 'drizzle-orm/pg-core';
import { users } from 'src/users/schema/users.schema';

export const sounds = pgTable('sound', {
  sound_id: serial('sound_id').primaryKey(),
  title: text('title'),
  image_url: text('image_url'),
  selling: text('selling'),
  sound_url: text('sound_url'),
  author_id: text('author_id'),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow(),
});

export const soundAuthor = relations(sounds, ({ one }) => ({
  author: one(users),
}));

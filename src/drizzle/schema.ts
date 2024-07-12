import { relations } from 'drizzle-orm';
import { serial, text, pgTable, pgEnum, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';

export const userEnum = pgEnum('role', ['User', 'Admin']);

export const users = pgTable('user', {
  user_id: serial('user_id').primaryKey(),
  email: text('email').unique(),
  name: text('name'),
  password: text('password'),
  provider: text('provider'),
  provider_id: text('provider_id'),
  picture: text('picture'),
  refresh_token: text('refresh_token'),
  role: userEnum('role').default('User'),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow(),
});

export const userSounds = relations(users, ({ many }) => ({
  sounds: many(sounds),
}));

export const insertUserSchema = createInsertSchema(users);

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

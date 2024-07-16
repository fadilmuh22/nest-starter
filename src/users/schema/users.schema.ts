import { relations } from 'drizzle-orm';
import { serial, text, pgTable, pgEnum, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { sounds } from 'src/sounds/schema/sounds.schema';

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

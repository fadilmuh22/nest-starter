DO $$ BEGIN
 CREATE TYPE "public"."role" AS ENUM('User', 'Admin');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sound" (
	"sound_id" serial PRIMARY KEY NOT NULL,
	"title" text,
	"image_url" text,
	"selling" text,
	"sound_url" text,
	"author_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"user_id" serial PRIMARY KEY NOT NULL,
	"email" text,
	"name" text,
	"password" text,
	"provider" text,
	"provider_id" text,
	"picture" text,
	"refresh_token" text,
	"role" "role" DEFAULT 'User',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);

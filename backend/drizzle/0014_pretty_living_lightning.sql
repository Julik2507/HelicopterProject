CREATE TABLE IF NOT EXISTS "tokens" (
	"id" serial PRIMARY KEY NOT NULL,
	"token" varchar
);
--> statement-breakpoint
ALTER TABLE "goods" DROP COLUMN IF EXISTS "img";
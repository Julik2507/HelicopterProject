CREATE TABLE IF NOT EXISTS "people" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"age" integer,
	"email" varchar(256)
);
--> statement-breakpoint
DROP TABLE "users";
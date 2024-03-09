ALTER TABLE "people" RENAME TO "users";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "age" TO "password";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "password" SET DATA TYPE varchar(256);
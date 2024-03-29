CREATE TABLE IF NOT EXISTS "basket" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "basket" ADD CONSTRAINT "basket_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

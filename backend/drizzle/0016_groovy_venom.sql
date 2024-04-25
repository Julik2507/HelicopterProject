CREATE TABLE IF NOT EXISTS "subtypes" (
	"id" serial PRIMARY KEY NOT NULL,
	"type_id" integer,
	"name" varchar,
	CONSTRAINT "subtypes_name_unique" UNIQUE("name")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "subtypes" ADD CONSTRAINT "subtypes_type_id_types_id_fk" FOREIGN KEY ("type_id") REFERENCES "types"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

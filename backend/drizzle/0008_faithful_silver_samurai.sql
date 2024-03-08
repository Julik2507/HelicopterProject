CREATE TABLE IF NOT EXISTS "TypeBrand" (
	"id" serial PRIMARY KEY NOT NULL,
	"type_id" integer,
	"brand_id" integer
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "TypeBrand" ADD CONSTRAINT "TypeBrand_type_id_types_id_fk" FOREIGN KEY ("type_id") REFERENCES "types"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "TypeBrand" ADD CONSTRAINT "TypeBrand_brand_id_brands_id_fk" FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

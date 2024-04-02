CREATE TABLE IF NOT EXISTS "attribute_values" (
	"id" serial PRIMARY KEY NOT NULL,
	"goods_id" integer,
	"attribute_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "attributes" (
	"id" serial PRIMARY KEY NOT NULL,
	"attribute" varchar
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "attribute_values" ADD CONSTRAINT "attribute_values_goods_id_goods_id_fk" FOREIGN KEY ("goods_id") REFERENCES "goods"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "attribute_values" ADD CONSTRAINT "attribute_values_attribute_id_attributes_id_fk" FOREIGN KEY ("attribute_id") REFERENCES "attributes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

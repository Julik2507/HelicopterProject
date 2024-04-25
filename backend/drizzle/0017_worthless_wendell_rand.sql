ALTER TABLE "goods" RENAME COLUMN "type_id" TO "subtype_id";--> statement-breakpoint
ALTER TABLE "goods" DROP CONSTRAINT "goods_type_id_types_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "goods" ADD CONSTRAINT "goods_subtype_id_subtypes_id_fk" FOREIGN KEY ("subtype_id") REFERENCES "subtypes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

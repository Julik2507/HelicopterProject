ALTER TABLE "goods" ADD COLUMN "type_id" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "goods" ADD CONSTRAINT "goods_type_id_types_id_fk" FOREIGN KEY ("type_id") REFERENCES "types"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

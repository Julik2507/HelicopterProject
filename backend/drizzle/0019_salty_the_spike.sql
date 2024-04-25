ALTER TABLE "goods" DROP CONSTRAINT "goods_type_id_types_id_fk";
--> statement-breakpoint
ALTER TABLE "goods" DROP COLUMN IF EXISTS "type_id";
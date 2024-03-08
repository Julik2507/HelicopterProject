ALTER TABLE "goodsInfo" RENAME TO "infoGoods";--> statement-breakpoint
ALTER TABLE "infoGoods" DROP CONSTRAINT "goodsInfo_goods_id_goods_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "infoGoods" ADD CONSTRAINT "infoGoods_goods_id_goods_id_fk" FOREIGN KEY ("goods_id") REFERENCES "goods"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

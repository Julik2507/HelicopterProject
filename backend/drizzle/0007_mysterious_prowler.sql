CREATE TABLE IF NOT EXISTS "basketGoods" (
	"id" serial PRIMARY KEY NOT NULL,
	"basket_id" integer,
	"goods_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "brands" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "goods" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"price" integer,
	"rating" integer,
	"img" varchar,
	"brand_id" integer,
	"type_id" integer,
	CONSTRAINT "goods_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "goodsInfo" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar,
	"description" varchar,
	"goods_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rating" (
	"id" serial PRIMARY KEY NOT NULL,
	"rate" varchar,
	"user_id" integer,
	"goods_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "types" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "basketGoods" ADD CONSTRAINT "basketGoods_basket_id_basket_id_fk" FOREIGN KEY ("basket_id") REFERENCES "basket"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "basketGoods" ADD CONSTRAINT "basketGoods_goods_id_goods_id_fk" FOREIGN KEY ("goods_id") REFERENCES "goods"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "goods" ADD CONSTRAINT "goods_brand_id_brands_id_fk" FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "goods" ADD CONSTRAINT "goods_type_id_types_id_fk" FOREIGN KEY ("type_id") REFERENCES "types"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "goodsInfo" ADD CONSTRAINT "goodsInfo_goods_id_goods_id_fk" FOREIGN KEY ("goods_id") REFERENCES "goods"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rating" ADD CONSTRAINT "rating_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rating" ADD CONSTRAINT "rating_goods_id_goods_id_fk" FOREIGN KEY ("goods_id") REFERENCES "goods"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

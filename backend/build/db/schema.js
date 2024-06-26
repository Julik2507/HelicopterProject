import { integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
export const users = pgTable("users", {
    id: serial("id").primaryKey().notNull(),
    name: text("name").notNull(),
    email: varchar("email", { length: 256 }).notNull(),
    password: varchar("password", { length: 256 }).notNull(),
    role: varchar("role", { length: 256 }).notNull(),
});
export const basket = pgTable("basket", {
    id: serial("id").primaryKey(),
    user_id: integer("user_id").references(() => users.id),
});
export const types = pgTable("types", {
    id: serial("id").primaryKey(),
    name: varchar("name"),
});
export const brands = pgTable("brands", {
    id: serial("id").primaryKey(),
    name: varchar("name"),
});
export const goods = pgTable("goods", {
    id: serial("id").primaryKey(),
    name: varchar("name").unique(),
    price: integer("price"),
    rating: integer("rating"),
    brand_id: integer("brand_id").references(() => brands.id),
    subtype_id: integer("subtype_id").references(() => subtypes.id),
    img_id: integer("img_id"),
});
export const infoGoods = pgTable("infoGoods", {
    id: serial("id").primaryKey(),
    title: varchar("title"),
    description: varchar("description"),
    goods_id: integer("goods_id").references(() => goods.id),
});
export const basketGoods = pgTable("basketGoods", {
    id: serial("id").primaryKey(),
    basket_id: integer("basket_id").references(() => basket.id),
    goods_id: integer("goods_id").references(() => goods.id),
    quantity: integer("quantity"),
});
export const rating = pgTable("rating", {
    id: serial("id").primaryKey(),
    rate: varchar("rate"),
    user_id: integer("user_id").references(() => users.id),
    goods_id: integer("goods_id").references(() => goods.id),
});
export const typeBrand = pgTable("TypeBrand", {
    id: serial("id").primaryKey(),
    type_id: integer("type_id").references(() => types.id),
    brand_id: integer("brand_id").references(() => brands.id),
});
export const images = pgTable("images", {
    id: serial("id").primaryKey(),
    img: varchar("img"),
});
export const attributes = pgTable("attributes", {
    id: serial("id").primaryKey(),
    attribute: varchar("attribute"),
});
export const attribute_values = pgTable("attribute_values", {
    id: serial("id").primaryKey(),
    goods_id: integer("goods_id").references(() => goods.id),
    attribute_id: integer("attribute_id").references(() => attributes.id),
    value: varchar("value"),
});
export const tokens = pgTable("tokens", {
    id: serial("id").primaryKey(),
    user_id: integer("user_id").references(() => users.id),
    token: varchar("token"),
});
export const subtypes = pgTable("subtypes", {
    id: serial("id").primaryKey(),
    type_id: integer("type_id").references(() => types.id),
    name: varchar("name").unique(),
});
//# sourceMappingURL=schema.js.map
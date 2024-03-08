import { integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
export const people = pgTable("people", {
    id: serial("id").primaryKey(),
    name: text("name"),
    age: integer("age"),
    email: varchar("email", { length: 256 }),
});
//# sourceMappingURL=schema.js.map
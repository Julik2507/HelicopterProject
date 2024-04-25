import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import * as schema from "./schema.js";
const { Pool } = pg;
const pool = new Pool({
    user: "gen_user",
    host: "82.97.255.180",
    database: "default_db",
    password: "qqDZCd7DFJpU*Q",
    port: 5432,
});
export const db = drizzle(pool, { schema });
async function main() {
    console.log("migration starting..");
    await migrate(db, { migrationsFolder: "drizzle" });
    console.log("migrations is ended");
}
main();
//# sourceMappingURL=migrate.js.map
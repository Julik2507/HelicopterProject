import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import * as schema from "./schema.js";
import { config } from "../configuration/index.js";
const { Pool } = pg;
const pool = new Pool({
    user: config.db_user,
    host: config.db_host,
    database: config.db_database,
    password: config.db_password,
    port: config.db_port,
});
export const db = drizzle(pool, { schema });
async function main() {
    console.log("migration starting..");
    await migrate(db, { migrationsFolder: "drizzle" });
    console.log("migrations is ended");
}
main();
//# sourceMappingURL=migrate.js.map
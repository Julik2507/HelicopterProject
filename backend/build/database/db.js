import pkg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
const { Pool } = pkg;
export const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "postgres",
    port: 5432,
});
const db = drizzle(pool);
async function main() {
    console.log("migration starting..");
    await migrate(db, { migrationsFolder: "drizzle" });
    console.log("migrations is ended");
    process.exit(0);
}
main().catch((err) => {
    console.log(err);
    process.exit(0);
});
//# sourceMappingURL=db.js.map
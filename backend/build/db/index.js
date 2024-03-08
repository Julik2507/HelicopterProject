import { drizzle } from "drizzle-orm/node-postgres";
import pkg from "pg";
const { Client } = pkg;
import * as schema from "./schema.js";
const client = new Client({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "postgres",
    port: 5432,
});
client.connect();
export const db = drizzle(client, { schema: schema });
//# sourceMappingURL=index.js.map
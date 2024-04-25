import dotenv from "dotenv";
dotenv.config();
export const config = {
    port: process.env.PORT,
    db_port: process.env.DB_PORT,
    db_host: process.env.DB_HOST,
    db_user: process.env.DB_USER,
    db_database: process.env.DB_DATABASE,
    db_password: process.env.DB_PASSWORD,
    secret_access: process.env.SECRET_ACCESS,
    secret_refresh: process.env.SECRET_REFRESH,
    expireAccess: process.env.EXPIRE_JWT_ACCESS,
    expireRefresh: process.env.EXPIRE_JWT_REFRESH,
};
//# sourceMappingURL=index.js.map
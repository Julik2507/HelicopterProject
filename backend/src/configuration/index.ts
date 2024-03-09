import dotenv from "dotenv";
dotenv.config();

export const config: any = {
  port: process.env.PORT,
  db_port: process.env.DB_PORT,
  db_host: process.env.DB_HOST,
  db_user: process.env.DB_USER,
  db_database: process.env.DB_DATABASE,
  db_password: process.env.DB_PASSWORD,
  secret: process.env.SECRET,
  expire: process.env.EXPIRE_JWT,
};

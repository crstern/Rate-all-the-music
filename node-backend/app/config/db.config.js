
module.exports = {
    HOST: process.env.POSTGRES_HOST,
    USER: process.env.POSTGRES_USER,
    PASSWORD: process.env.POSTGRES_PASSWORD,
    DB: process.env.AUTH_DB,
    port: process.env.POSTGRES_PORT,
    dialect: "postgres",
  };
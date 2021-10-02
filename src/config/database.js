module.exports = {
  dialect: "postgres",
  host: process.env.DB_HOST ?? "localhost",
  username: process.env.DB_USER ?? "postgres",
  password: process.env.DB_USER ?? "secret",
  database: process.env.DB_DATABASE ?? "postgres",
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  },
}
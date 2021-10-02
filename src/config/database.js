module.exports = {
  dialect: "postgres",
  host: process.env.DB_HOST,
  username: "postgres",
  password: "secret",
  database: process.env.DB_DATABASE,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  },
}
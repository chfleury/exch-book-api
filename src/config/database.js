require('dotenv/config');

module.exports = {
  dialect: "postgres",
  host: 'ec2-54-204-148-110.compute-1.amazonaws.com',
  username: 'ianvopnsmcdyms',
  password: 'dcd1790c38bb9553f6c4c6c324f684081a04afdb5f501c5f6d92d2c24709c417',
  database: 'dfkc43tl7esiuf',
  uri: 'postgres://ianvopnsmcdyms:dcd1790c38bb9553f6c4c6c324f684081a04afdb5f501c5f6d92d2c24709c417@ec2-54-204-148-110.compute-1.amazonaws.com:5432/dfkc43tl7esiuf',
  url: 'postgres://ianvopnsmcdyms:dcd1790c38bb9553f6c4c6c324f684081a04afdb5f501c5f6d92d2c24709c417@ec2-54-204-148-110.compute-1.amazonaws.com:5432/dfkc43tl7esiuf',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  },
}
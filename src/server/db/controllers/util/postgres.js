
const pgp = require('pg-promise')({});

const cn = {
  host: 'namethatcard-dev.cgbcdoczmmnf.us-east-1.rds.amazonaws.com',
  port: 5432,
  database: 'namecard',
  user: 'root',
  password: '12345678',

};
const db = pgp(cn);

module.exports = db;

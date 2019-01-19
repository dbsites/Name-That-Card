
const pgp = require('pg-promise')({});

let cn = {}

if(process.env.NODE_ENV === 'production') {
  console.log('Running in production mode');
  cn = {
    host: process.env.RDS_HOSTNAME,
    port: process.env.RDS_PORT,
    database: process.env.RDS_DB_NAME,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,

  };
} else {
  console.log('Running in development mode');
  cn = {
    host: 'namethatcard-dev.cgbcdoczmmnf.us-east-1.rds.amazonaws.com',
    port: 5432,
    database: 'namecard',
    user: 'root',
    password: '12345678',
 };
}
console.log(Date(), `Connecting to ${cn.database} on ${cn.host}`);
const db = pgp(cn);

module.exports = db;

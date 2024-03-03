const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "Ushaswi@30",
  host: "localhost",
  port: 5432,
  database: "Ushaswi",
});

module.exports = pool;

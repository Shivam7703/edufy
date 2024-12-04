// utils/db.ts
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: "sql12.freesqldatabase.com",
  user: "sql12749662",
  password: "ei7VrRyd1n",
  database: "sql12749662",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;
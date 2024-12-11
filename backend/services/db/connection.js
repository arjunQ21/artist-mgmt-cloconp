import { config } from "dotenv";
config()
import { createPool } from "mysql2";
console.log(process.env)

const pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
  
  // Example query
  pool.query('SELECT * FROM user', (err, results) => {
    if (err) {
        console.error('Error executing query:', err.message);
        console.log(err)
      return;
    }
    console.log('Query Results:', results);
  });

import mysql from 'mysql2';

const DB = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'myzone_db',
  port: 3306,
});

DB.connect((err) => {
  if (err) {
    console.error('❌ Error connecting to the database:', err.message);
    return;
  }
  console.log('✅ Connected to the database.');
});

export default DB;

// dotenv.config();

import mysql from 'mysql2';




// הגדרת החיבור למסד נתוניםn
const pool = mysql.createPool({
    // host: process.env.DB_HOST,
    // user: process.env.DB_USER,
    // password: process.env.DB_PASSWORD,
    // database: process.env.DB_NAME,
    // port: process.env.DB_PORT || 3306,
    // waitForConnections: true,
    // connectionLimit: 10,
    // queueLimit: 0
   
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'myzone_db',
        port: 3306,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
});

const promisePool = pool.promise();

promisePool.getConnection()
  .then(conn => {
    console.log('✅ התחברת בהצלחה למסד הנתונים!');
    conn.release();
  })
  .catch(err => {
    console.error('❌ שגיאה בהתחברות למסד הנתונים:', err.message);
  });
export default promisePool;

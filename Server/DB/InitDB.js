import dotenv from 'dotenv';
import DB from './Config.js'; 
dotenv.config();

// שאילתות יצירת טבלאות
const Users = `
    CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
  );
`;

const Passwords = `
      CREATE TABLE IF NOT EXISTS passwords (
      user_id INT PRIMARY KEY,
      password_hash VARCHAR(255) NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
`;

const Todos = `
      CREATE TABLE IF NOT EXISTS todos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        completed BOOLEAN DEFAULT false,
        user_id INT,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
`;

const Posts = `
      CREATE TABLE IF NOT EXISTS posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT,
        user_id INT,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
`;

const Comments = `
   CREATE TABLE IF NOT EXISTS comments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        content TEXT NOT NULL,
        post_id INT,
        user_id INT,
        FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
`;

// הרצת כל השאילתות בסדר הנכון
export const initTables = async () => {
  try {
    await DB.query(Users);
    console.log("✅ users table created.");

    await DB.query(Passwords);
    console.log("✅ passwords table created.");

    await DB.query(Todos);
    console.log("✅ todos table created.");

    await DB.query(Posts);
    console.log("✅ posts table created.");

    await DB.query(Comments);
    console.log("✅ comments Details table created.");

    await DB.end(); 

    console.log("📦 All tables created and connection closed.");

  } catch (err) {
    console.error("❌ Error creating tables:", err.message);
  }
};



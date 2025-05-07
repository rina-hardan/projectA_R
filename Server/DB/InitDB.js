import DB from './Config.js'; 

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
  post_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);
`;

DB.query(Users, (err) => {
  if (err) console.error("❌ Error creating users table:", err);
  else console.log("✅ users table created successfully.");
});

DB.query(Passwords, (err) => {
  if (err) console.error("❌ Error creating passwords table:", err);
  else console.log("✅ passwords table created successfully.");
});

DB.query(Todos, (err) => {
  if (err) console.error("❌ Error creating todos table:", err);
  else console.log("✅ todos table created successfully.");
});

DB.query(Posts, (err) => {
  if (err) console.error("❌ Error creating posts table:", err);
  else console.log("✅ posts table created successfully.");
});

DB.query(Comments, (err) => {
  if (err) console.error("❌ Error creating comments table:", err);
  else console.log("✅ comments table created successfully.");
});

// DB.end();

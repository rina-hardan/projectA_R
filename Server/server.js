// חיבורים וטעינה מוקדמת
import express from 'express';
import cors from 'cors';

// חיבור למסד נתונים
import './DB/Config.js';
import './DB/InitDB.js';

// טעינת ראוטרים
import userRouter from "./routers/usersRoutes.js";
// import todos from "./routers/todosRoutes.js";
// import posts from "./routers/postsRoutes.js";
// import comments from "./routers/commentsRoutes.js";

// יצירת אפליקציה
const app = express();

// מידלוורים (middlewares)
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));

app.use(express.json()); // זה חשוב שיהיה לפני כל route שמשתמש ב־req.body

// ראוטים
app.use("/api/users", userRouter);
// app.use('/api/todos', todos);
// app.use("/api/posts", posts);
// app.use("/api/comments", comments);

app.get('/', (req, res) => {
  res.send('ברוכה הבאה לשרת!');
});

// הפעלת השרת
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

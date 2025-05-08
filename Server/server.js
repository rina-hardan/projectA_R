// Imports and initial loading
import express from 'express';
import cors from 'cors';

// Database connection
import './DB/Config.js';
import './DB/InitDB.js';

// Routers
import users from "./routers/usersRoutes.js";
import todos from "./routers/todosRoutes.js";
import posts from "./routers/postsRoutes.js";
import comments from "./routers/commentsRoutes.js";

// Create Express app
const app = express();

// Middlewares
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5000'],
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/users", users);
app.use('/api/todos', todos);
app.use("/api/posts", posts);
app.use("/api/comments", comments);

app.get('/', (req, res) => {
  res.send('Welcome to the server!');
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

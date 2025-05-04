import usersModel from "../models/usersModel.js";
import bcrypt from "bcrypt";

const usersController = {
    getAllUsers: (req, res) => {
        usersModel.getAllUsers((err, users) => {
            if (err) return res.status(500).json({ error: "Database error" });
            if (!users) return res.status(404).json({ error: "users not found" });
            res.json(users);
        });
    },

    getUserById: (req, res) => {
        const { user_id } = req.params;
        usersModel.getUserById(user_id, (err, user) => {
            if (err) return res.status(500).json({ error: "Database error" });
            if (!user) return res.status(404).json({ error: "user not found" });
            res.json(user);
        });
    },

    addUser: (req, res) => {
        const user = req.body;
        const { username, name, email, password } = user;

        if (!name || !username || !email || !password) {
            return res.status(400).json({ error: "יש למלא את כל השדות הנדרשים" });
        }

        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                console.error("❌ שגיאה בהצפנת הסיסמה:", err);
                return res.status(500).json({ error: "שגיאה בהצפנת הסיסמה" });
            }

            const userToSave = {
                name,
                username,
                email,
                password: hashedPassword
            };

            usersModel.addUser(userToSave, (err, result) => {
                if (err) {
                    console.error("❌ שגיאה בהוספת המשתמש למסד:", err);
                    return res.status(500).json({ error: "שגיאה בהוספת המשתמש" });
                }

                res.status(201).json({ message: "✅ המשתמש נוסף בהצלחה", userId: result.insertId });
            });
        });
    }
};

export default usersController;

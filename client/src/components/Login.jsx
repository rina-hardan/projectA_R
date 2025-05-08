import { useState, useContext } from "react";
import Form from "../components/Form.jsx";
import {sendRequest} from '../DB_API.jsx';  
import '../CSS/Login.css';
import { Link, useNavigate } from "react-router-dom";
import { CurrentUserContext } from '../App';
import useMessage from "../hooks/useMessage";

export default function Login() {
    const { setCurrentUser } = useContext(CurrentUserContext);
    const inputFields = [
        { title: "userName", type: "text" },
        { title: "password", type: "password" }
    ];
    
    const [formData, setFormData] = useState({ userName: "", password: "" });
    const [message, setMessage] = useMessage("");
    const navigate = useNavigate();

    async function handleFormSubmitted() {
        setMessage("");
        const { userName, password } = formData;

        if (!userName || !password) {
            setMessage("Please fill all the details");
            return;
        }
       

        const { data, status } = await sendRequest({
            method: 'POST',
            url: '/users/login',  
            body: { username:userName,password },  
        });
      
        if (status === 'FAILED') {
            setMessage("Failed doing get request");
            return;
        }

        if (data && data.user) {
            localStorage.setItem("currentUser", JSON.stringify(data.user));
            setCurrentUser(data.user);
            navigate(`/users/${data.user.username}/Home`);
          } else {
            setMessage("User does not exist, please register");
          }
    }

    return (
        <div className="login-container">
            <Link className="link" to="/Register">Register</Link>
            <h1>Login</h1>
            <div className="login-form">
                <Form
                    inputFields={inputFields}
                    formData={formData}
                    setFormData={setFormData}
                    handleFormSubmitted={handleFormSubmitted}
                    message={message}
                />
            </div>
        </div>
    );
}

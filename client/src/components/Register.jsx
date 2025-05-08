import { useContext, useState } from "react";
import Form from "../components/Form";
import { sendRequest, FAILED, SUCCESS } from "../DB_API";
import '../CSS/Register.css';
import { useNavigate, Link } from "react-router-dom";
import { CurrentUserContext } from '../App';
import useMessage from "../hooks/useMessage";

export default function Register() {
    const { setCurrentUser } = useContext(CurrentUserContext);

    const inputFields = [
        { title: "name", type: "text" },
        { title: "username", type: "text" },
        { title: "email", type: "email" },
        { title: "password", type: "password" }
    ];

    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        password: ""
    });
    const [message, setMessage] = useMessage();
    const navigate = useNavigate();

    async function handleFormSubmitted() {
        if (Object.values(formData).some(value => value.trim() === "")) {
            setMessage("Please fill all the details");
            return;
        }

        const newUser = {
            name: formData.name,
            username: formData.username,
            email: formData.email,
            password: formData.password
        };


        const { data, status } = await sendRequest({
            method: 'POST',
            url: '/users/register',
            body: newUser,
        });
        if (status === FAILED) {
            setMessage("Failed to register user.");
            return;
        }
        console.log(data);
        console.log(status);
        const fullUserData = { ...newUser, id: data.userId };
        localStorage.setItem("currentUser", JSON.stringify(fullUserData));
        setCurrentUser(fullUserData);
        navigate(`/users/${data.username}/Home`);
    }

    console.log(formData)
    return (
        <div className="register-container">
            <h1>FullRegister</h1>
            <div className="register-form">
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

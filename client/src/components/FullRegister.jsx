import { useState, useContext } from "react";
import Form from "../components/Form";
import { addEntity, FAILED } from "../DB_API";
import '../CSS/Register.css';  
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from '../App';
import useMessage from "../hooks/useMessage";

export default function FullRegister() {
    const { setCurrentUser } = useContext(CurrentUserContext);
    const inputFields = [
        { title: "name", type: "text" },
        { title: "username", type: "text" },
        { title: "email", type: "email" }
    ];
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: ""
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
            email: formData.email
        };

        const { data, status } = await addEntity("users", newUser);

        if (status === FAILED) {
            setMessage("Failed doing post request");
            return;
        }

        localStorage.setItem("currentUser", JSON.stringify(data));
        setCurrentUser(data);
        navigate(`/users/${data.id}/Home`);
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

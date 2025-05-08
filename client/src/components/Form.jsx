import React from 'react';
import '../CSS/Form.css';  

export default function Form({ inputFields, formData, setFormData, message, handleFormSubmitted }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
console.log(formData);
    return (
        <div className="form-container">
            {
                inputFields.map((input, i) => (
                    <input
                        key={i}
                        name={input.title}
                        type={input.type}
                        placeholder={input.title}
                        value={formData[input.title] || ""}
                        onChange={handleChange}
                    />
                ))
            }
            <p className="error-message">{message}</p>
            <button type="submit" onClick={handleFormSubmitted}>Submit</button>
        </div>
    );
}

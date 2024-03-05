import  { useState } from 'react';
import axios from 'axios';
import {NavLink} from "react-router-dom";

const EditContact = ({ initialName = '', initialPhone = '', initialEmail = '', initialPhoto = '' }) => {
    const [name, setName] = useState(initialName);
    const [phone, setPhone] = useState(initialPhone);
    const [email, setEmail] = useState(initialEmail);
    const [photo, setPhoto] = useState(initialPhoto);

    const handleSubmit = () => {
        if (!name) {
            alert('Вы ничего не ввели');
            return;
        }

        const updatedQuote = {
            name: name,
            phone: phone,
            email: email,
            photo: photo,
        };



    return (
        <div className="contact-card container">
            <h3>Create new contact</h3>
            <input
                className="nameInput"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                className="phoneInput"
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            <input
                className="emailInput"
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className="photoInput"
                type="text"
                placeholder="Photo Link"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
            />

            <NavLink to="/"><button onClick={handleSubmit}>Сохранить изменения</button></NavLink>
        </div>
    );
};

export default EditContact;

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateContact } from './reducers/contactsSlice';
import { NavLink } from 'react-router-dom';

interface Props {
    id: string;
    initialName: string;
    initialPhone: string;
    initialEmail: string;
    initialPhoto: string;
}

const EditContact: React.FC<Props> = ({ id, initialName, initialPhone, initialEmail, initialPhoto }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState(initialName);
    const [phone, setPhone] = useState(initialPhone);
    const [email, setEmail] = useState(initialEmail);
    const [photo, setPhoto] = useState(initialPhoto);

    const handleSubmit = () => {
        const updatedContact = {
            name: name,
            phone: phone,
            email: email,
            photo: photo,
        };

        dispatch(updateContact({ id: id, updatedContact: updatedContact }));
    };

    return (
        <div className="contact-card container">
            <h2>Редактировать контакт</h2>
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

            <NavLink to="/">
                <button onClick={handleSubmit}>Сохранить изменения</button>
            </NavLink>
        </div>
    );
};

export default EditContact;

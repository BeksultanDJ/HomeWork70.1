import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from './reducers/contactsSlice';
import { NavLink } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

const NewContact: React.FC = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [photo, setPhoto] = useState('');

    const handleSubmit = () => {
        const newContact = {
            id: uuid(),
            name: name,
            phone: phone,
            email: email,
            photo: photo,
        };

        dispatch(addContact(newContact));

        setName('');
        setPhone('');
        setEmail('');
        setPhoto('');
    };

    return (
        <div className="contact-card container">
            <h2>Создать новый контакт</h2>
            <input
                className="nameInput"
                type="text"
                placeholder="Имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                className="phoneInput"
                type="text"
                placeholder="Телефон"
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
                placeholder="Ссылка на фото"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
            />
            <NavLink to="/">
                <button onClick={handleSubmit}>Создать</button>
            </NavLink>
        </div>
    );
};

export default NewContact;

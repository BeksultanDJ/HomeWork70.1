import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { RootState } from './reducers/contactsSlice';
import { fetchContacts, deleteContact } from './reducers/contactsSlice';

interface Contact {
    id: string;
    name: string;
    phone: number;
    email: string;
    photo: string;
}

const Contacts: React.FC = () => {
    const dispatch = useDispatch();
    const contacts = useSelector((state: RootState) => state.contacts.contacts);
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);

    const handleDelete = (id: string) => {
        dispatch(deleteContact(id));
    };

    const defaultPhotoUrl = 'https://cdn.pixabay.com/photo/2016/08/31/11/54/icon-1633249_1280.png';

    const openModal = (contact: Contact) => {
        setSelectedContact(contact);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className="container">
            <div className="contact">
                {contacts.map((contact) => (
                    <div className="contactCard" onClick={() => openModal(contact)} key={contact.id}>
                        <img src={contact.photo || defaultPhotoUrl} alt={`${contact.name} photo`} />
                        <h2>{contact.name}</h2>
                    </div>
                ))}
            </div>
            {showModal && selectedContact && (
                <div className="modal">
                    <div className="modalContent">
                        <span className="closeButton" onClick={closeModal}>&times;</span>
                        <div>
                            <img src={selectedContact.photo || defaultPhotoUrl} alt={`${selectedContact.name} photo`} />
                        </div>

                        <div className="contactInfo">
                            <h3>{selectedContact.name}</h3>
                            <a href="#">{selectedContact.phone}</a>
                            <a href="#">{selectedContact.email}</a>
                        </div>

                        <div className="modalBtns">
                            <button onClick={() => handleDelete(selectedContact.id)}>Удалить</button>
                            <NavLink className="cardLinks" to={`/${selectedContact.id}/EditContact`}>
                                <button className="cardBtn">Edit Contact</button>
                            </NavLink>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Contacts;

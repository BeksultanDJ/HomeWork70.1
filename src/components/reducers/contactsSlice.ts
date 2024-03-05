import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Contact {
    id: string;
    name: string;
    phone: number;
    email: string;
    photo: string;
}

export const fetchContacts = createAsyncThunk(
    'contacts/fetchContacts',
    async () => {
        try {
            const response = await axios.get('https://testapi2-bf456-default-rtdb.asia-southeast1.firebasedatabase.app/contacts.json');
            if (response.data) {
                const contactsArray: Contact[] = Object.entries(response.data).map(([id, contact]: [string, any]) => ({
                    id,
                    ...contact,
                }));
                return contactsArray;
            }
        } catch (error) {
            console.error('Ошибка при получении контактов:', error);
            throw error;
        }
    }
);

export const addContact = createAsyncThunk(
    'contacts/addContact',
    async (newContact: Contact) => {
        try {
            const response = await axios.post('https://testapi2-bf456-default-rtdb.asia-southeast1.firebasedatabase.app/contacts.json', newContact);
            console.log('Данные успешно отправлены!', response.data);
            return newContact;
        } catch (error) {
            console.error('Ошибка при отправке данных:', error);
            throw error;
        }
    }
);

export const updateContact = createAsyncThunk(
    'contacts/updateContact',
    async ({ id, updatedContact }: { id: string, updatedContact: Contact }) => {
        try {
            const response = await axios.put(`https://testapi2-bf456-default-rtdb.asia-southeast1.firebasedatabase.app/contacts/${id}.json`, updatedContact);
            console.log('Контакт успешно отредактирован!', response.data);
            return { id, updatedContact };
        } catch (error) {
            console.error('Ошибка при редактировании контакта:', error);
            throw error;
        }
    }
);

export const deleteContact = createAsyncThunk(
    'contacts/deleteContact',
    async (id: string) => {
        try {
            await axios.delete(`https://testapi2-bf456-default-rtdb.asia-southeast1.firebasedatabase.app/contacts/${id}.json`);
            console.log('Контакт успешно удален!');
            return id;
        } catch (error) {
            console.error('Ошибка при удалении контакта:', error);
            throw error;
        }
    }
);


const initialState: ContactsState = {
    contacts: [],
    selectedContact: null,
    loading: false,
    error: null,
};


export { fetchContacts, addContact, updateContact, deleteContact };
export default contactsSlice.reducer;

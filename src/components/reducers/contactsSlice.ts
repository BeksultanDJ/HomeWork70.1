import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Contact {
    id: string;
    name: string;
    phone: number;
    email: string;
    photo: string;
}

interface ContactsState {
    contacts: Contact[];
    selectedContact: Contact | null;
    loading: boolean;
    error: string | null;
}

const initialState: ContactsState = {
    contacts: [],
    selectedContact: null,
    loading: false,
    error: null,
};

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
            const response = await axios.get(`https://testapi2-bf456-default-rtdb.asia-southeast1.firebasedatabase.app/contacts/${id}.json`);
            const currentContact = response.data;

            const mergedContact = { ...currentContact, ...updatedContact };

            const updateResponse = await axios.put(`https://testapi2-bf456-default-rtdb.asia-southeast1.firebasedatabase.app/contacts/${id}.json`, mergedContact);
            console.log('Контакт успешно отредактирован!', updateResponse.data);

            return { id, updatedContact: mergedContact };
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

const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchContacts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.loading = false;
                state.contacts = action.payload;
            })
            .addCase(fetchContacts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Ошибка при загрузке контактов';
            })
            .addCase(addContact.fulfilled, (state, action) => {
                state.contacts.push(action.payload);
            })
            .addCase(updateContact.fulfilled, (state, action) => {
                const { id, updatedContact } = action.payload;
                const index = state.contacts.findIndex(contact => contact.id === id);
                if (index !== -1) {
                    state.contacts[index] = updatedContact;
                }
            })
            .addCase(deleteContact.fulfilled, (state, action) => {
                const id = action.payload;
                state.contacts = state.contacts.filter(contact => contact.id !== id);
            });
    },
});

export default contactsSlice.reducer;

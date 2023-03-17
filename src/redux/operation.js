import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = 'https://goit-task-manager.herokuapp.com/';

const token = {
    set(token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    },
    unset() {
        axios.defaults.headers.common.Authorization = '';
    },
};

export const register = createAsyncThunk(
    'auth/register',
    async (credentials, { rejectWithValue }) => {
        try {
            console.log(credentials)
            const { data } = await axios.post('/users/signup', credentials);
            console.log(data)
            token.set(data.token);
            console.log(token)
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);


export const logIn = createAsyncThunk(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        console.log(credentials)
        try {
            const { data } = await axios.post('/users/login', credentials);
            console.log(data)
            token.set(data.token);
            console.log(token)
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);


export const logOut = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            await axios.post('/users/logout');
            token.unset();
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const refreshUser = createAsyncThunk(
    'auth/refresh',
    async (_, thunkAPI) => {
        const state = thunkAPI.getState();
        const tokenFresh = state.auth.token;

        if (tokenFresh === null) {
            return thunkAPI.rejectWithValue();
        }
        token.set(tokenFresh);
        try {
            const { data } = await axios.get('/users/current');
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const fetchContacts = createAsyncThunk(
    'contacts/fetchAll',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("/contacts");
            return response.data;

        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }

    });

export const addContact = createAsyncThunk(
    "contact/addContact",
    async ({ name, number }, thunkAPI) => {
        try {
            const newContact = { name, phone: number };
            const response = await axios.post('/contacts', newContact);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const deleteContact = createAsyncThunk(
    "contacts/deleteContact",
    async (id, thunkAPI) => {
        try {
            const response = await axios.delete(`/contacts/${id}`);
            return response.data.id;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + "/api";

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const createUser = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/users`, user);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const getTokens = async () => {
  try {
    const response = await axios.get(`${API_URL}/tokens`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tokens:', error);
    throw error;
  }
};

export const createToken = async (token) => {
  try {
    const response = await axios.post(`${API_URL}/tokens`, token);
    return response.data;
  } catch (error) {
    console.error('Error creating token:', error);
    throw error;
  }
};

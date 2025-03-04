import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Backend URL

// ✅ Add back missing registerUser function
export const registerUser = async (userData) => {
    return await axios.post(`${API_URL}/user/register`, userData);
};

// ✅ Add back missing loginUser function
export const loginUser = async (userData) => {
    return await axios.post(`${API_URL}/user/login`, userData);
};

// Transaction APIs
export const getBalance = async (userId) => {
    return await axios.get(`${API_URL}/account/balance/${userId}`);
};

export const depositMoney = async (accountId, amount) => {
    return await axios.post(`${API_URL}/account/deposit`, { accountId, amount });
};

export const withdrawMoney = async (accountId, amount) => {
    return await axios.post(`${API_URL}/account/withdraw`, { accountId, amount });
};

import axios from "axios";

const API_BASE = "https://loginmvp-backend.onrender.com";

export const signup = async (email, password) => {
    return axios.post(`${API_BASE}/signup`, {email,password});
};

export const login = async (email, password) => {
    return axios.post(`${API_BASE}/login`, {email,password});

}
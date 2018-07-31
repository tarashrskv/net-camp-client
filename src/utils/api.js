import axios from "axios";

export const API = axios.create({
    baseURL: `https://localhost:44363/api/`,
    headers: {
        Authorization: `Bearer ${1 + 1}` // TODO: apply token instead of 1 + 1
    }
});
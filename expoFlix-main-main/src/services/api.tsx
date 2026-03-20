import axios from "axios";

const API_KEY = process.env.EXPO_PUBLIC_API_KEY;
export const api = axios.create({
baseURL: 'https://api.themoviedb.org/3',
timeout: 10000,
params: {
    api_key: API_KEY,
    language: 'pt-BR'
}
});
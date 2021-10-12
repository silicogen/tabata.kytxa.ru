import axios from "axios";
import { jsonStr } from "utils";


export const setToken = (token: string) =>
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export const remToken = () =>
    delete axios.defaults.headers.common['Authorization'];



export const saveToken = (token: string) =>
    localStorage.setItem("token", token);
export const loseToken = () =>
    localStorage.removeItem("token");



export const saveUserData = (user: { id: number, username: string, email: string }) =>
    localStorage.setItem('user_data', jsonStr(user));

export const loseUserData = () =>
    localStorage.removeItem("user_data");

export const getSavedCurrentUser = () => {
    const { token, user_data } = localStorage;
    if (token && user_data) {
        const { id, username, email } = JSON.parse(user_data);
        if (id && username && email) {
            setToken(token);
            return { id, username, email };
        }
    }
    remToken();
    loseToken();
    loseUserData();
    return undefined;
}
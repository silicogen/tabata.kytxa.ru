import axios from "axios";

export const setToken = (token: string) =>
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export const delToken = () =>
    delete axios.defaults.headers.common['Authorization'];

export const getSavedCurrentUser = () => {
    const { token, user_data } = localStorage;
    if (token && user_data) {
        const { id, username, email } = JSON.parse(user_data);
        if (id && username && email) {
            setToken(token);
            return { id, username, email };
        }
    }
    delToken();
    localStorage.removeItem("user_data");
    localStorage.removeItem("token");
    return undefined;
}
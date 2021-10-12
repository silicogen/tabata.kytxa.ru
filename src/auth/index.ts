import axios from "axios";

export const setAuthorizationToken = (token?: string) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

export const getSavedCurrentUser = () => {
    const user_data = localStorage.user_data;
    const token = localStorage.token;
    if (!token || !user_data) {
        setAuthorizationToken(undefined);
        localStorage.removeItem("user_data");
        localStorage.removeItem("token");
        return undefined;
    } else {
        setAuthorizationToken(token);
        return JSON.parse(user_data);
    }
}
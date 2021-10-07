import axios from "axios";
import API_ROUTE from "forum/apiRoute";
import { types } from "mobx-state-tree";

export const InOut = types
    .model("InOut", {

        currentUser: types.optional(types.model("currentUser", {}), {}),
        isAuthenticated: false,
        // currentUser: action.payload,
        // isAuthenticated: !isEmpty(action.payload),
    })
    .actions(self => ({
        async logIn(credentials: { email: string, password: string }) {
            const res = await axios.post(`${API_ROUTE}/login`, credentials)
            let userData = res.data.response
            localStorage.setItem("token", userData.token)
            localStorage.setItem('user_data', JSON.stringify(userData));
            setAuthorizationToken(userData.token)
        },
        async logOut() {
            localStorage.removeItem("token")
            setAuthorizationToken(false)
            window.localStorage.clear(); //update the localstorage
        }
    }));

function setAuthorizationToken(token: boolean | string) {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}
export { setAuthorizationToken };
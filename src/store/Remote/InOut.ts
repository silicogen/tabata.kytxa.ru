import axios from "axios";
import API_ROUTE from "forum/apiRoute";
import { SnapshotOrInstance, types } from "mobx-state-tree";
import { CurrentUser } from "./CurrentUser";

export const InOut = types
    .model("InOut", {

        // isAuthenticated: !isEmpty(action.payload),
        currentUser: types.maybe(CurrentUser)
    })
    .actions(self => ({

        setCurrentUser(user?: SnapshotOrInstance<typeof CurrentUser>) {
            self.currentUser = user;
        },
        async logIn(credentials: { email: string, password: string }) {
            const res = await axios.post(`${API_ROUTE}/login`, credentials)
            let userData = res.data.response
            localStorage.setItem("token", userData.token)
            localStorage.setItem('user_data', JSON.stringify(userData));
            setAuthorizationToken(userData.token);
            this.setCurrentUser(userData);
            let i = 0;
        },
        async logOut() {
            localStorage.removeItem("token")
            setAuthorizationToken(false)
            window.localStorage.clear(); //update the localstorage
            this.setCurrentUser(undefined);
            let i = 0;
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
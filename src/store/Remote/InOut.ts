import axios, { AxiosError } from "axios";
import API_ROUTE from "forum/apiRoute";
import { SnapshotOrInstance, types } from "mobx-state-tree";
import { CurrentUser } from "./CurrentUser";
import { setAuthorizationToken } from "auth/index";

const initState = {
    isAuthenticated: false,
    currentUser: {},
    isLoading: false,
    isLoadingAvatar: false,
    isUpdatingUser: false,
    authError: null,
    authSuccess: null
}

export const InOut = types
    .model("InOut", {
        // isAuthenticated: !isEmpty(action.payload),

        currentUser: types.maybe(CurrentUser),
        incorrectPasswordOrEmail: types.maybe(types.boolean),
    })
    .actions(self => ({
        setIncorrectPasswordOrEmail(incorrect: boolean) {
            self.incorrectPasswordOrEmail = incorrect;
        },
        setCurrentUser(user?: SnapshotOrInstance<typeof CurrentUser>) {
            self.currentUser = user;
        },
        async logIn(credentials: { email: string, password: string }) {
            try {
                const res = await axios.post(`${API_ROUTE}/login`, credentials)
                const userData = res.data.response
                localStorage.setItem("token", userData.token)
                localStorage.setItem('user_data', JSON.stringify(userData));
                setAuthorizationToken(userData.token);
                this.setCurrentUser(userData);
            } catch (err: any) {
                const error = err?.response?.data?.error;
                this.setIncorrectPasswordOrEmail(!!error?.Incorrect_password);
                localStorage.removeItem("token")
                localStorage.removeItem('user_data');
                setAuthorizationToken(undefined);
                this.setCurrentUser(undefined);
                window.alert(JSON.stringify(err?.response?.data?.error));
            }
        },
        async register(credentials: { username: string, email: string, password: string }) {
            let message: string;
            try {
                const axiRes = await axios.post(`${API_ROUTE}/users`, credentials);
                const res = axiRes.data.response;
                if (axiRes.data.status == 201) {
                    message = `Пользователь с именем ${res.username} и почтой ${res.email} успешно создан.`
                } else {
                    message = `Создание пользователя выполнено без возникновения исключительнной ситуации,
                    но всё-же что-то пошло не так:
                    ${JSON.stringify(axiRes)}`;
                }
            } catch (ex) {
                if (axios.isAxiosError(ex)) {
                    message = `AxiosError: ${JSON.stringify(ex.response?.data, undefined, 4)}`;
                }
                else {
                    message = `Some Error: ${JSON.stringify(ex)}`;
                }
            }
            alert(message);
        },
        async logOut() {
            localStorage.removeItem("token")
            localStorage.removeItem('user_data');
            setAuthorizationToken(undefined)
            this.setCurrentUser(undefined);
        }
    }))
    .views(self => ({
        get isAuthenticated() {
            return !!self.currentUser;
        }
    }));
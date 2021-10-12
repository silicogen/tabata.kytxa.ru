import axios from "axios";
import API_ROUTE from "forum/apiRoute";
import { SnapshotOrInstance, types } from "mobx-state-tree";
import { CurrentUser } from "./CurrentUser";
import { setToken, remToken, saveToken, saveUserData, loseToken, loseUserData } from "auth";
import { jsonStr } from "utils";


export const InOut = types
    .model("InOut", {
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
                const axiRes = await axios.post(`${API_ROUTE}/login`, credentials)
                const { id, username, email, token } = axiRes.data.response;
                const user = { id, username, email };
                saveToken(token)
                saveUserData(user);
                setToken(token);
                this.setCurrentUser(user);
            } catch (err: any) {
                const error = err?.response?.data?.error;
                this.setIncorrectPasswordOrEmail(!!error?.Incorrect_password);
                loseToken()
                loseUserData();
                remToken();
                this.setCurrentUser(undefined);
                window.alert(JSON.stringify(error));
            }
        },

        async logOut() {
            loseToken();
            loseUserData();
            remToken()
            this.setCurrentUser(undefined);
        },

        async register(
            credentials: {
                username: string,
                email: string,
                password: string
            }): Promise<string> {
            try {
                const axiRes = await axios.post(`${API_ROUTE}/users`, credentials);
                const res = axiRes.data.response;
                if (axiRes.data.status == 201) {
                    return `Пользователь с именем ${res.username} и почтой ${res.email} успешно создан.`;
                } else {
                    return `Создание пользователя выполнено без возникновения исключительнной ситуации, но всё-же что-то пошло не так, поскольку статус не равен 201: ${jsonStr(axiRes)}`;
                }
            } catch (ex) {
                const ex1 = ex;
                if (axios.isAxiosError(ex)) {
                    return `Axios error response data: ${jsonStr(ex.response?.data)}`;
                }
                else {
                    return `Some Error: ${jsonStr(ex)}`;
                }
            }
        },

        async updateUser(updateUser: {
            email: string,
            current_password: string,
            new_password: string
        }): Promise<string> {
            try {
                const axiRes = await axios.put(`${API_ROUTE}/users/${self.currentUser?.id}`, updateUser);
                const { id, username, email } = axiRes.data.response;
                saveUserData({ id, username, email });
                if (axiRes.data.status == 200) {
                    return `Пользователь сохранён с именем ${username} и почтой ${email}.`;
                } else {
                    return `Изменение пользователя выполнено без возникновения исключительнной ситуации, но всё-же что-то пошло не так, поскольку статус не равен 200: ${jsonStr(axiRes)}`;
                }
            } catch (ex) {
                const ex1 = ex;
                if (axios.isAxiosError(ex)) {
                    return `Axios error response data: ${jsonStr(ex.response?.data)}`;
                }
                else {
                    return `Some Error: ${jsonStr(ex)}`;
                }
            }
            return "";
        },

        async deleteUser(): Promise<string> {
            try {
                const axiRes = await axios.delete(`${API_ROUTE}/users/${self.currentUser?.id}`);
                loseToken();
                loseUserData();
                if (axiRes.data.status == 200) {
                    return `Пользователь успешно удалён.`;
                } else {
                    return `Удаление пользователя выполнено без возникновения исключительнной ситуации, но всё-же что-то пошло не так, поскольку статус не равен 200: ${jsonStr(axiRes)}`;
                }
            } catch (ex) {
                if (axios.isAxiosError(ex)) {
                    return `Axios error response data: ${jsonStr(ex.response?.data)}`;
                }
                else {
                    return `Some Error: ${jsonStr(ex)}`;
                }
            }
        },

    }))
    .views(self => ({
        get isAuthenticated() {
            return !!self.currentUser;
        }
    }));
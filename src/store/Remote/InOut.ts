import axios from "axios";
import API_ROUTE from "forum/apiRoute";
import { types } from "mobx-state-tree";

export const InOut = types
    .model("InOut", {
        email: "",
        password: "",
        updated_at: "",
        username: "",
        created_at: "",
    })
    .actions(self => ({
        setEmail(email: string) {
            self.email = email;
        },
        setPassword(password: string) {
            self.password = password;
        },
        setUpdated_at(time: string) {
            self.updated_at = time;
        },
        logIn() {

        }

    }));
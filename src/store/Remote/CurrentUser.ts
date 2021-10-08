import axios from "axios";
import { types } from "mobx-state-tree";

export const CurrentUser = types
    .model("CurrentUser", {
        avatar_path: types.string,
        email: types.string,
        id: types.number,
        token: types.string,
        username: types.string
    })
    .actions(self => ({

    }));
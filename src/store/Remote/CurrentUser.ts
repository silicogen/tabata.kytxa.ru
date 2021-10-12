import axios from "axios";
import { types } from "mobx-state-tree";

export const CurrentUser = types
    .model("CurrentUser", {
        id: types.number,
        username: types.string,
        email: types.string,
    });
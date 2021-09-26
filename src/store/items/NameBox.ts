import { types } from "mobx-state-tree";

export const NameBox = types
    .model("NameBox", {
        name: ""
    }).actions(self => ({
        setName(name: string) {
            self.name = name;
        }
    }));
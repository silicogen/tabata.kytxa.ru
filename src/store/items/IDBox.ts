import { types } from "mobx-state-tree";
import { v4 as uuidv4 } from 'uuid';
import { ItemsBoxFactory } from ".";

export const IDBox = types
    .model("IDBox", {
        id: types.optional(types.identifier, () => uuidv4())
    });

const IDItemsBoxFactory = () => ItemsBoxFactory(IDBox);
export interface IDItems extends ReturnType<typeof IDItemsBoxFactory> { }
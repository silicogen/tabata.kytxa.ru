import { types, Instance } from "mobx-state-tree";
import { IDBox, NameBox, ItemsBoxFactory } from "./items";

export const Exercize = types
    .compose(IDBox, NameBox)
    .named("Exercize");

export const Exercizes = ItemsBoxFactory(Exercize)
    .named("Exercizes")
    .actions(self => {
        const add = self.add;
        return {
            addDefault(afterItem?: Instance<typeof Exercize>) {
                return add({ name: `упражнение${self.items.length + 1}` }, afterItem);
            }
        }
    });
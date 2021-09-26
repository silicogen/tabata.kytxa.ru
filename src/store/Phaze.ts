import { types, Instance } from "mobx-state-tree";
import { IDBox, NameBox, ItemsBoxFactory, DurationBox } from "./items";

export const Phaze = types
    .compose(IDBox, NameBox, DurationBox)
    .named("Phaze");

export const Phazes = ItemsBoxFactory(Phaze)
    .named("Phazes")
    .actions(self => {
        const add = self.add;
        return {
            addDefault(afterItem?: Instance<typeof Phaze>) {
                return add({ name: `фаза${self.items.length + 1}` }, afterItem);
            }
        }
    });

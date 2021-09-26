import { cast, IAnyModelType, Instance, SnapshotOrInstance, types } from "mobx-state-tree";

export const ItemsBoxFactory = <T extends IAnyModelType>(Model: T) => types
    .model(`ItemsBoxFactory(${Model.name})`, {
        items: types.array(Model),
    }).views(self => ({
        shiftDownIsUnavalable(item?: Instance<typeof Model>): boolean {
            if (!item) return true;
            const index = self.items.indexOf(item);
            if (index === -1) return true;
            return index === 0;
        },

        shiftUpIsUnavalable(item?: Instance<typeof Model>): boolean {
            if (!item) return true;
            const index = self.items.indexOf(item);
            if (index === -1) return true;
            return index === self.items.length - 1;
        },
        removeIsUnavalable(item?: Instance<typeof Model>): boolean {
            if (!item) return true;
            const index = self.items.indexOf(item);
            if (index === -1) return true;
            return false;
        },
    })).actions(self => ({
        add(item: SnapshotOrInstance<typeof Model>, afterItem?: Instance<typeof Model>) {
            if (afterItem) {
                const index = self.items.indexOf(afterItem);
                if (index > -1) {
                    self.items.splice(index + 1, 0, item);
                    return self.items[index + 1];
                }
            }
            self.items.push(item);
            return self.items[self.items.length - 1];
        },

        addDefault(afterItem?: Instance<typeof Model>) {
            return this.add(cast({}), afterItem);
        },

        addArr(items: SnapshotOrInstance<typeof Model>[], afterItem?: Instance<typeof Model>) {
            if (afterItem) {
                const index = self.items.indexOf(afterItem);
                if (index > -1) {
                    self.items.splice(index + 1, 0, ...items);
                    return;
                }
            }
            self.items.push(...items);
        },

        shiftUp(item: Instance<typeof Model>) {
            const arr = Array.from(self.items);
            const index = arr.indexOf(item);
            arr.splice(index, 1);
            arr.splice(index - 1, 0, item);
            self.items.replace(arr);
        },

        shiftDown(item: Instance<typeof Model>) {
            const arr = Array.from(self.items);
            const index = arr.indexOf(item);
            arr.splice(index, 1);
            arr.splice(index + 1, 0, item);
            self.items.replace(arr);
        },

        remove(item: Instance<typeof Model>) {
            self.items.remove(item);
        },

    }));
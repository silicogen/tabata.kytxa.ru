import { types } from "mobx-state-tree";

export const IDsMarker = types.model("IDsMarker", {
    items: types.map(types.boolean),
}).actions(self => ({
    set(id: string, value: boolean) {
        self.items.set(id, value);
    },
    clear() {
        self.items.clear();
    }
})).views(self => ({
    isChecked(id: string) {
        return self.items.get(id) ?? false;
    },
    getIDs(items: { id: string }[]) {
        const trueIDs: string[] = [];
        self.items.forEach((v, k) => v && trueIDs.push(k));
        const result: string[] = [];
        items.forEach(i => trueIDs.includes(i.id) && result.push(i.id));
        return result;
    }
}));

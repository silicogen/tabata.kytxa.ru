import { Instance, types } from "mobx-state-tree";

export const Wrksnp = types
    .model("Wrksnp", {
        id: types.identifierNumber,
        title: types.string,
    })
    .actions(self => ({
        setTitle(title: string) {
            self.title = title;
        }
    }));

export const Wrksnps = types
    .model("Wrksnps", {
        items: types.array(Wrksnp),
        selected: types.safeReference(Wrksnp),
    })
    .actions(self => ({
        setItems(arr: any[]) {
            self.items.replace(arr);
        },
        toggleSelect(item: Instance<typeof Wrksnp>) {
            self.selected = self.selected === item ? undefined : item;
        }
    }))
    .views(self => ({
        isSelected(item: Instance<typeof Wrksnp>) {
            return self.selected === item;
        },
    }));


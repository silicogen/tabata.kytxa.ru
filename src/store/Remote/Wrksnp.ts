import { Instance, types } from "mobx-state-tree";

export const Wrksnp = types
    .model("Wrksnp", {
        id: types.identifierNumber,
        title: "",
        content: ""
    })
    .actions(self => ({
        setAll({ id, title, content }: { id: string, title: string, content: string }) {
            Object.assign(self, { id, title, content })
        },
        setID(id: number) {
            self.id = id;
        },
        setTitle(title: string) {
            self.title = title;
        },
        setContent(content: string) {
            self.content = content;
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


import axios from "axios";
import API_ROUTE from "forum/apiRoute";
import { Instance, SnapshotOrInstance, SnapshotIn, types } from "mobx-state-tree";
import Root from "store/Root";

export const Wrksnp = types
    .model("Wrksnp", {
        id: types.identifierNumber,
        title: types.string,
        updated_at: types.string,
        username: types.string,
        created_at: types.string,
    })
    .actions(self => ({
        setTitle(title: string) {
            self.title = title;
        },
        setUpdated_at(time: string) {
            self.updated_at = time;
        },
    }))
    .views(self => ({
        async load() {
            const res = await axios.get(`${API_ROUTE}/posts/${self.id}`);
            const content = res.data.response.content;
            const json: SnapshotIn<typeof Root> = JSON.parse(content);
            return json;
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
        rmItem(item: Instance<typeof Wrksnp>) {
            self.items.remove(item);
        },
        addItem(item: SnapshotOrInstance<typeof Wrksnp>) {
            self.items.splice(0, 0, item);
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


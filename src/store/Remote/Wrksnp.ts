import axios from "axios";
import API_ROUTE from "forum/apiRoute";
import { getParentOfType, Instance, SnapshotOrInstance, types } from "mobx-state-tree";
import { Remote } from ".";

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
        async saveName(title: string) {
            let message: string;
            try {
                const j =0;
                const res = await axios.put(`${API_ROUTE}/posts/${self!.id}`, {
                    title
                });

                if (res.status >= 200 && res.status < 300) {
                    const resp = await axios.get(`${API_ROUTE}/posts/${self!.id}`);
                    const response = resp.data.response;
                    this?.setUpdated_at(response.updated_at)
                    this?.setTitle(title);
                    message = `Состоянию присвоено имя ${title}.`;
                } else {
                    message = `Что-то пошло не так ${title}.`;
                }
                message = `${message}
                status: ${res.status}, statusText: ${res.statusText}`;
            } catch (ex) {
                const exeption = ex;
                message = `Не удалось переименовать состояние на сервере.
                ${exeption}`;
            }
            window.alert(message);
        },
        async saveTo(snapStr: string, title: string) {
            let message: string;
            const j =0;
            try {
                const res = await axios.put(`${API_ROUTE}/posts/${self!.id}`, {
                    content: snapStr,
                    title
                });

                if (res.status >= 200 && res.status < 300) {
                    const i =0;
                    const resp = await axios.get(`${API_ROUTE}/posts/${self!.id}`);
                    const response = resp.data.response;
                    this?.setUpdated_at(response.updated_at)
                    this?.setTitle(title);
                    message = `Текущая состояние успешно сохранено с именем ${title}.`;
                } else {
                    message = `Что-то пошло не так ${title}.`;
                }
                message = `${message}
                status: ${res.status}, statusText: ${res.statusText}`;

            } catch (ex) {
                message = `Не удалось сохранить текущее состояние на сервере.
                ${ex}`;
            }
            window.alert(message);
        }
    }))
    .views(self => ({
        async load() {
            const res = await axios.get(`${API_ROUTE}/posts/${self.id}`);
            const content = res.data.response.content;
            return content;
        }
    }));

export const Wrksnps = types
    .model("Wrksnps", {
        items: types.array(Wrksnp),
        selected: types.safeReference(Wrksnp),
    })
    .actions(self => ({
        fetch() {
            const remote = getParentOfType(self, Remote);
            axios.get(`${API_ROUTE}/user_posts/${remote.inOut.currentUser?.id}`)
                // axios.get(`${API_ROUTE}/posts`)
                .then(resp => {
                    const response = resp.data.response;
                    response.forEach((w: any) => w.username = w.author.username)
                    this.setItems(response)
                });
        },
        setItems(arr: any[]) {
            self.items.replace(arr);
        },
        rmItem(item: Instance<typeof Wrksnp>) {
            self.items.remove(item);
        },
        addItem(item: SnapshotOrInstance<typeof Wrksnp>) {
            self.items.splice(0, 0, item);
        },
        async saveNew(snapStr: string) {
            const title = `Новое хранилище ${new Date().toLocaleString()}`;
            let res;
            try {
                res = await axios.post(`${API_ROUTE}/posts`, {
                    content: snapStr,
                    title
                });
                let message: string;
                if (res.status >= 200 && res.status < 300) {
                    res.data.response.username = res.data.response.author.username;
                    this.addItem(res.data.response);
                    message = `Текущая работа успешно сохранена с именем ${title}.`
                } else {
                    message = `Что-то пошло не так ${title}.`;
                }
                window.alert(`${message}
             status: ${res.status}, statusText: ${res.statusText}`);
            } catch (ex) {
                window.alert(
                    `Не удалось сохранить работу на сервере.
              ${ex}`)
            }
        },
        async delete() {
            const title = self.selected?.title;
            try {
                const res = await axios.delete(`${API_ROUTE}/posts/${self.selected!.id}`);
                let message: string;
                if (res.status >= 200 && res.status < 300) {
                    this.rmItem(self.selected!);
                    message = `Хранилище ${title} успешно удалено.`
                } else {
                    message = `Что-то пошло не так ${title}.`;
                }
                window.alert(`${message}
                status: ${res.status}, statusText: ${res.statusText}`);
            } catch (ex) {
                window.alert(
                    `Не удалось удалить хранилище ${title} на сервере.
                    ${ex}`)
            }
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


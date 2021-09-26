import { types, IAnyModelType, Instance } from "mobx-state-tree";

export const RefToSelectedBoxFactory = <T extends IAnyModelType>(Model: T) => types
    .model(`RefToSelectedBoxFactory(${Model.name})`, {
        ref: types.safeReference(Model),
    }).actions(self => ({
        toggle(item: Instance<typeof Model>) {
            self.ref = self.ref === item ? undefined : item;
        }
    })).views(self => ({
        isSelected(item: Instance<typeof Model>) {
            return self.ref === item;
        },
    }));
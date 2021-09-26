
import { types, IAnyModelType, Instance, getParent } from "mobx-state-tree";
import { ItemsBoxFactory } from ".";

export const RefBoxFactory = <T extends IAnyModelType>(Model: T) => types
    .model(`RefBoxFactory(${Model.name})`, {
        ref: types.maybe(types.reference(Model, {
            onInvalidated(e) {
                let items: Instance<ReturnType<typeof ItemsBoxFactory>>;
                try { items = getParent(e.parent, 2) } catch { };
                // @ts-ignore
                if (items?.remove && items.items?.remove)
                    items.remove(e.parent);
                else
                    e.removeRef();
            }
        }))
    });
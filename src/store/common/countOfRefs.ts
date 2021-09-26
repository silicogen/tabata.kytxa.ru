import { Instance, IMSTArray, IAnyModelType } from "mobx-state-tree";
import { RefBoxFactory } from "../items";

export function countOfRefs<TParent extends IAnyModelType>(
    searcheItem: Instance<IAnyModelType>,
    searcheRoots: IMSTArray<Instance<TParent>>,
    getRefItems: (w: Instance<TParent>) => IMSTArray<ReturnType<typeof RefBoxFactory>>
): number | undefined {
    const count = searcheRoots.reduce((a, p) =>
        a + getRefItems(p).filter(ri => ri.ref === searcheItem).length, 0);
    return count === 0 ? undefined : count;
};
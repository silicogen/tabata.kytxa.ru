import { Instance, IMSTArray, IAnyModelType } from "mobx-state-tree";
import { RefBoxFactory } from "../items";

export function countOfRefsBySelected(
    searcheItem: Instance<IAnyModelType>,
    refItems?: IMSTArray<ReturnType<typeof RefBoxFactory>>
): number | undefined {
    const count = refItems?.filter(ri => ri.ref === searcheItem).length;
    return count === 0 ? undefined : count;
}
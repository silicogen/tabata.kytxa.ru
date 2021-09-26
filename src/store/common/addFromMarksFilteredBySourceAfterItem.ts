import { IMSTArray, Instance } from "mobx-state-tree";
import { IDsMarker } from ".";
import { IDBox, IDItems } from "../items"

export function addFromMarksFilteredBySourceAfterItem(
    marks: Instance<typeof IDsMarker>,
    sourceItemsBoxItems: IMSTArray<typeof IDBox>,
    targetItemsBox?: Instance<IDItems>,
    afterItem?: Instance<typeof IDBox>
) {
    const idsToAdd = marks.getIDs(sourceItemsBoxItems);
    targetItemsBox?.addArr(idsToAdd.map(id => ({ ref: id })), afterItem);
}

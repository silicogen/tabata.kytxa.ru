import React from "react";
import { useRoot } from "store/Root";
import { ItemsButtonsFactory } from "views/Controls/Buttons";
import { Phaze } from "store/Phaze";

const CommonButtons = ItemsButtonsFactory(Phaze);

export const Buttons: React.FC = () => {
    const root = useRoot();
    return <CommonButtons
        itemsBox={root.phazes}
        refToSelectedBox={root.selected.phaze} />
}

export default Buttons;
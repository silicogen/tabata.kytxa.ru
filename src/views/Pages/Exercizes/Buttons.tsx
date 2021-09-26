import React from "react";
import { useRoot } from "store/Root";
import { ItemsButtonsFactory } from "views/Controls/Buttons";
import { Exercize } from "store/Exercize";

const CommonButtons = ItemsButtonsFactory(Exercize); 

export const Buttons: React.FC = () => {
    const root = useRoot();
    return <CommonButtons
        itemsBox={root.exercizes}
        refToSelectedBox={root.selected.exercize} />
}

export default Buttons;
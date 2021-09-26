import React from "react";
import { useRoot } from "store/Root";
import { ItemsButtonsFactory } from "views/Controls/Buttons";
import { Workout } from "store/Workout";

const CommonButtons = ItemsButtonsFactory(Workout);

export const Buttons: React.FC = () => {
    const root = useRoot();
    return <CommonButtons
        itemsBox={root.workouts}
        refToSelectedBox={root.selected.workout} />
}

export default Buttons;
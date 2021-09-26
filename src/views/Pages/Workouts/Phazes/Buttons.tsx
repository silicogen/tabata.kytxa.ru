import React from "react";
import { useRoot } from "store/Root";
import { RefItemsButtonsFactory } from "views/Controls/Buttons";
import { WorkoutPhaze } from "store/WorkoutPhaze";

const CommonButtons = RefItemsButtonsFactory(WorkoutPhaze, "/phazes/?forWorkout");

export const Buttons: React.FC = () => {
    const root = useRoot();
    return <CommonButtons
        itemsBox={root.selected.workout.ref!.workoutPhazes}
        refToSelectedBox={root.selected.workoutPhaze} />
}

export default Buttons;
import React from "react";
import { useRoot } from "store/Root";
import { RefItemsButtonsFactory } from "views/Controls/Buttons";
import { WorkoutExercize } from "store/WorkoutExercize";

const CommonButtons = RefItemsButtonsFactory(WorkoutExercize, "/exercizes/?forWorkout");

export const Buttons: React.FC = () => {
    const root = useRoot();
    return <CommonButtons
        itemsBox={root.selected.workout.ref!.workoutExesrcizes}
        refToSelectedBox={root.selected.workoutExercize} />
}

export default Buttons;
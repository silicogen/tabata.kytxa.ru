import { types } from "mobx-state-tree";
import { RefToSelectedBoxFactory } from "./common";
import { Exercize } from "./Exercize";
import { Phaze } from "./Phaze";
import { Workout } from "./Workout";
import { WorkoutExercize } from "./WorkoutExercize";
import { WorkoutPhaze } from "./WorkoutPhaze";

export const Selecteds = types.model("Selecteds", {
    workout: types.optional(RefToSelectedBoxFactory(Workout), {}),
    exercize: types.optional(RefToSelectedBoxFactory(Exercize), {}),
    phaze: types.optional(RefToSelectedBoxFactory(Phaze), {}),
    workoutExercize: types.optional(RefToSelectedBoxFactory(WorkoutExercize), {}),
    workoutPhaze: types.optional(RefToSelectedBoxFactory(WorkoutPhaze), {}),
});


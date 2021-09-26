import { types } from "mobx-state-tree";
import { Exercize } from "./Exercize";
import { IDBox, ItemsBoxFactory, RefBoxFactory } from "./items";

export const WorkoutExercize = types
    .compose(IDBox, RefBoxFactory(Exercize))
    .named("WorkoutExercize");

export const WorkoutExercizes = ItemsBoxFactory(WorkoutExercize)
    .named("WorkoutExercizes");
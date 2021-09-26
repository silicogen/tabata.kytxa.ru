import { types } from "mobx-state-tree";
import { Phaze } from "./Phaze";
import { IDBox, ItemsBoxFactory, RefBoxFactory } from "./items";

export const WorkoutPhaze = types
    .compose(IDBox, RefBoxFactory(Phaze))
    .named("WorkoutPhaze");

export const WorkoutPhazes = ItemsBoxFactory(WorkoutPhaze)
    .named("WorkoutPhazes");
import { types, Instance } from "mobx-state-tree";
import { WorkoutPhazes } from "./WorkoutPhaze";
import { WorkoutExercizes } from "./WorkoutExercize";
import { IDBox, NameBox, ItemsBoxFactory } from "./items";


const Workout0 = types.model("Workout", {
    workoutExesrcizes: types.optional(WorkoutExercizes, {}),
    workoutPhazes: types.optional(WorkoutPhazes, {})
});

export const Workout = types
    .compose(IDBox, NameBox, Workout0)
    .named("Workout");

export const Workouts = ItemsBoxFactory(Workout)
    .actions(self => {
        const add = self.add;
        return {
            addDefault(afterItem?: Instance<typeof Workout>) {
                return add({ name: `тренировка${self.items.length + 1}` }, afterItem);
            }
        }
    });
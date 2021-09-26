
import { types } from "mobx-state-tree";


export const UI = types.model("UI", {
    navMenuIsCollapsed: true,
    workoutExercizesOpen: true,
    workoutPhazesOpen: true,
    workoutDetailsHightIsFixed: false,
    workoutDetailsHight: "unset",
})
    .volatile(self => ({
        file: null as File | null,
    }))
    .actions(self => ({
        toggleNavMenuIsCollapsed() {
            self.navMenuIsCollapsed = !self.navMenuIsCollapsed;
        },
        collapseNavMenu() {
            self.navMenuIsCollapsed = true;
        },
        toggleWorkoutExercizesOpen() {
            self.workoutExercizesOpen = !self.workoutExercizesOpen;
        },
        toggleWorkoutPhazesOpen() {
            self.workoutPhazesOpen = !self.workoutPhazesOpen;
        },
        toggleWorkoutDetailsHightIsFixed() {
            self.workoutDetailsHightIsFixed = !self.workoutDetailsHightIsFixed;
        },
        setWorkoutDetailsHight(hight: string) {
            self.workoutDetailsHight = hight;
        },
        setFile(file: File) {
            self.file = file;
        },
        removeFile() {
            self.file = null
        },
    }));

import { types } from "mobx-state-tree";
import { IDsMarker } from "./common";

export const TMP = types.model("TMP", {
    workoutExercizesIDsMarker: types.optional(IDsMarker, {}),
    workoutPhazesIDsMarker: types.optional(IDsMarker, {}),
});


import React from "react";
import { types, Instance } from "mobx-state-tree";
import { MobXProviderContext } from "mobx-react";
import { Workouts } from "./Workout";
import { Phazes } from "./Phaze";
import { Exercizes } from "./Exercize"
import { UI } from "./UI";
import { TMP } from "./TMP";
import { Selecteds } from "./Selecteds";

export const Root = types
    .model("Root", {
        workouts: types.optional(Workouts, {}),
        phazes: types.optional(Phazes, {}),
        exercizes: types.optional(Exercizes, {}),
        ui: types.optional(UI, {}),
        tmp: types.optional(TMP, {}),
        selected: types.optional(Selecteds, {}),
    });

export const useRoot = () => React
    .useContext(MobXProviderContext)
    .root as Instance<typeof Root>;

export default Root;

import { types } from "mobx-state-tree";

export const DurationBox = types
    .model("DurationBox", {
        duration: types.maybe(types.number)
    })
    .actions(self => ({
        setDuration(duration?: number) {
            self.duration = duration;
        }
    }));
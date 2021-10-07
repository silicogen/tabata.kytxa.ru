import React from "react";
import { types, Instance } from "mobx-state-tree";
import { MobXProviderContext } from "mobx-react";
import { Wrksnps } from "./Wrksnp";
import { InOut } from "./InOut";

export const Remote = types
    .model("Remote", {
        wrksnps: types.optional(Wrksnps, {}),
        inOut: types.optional(InOut, {}),
    });

export const useRemote = () => React
    .useContext(MobXProviderContext)
    .remote as Instance<typeof Remote>;

export default Remote;

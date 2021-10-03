import React from "react";
import { css } from "@styled-system/css";

import { observer } from "mobx-react";
import { useTheme } from "css/theme";
import { useRoot } from "store/Root";
import Buttons from "./Buttons";
import Table from "./Table";

const Page: React.FC = () => {
    const theme = useTheme();
    const root = useRoot()
    const selectedWorkoutPhazesLength =
        root.selected.workout.ref!.workoutPhazes.items.length;
    return <div css={css(theme.divs.subPage)}>
        <Buttons />
        {selectedWorkoutPhazesLength > 0 && <Table />}
    </div>
}
export default observer(Page);
import React from "react";
import { css } from "@styled-system/css";

import { Instance } from "mobx-state-tree";
import { observer } from "mobx-react";
import { Workout } from "store/Workout";
import { useRoot } from "store/Root";
import { useTheme } from "css/theme";

interface Props {
    workout: Instance<typeof Workout>;
};

const Row: React.FC<Props> = ({ workout }) => {
    const theme = useTheme();
    const root = useRoot();
    const selectedCSS = theme.tableRows.selected(() => root.selected.workout.isSelected(workout));
    return <tr
        css={css({ ...theme.tableRows.common, ...selectedCSS })}
        onClick={() => root.selected.workout.toggle(workout)}
    >
        <td>{workout.name}</td>
        <td css={css({ textAlign: "center" })}>{workout.workoutExesrcizes.items.length}</td>
    </tr>;
};

export default observer(Row);
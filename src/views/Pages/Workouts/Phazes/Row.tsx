import React from "react";
import { css } from "@styled-system/css";

import { Instance } from "mobx-state-tree";
import { observer } from "mobx-react";
import { useRoot } from "store/Root";
import { useTheme } from "css/theme";
import { WorkoutPhaze } from "store/WorkoutPhaze";

interface Props {
    workoutPhaze: Instance<typeof WorkoutPhaze>;
};

const Row: React.FC<Props> = ({ workoutPhaze }) => {
    const theme = useTheme();
    const root = useRoot();
    const selected = root.selected.workoutPhaze;
    const selectedCSS = theme.tableRows.selected(() => selected.isSelected(workoutPhaze));
    return <>
        <tr
            css={css({ ...theme.tableRows.common, ...selectedCSS })}
            onClick={() => selected.toggle(workoutPhaze)}>
            <td>{workoutPhaze.ref?.name}</td>
        </tr>
    </>
}
export default observer(Row);
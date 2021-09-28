import React from "react";
import { css } from "utils";
// import 'styled-components/macro';
import { Instance } from "mobx-state-tree";
import { observer } from "mobx-react";
import { useRoot } from "store/Root";
import { useTheme } from "css/theme";
import { WorkoutExercize } from "store/WorkoutExercize";

interface Props {
    workoutExercize: Instance<typeof WorkoutExercize>;
};

const Row: React.FC<Props> = ({ workoutExercize }) => {
    const theme = useTheme();
    const root = useRoot();
    const selectedworkoutExercize = root.selected.workoutExercize;
    const selectedCSS = theme.tableRows.selected(() => selectedworkoutExercize.isSelected(workoutExercize));
    return <>
        <tr
            css={css({ ...theme.tableRows.common, ...selectedCSS })}
            onClick={() => selectedworkoutExercize.toggle(workoutExercize)}>
            <td>{workoutExercize.ref?.name}</td>
        </tr>
    </>
}
export default observer(Row);
import React from "react";
import { Instance } from "mobx-state-tree";
import { observer } from "mobx-react";
import { css } from "@styled-system/css";

import { useRoot } from "store/Root";
import { useTheme } from "css/theme";
import { Exercize } from "store/Exercize";
import { countOfRefs, countOfRefsBySelected } from "store/common"

interface Props {
    exercize: Instance<typeof Exercize>
};

export const TdMain: React.FC<Props> = observer(({ exercize }) => {
    const theme = useTheme();
    const root = useRoot();
    const selectedCSS = theme.tableRows.selected(() => root.selected.exercize.isSelected(exercize));
    return <>
        <td css={css(selectedCSS)}>{exercize.name}</td>
        <td css={css({ ...selectedCSS, textAlign: "center" })}>
            {countOfRefs(exercize, root.workouts.items, w => w.workoutExesrcizes.items)}
        </td>
    </>
})

export const TdForWorkout = observer(({ exercize }: Props) => {
    const root = useRoot();
    const checked = root.tmp.workoutExercizesIDsMarker.isChecked(exercize.id);
    return <>
        <td css={css({ textAlign: "center" })}>
            {countOfRefsBySelected(exercize, root.selected.workout.ref?.workoutExesrcizes.items)}
        </td>
        <td
            css={css({ textAlign: "center" })}>
            <input
                type="checkbox"
                checked={checked}
                onChange={e => root.tmp.workoutExercizesIDsMarker.set(exercize.id, e.currentTarget.checked)}
                onClick={e => e.stopPropagation()}
                css={css({ width: "100%" })}
            />
        </td>
    </>
});

export const Tr: React.FC<Props & { children: React.ReactNode }> = observer(({ exercize, children }) => {
    const theme = useTheme();
    const root = useRoot();
    return <tr
        css={css(theme.tableRows.common)}
        onClick={() => root.selected.exercize.toggle(exercize)}
    >
        {children}
    </tr>
})
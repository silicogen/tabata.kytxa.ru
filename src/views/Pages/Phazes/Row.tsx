import React from "react";
import { Instance } from "mobx-state-tree";
import { observer } from "mobx-react";
import { css } from "utils";
// import 'styled-components/macro';
import { useRoot } from "store/Root";
import { useTheme } from "css/theme";
import { Phaze } from "store/Phaze";
import { countOfRefs, countOfRefsBySelected } from "store/common"

interface Props {
    phaze: Instance<typeof Phaze>
};

export const TdMain: React.FC<Props> = observer(({ phaze }) => {
    const theme = useTheme();
    const root = useRoot();
    const selectedCSS = theme.tableRows.selected(() => root.selected.phaze.isSelected(phaze));
    return <>
        <td css={css(selectedCSS)}>{phaze.name}</td>
        <td css={css({ ...selectedCSS, textAlign: "center" })}>
            {countOfRefs(phaze, root.workouts.items, w => w.workoutPhazes.items)}
        </td>
    </>
})

export const TdForWorkout = observer(({ phaze }: Props) => {
    const root = useRoot();
    const checked = root.tmp.workoutPhazesIDsMarker.isChecked(phaze.id);
    return <>
        <td css={css({ textAlign: "center" })}>
            {countOfRefsBySelected(phaze, root.selected.workout.ref?.workoutPhazes.items)}
        </td>
        <td
            css={css({ textAlign: "center" })}>
            <input
                type="checkbox"
                checked={checked}
                onChange={e => root.tmp.workoutPhazesIDsMarker.set(phaze.id, e.currentTarget.checked)}
                onClick={e => e.stopPropagation()}
                css={css({ width: "100%" })}
            />
        </td>
    </>
}
);

export const Tr: React.FC<Props & { children: React.ReactNode }> = observer(({ phaze, children }) => {
    const theme = useTheme();
    const root = useRoot();
    return <tr
        css={css(theme.tableRows.common)}
        onClick={() => root.selected.phaze.toggle(phaze)}
    >
        {children}
    </tr>
})
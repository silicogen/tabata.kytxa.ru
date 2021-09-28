import React from "react";
import { NavLink } from "react-router-dom";
import { observer } from "mobx-react";
import { css } from "utils";
// import 'styled-components/macro';
import { useTheme } from "css/theme";
import { useRoot } from "store/Root";
import { CancelButton, ReturnOkButton, LeftButton, OkButton } from "views/Controls/Buttons";
import { addFromMarksFilteredBySourceAfterItem } from "store/common";

export const ForWorkout: React.FC = () => {
    const theme = useTheme();
    const root = useRoot();
    const add = () => addFromMarksFilteredBySourceAfterItem(
        root.tmp.workoutExercizesIDsMarker,
        root.exercizes.items,
        root.selected.workout.ref?.workoutExesrcizes,
        root.selected.workoutExercize.ref);
    return <div css={css({ ...theme.divs.buttonsPanel, bg: theme.colors.forWorkout })}>
        <NavLink to={`/workouts`}>
            <ReturnOkButton onClick={add} />
        </NavLink>

        <NavLink to={`/workouts`}>
            <LeftButton />
        </NavLink>

        <OkButton
            disabled={false}
            onClick={() => {
                add();
                root.tmp.workoutExercizesIDsMarker.clear();
            }} />

        <CancelButton
            disabled={false}
            onClick={() => {
                root.tmp.workoutExercizesIDsMarker.clear();
            }} />
    </div>
}
export default observer(ForWorkout);
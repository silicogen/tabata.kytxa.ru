import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { observer } from "mobx-react";
import { css } from "utils";
// import 'styled-components/macro';
import { useTheme } from "css/theme";
import { useRoot } from "store/Root";

const DisplayPath: React.FC<RouteComponentProps> = props => {
    const theme = useTheme();
    const root = useRoot();
    const forWorkout = new URLSearchParams(props.location.search).get("forWorkout") !== null;
    const workoutName = root.selected.workout.ref?.name;
    return <>
        <span >Фазы</span>
        {forWorkout && <span css={css({ ml: "1", bg: theme.colors.forWorkout })}>{` + Добавить в ${workoutName}`}</span>}
    </>;
}

export default observer(DisplayPath);
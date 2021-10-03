import React from "react";
import { css } from "@styled-system/css";

import { observer } from "mobx-react";
import { useRoot } from "store/Root";
import Row from "./Row";

const Table: React.FC = () => {
    const root = useRoot();
    const workoutExesrcizes = root.selected.workout.ref?.workoutExesrcizes;
    return <table>
        <thead>
            <tr>
                <th css={css({ textAlign: "start" })}>Наименование упражнения тренировки</th>
            </tr>
        </thead>
        <tbody>
            {workoutExesrcizes?.items.map(ex => <Row workoutExercize={ex} key={ex.id} />)}
        </tbody>
    </table>
}
export default observer(Table);
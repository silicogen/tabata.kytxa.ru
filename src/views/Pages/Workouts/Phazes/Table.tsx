import React from "react";
import { css } from "@styled-system/css";

import { observer } from "mobx-react";
import { useRoot } from "store/Root";
import Row from "./Row";

const Table: React.FC = () => {
    const root = useRoot();
    const workoutPhazes = root.selected.workout.ref?.workoutPhazes;
    return <table>
        <thead>
            <tr>
                <th css={css({ textAlign: "start" })}>Наименование фазы тренировки</th>
            </tr>
        </thead>
        <tbody>
            {workoutPhazes?.items.map(ex => <Row workoutPhaze={ex} key={ex.id} />)}
        </tbody>
    </table>
}
export default observer(Table);
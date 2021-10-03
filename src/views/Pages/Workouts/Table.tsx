import React from "react";
import { observer } from "mobx-react";
import { css } from "@styled-system/css";

import { useTheme } from "css/theme";
import { useRoot } from "store/Root";
import Row from "./Row";

const Table: React.FC = () => {
    const theme = useTheme();
    const root = useRoot();
    const workouts = root.workouts;
    return <table>
        <colgroup>
            <col css={css({ width: "100%" })} />
            <col css={css({ width: "1%" })} />
        </colgroup>
        <thead>
            <tr>
                <th css={css({ textAlign: "start" })}>Наименование тренировки</th>
                <th>Количество упражнений</th>
            </tr>
        </thead>
        <tbody>
            {workouts.items.map(workout => <Row workout={workout} key={workout.id} />)}
        </tbody>
    </table>;
};

export default observer(Table);





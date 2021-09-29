import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { css } from "utils";
// import 'styled-components/macro';
import { useTheme } from "css/theme";
import { useRoot } from "store/Root";
import { TdMain, TdForWorkout, Tr } from "./Row";
import LinkIntactSVG  from "icons/oi/link-intact.svg";
import { runBeforeFC } from "utils";

interface Props {
    forWorkout: boolean;
}

const Table: React.FC<Props> = ({ forWorkout }) => {
    const theme = useTheme();
    const root = useRoot();
    return <table >
        <colgroup>
            <col />
            <col css={css({ width: "1%" })} />
            <col css={css({ bg: theme.colors.forWorkout, width: "1%" })} />
            <col css={css({ bg: theme.colors.forWorkout, width: "1%" })} />
        </colgroup>
        <thead>
            <tr>
                <th css={css({ textAlign: "start" })}>Наименование упражнения</th>
                <th ><LinkIntactSVG css={css(theme.svgs.tableHeader)} /></th>
                {forWorkout && <>
                    <th css={css({})}>
                        Есть
                    </th>
                    <th css={css({})}>
                        Добавить
                    </th>
                </>}
            </tr>
        </thead>
        <tbody>
            {root.exercizes.items.map(ex => <Tr
                exercize={ex}
                key={ex.id}
            >
                <TdMain exercize={ex} />
                {forWorkout && <TdForWorkout exercize={ex} />}
            </Tr>)}
        </tbody>
    </table>
}

const useClearExercizesToWorkout = () => {
    const root = useRoot();
    useEffect(() => root.tmp.workoutExercizesIDsMarker.clear());
}

export default observer(runBeforeFC(observer(Table), useClearExercizesToWorkout));
import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { css, runBeforeFC } from "utils";
// import 'styled-components/macro';
import { useTheme } from "css/theme";
import { useRoot } from "store/Root";
import { TdMain, TdForWorkout, Tr } from "./Row";
import { ReactComponent as LinkIntactSVG } from "icons/oi/link-intact.svg";

interface Props {
    forWorkout: boolean;
}

const Table: React.FC<Props> = ({ forWorkout }) => {
    const theme = useTheme();
    const root = useRoot();
    const exs = root.phazes.items;
    return <table >
        <colgroup>
            <col />
            <col css={css({ width: "1%" })} />
            <col css={css({ bg: theme.colors.forWorkout, width: "1%" })} />
            <col css={css({ bg: theme.colors.forWorkout, width: "1%" })} />
        </colgroup>
        <thead>
            <tr>
                <th css={css({ textAlign: "start" })}>Наименование фазы</th>
                <th ><LinkIntactSVG css={css(theme.svgs.tableHeader)} /></th>
                {forWorkout && <>
                    <th css={css({ })}>
                        Есть
                    </th>
                    <th css={css({})}>
                        Добавить
                    </th>
                </>}
            </tr>
        </thead>
        <tbody>
            {exs.map(ph => <Tr
                phaze={ph}
                key={ph.id}
            >
                <TdMain phaze={ph} />
                {forWorkout && <TdForWorkout phaze={ph} />}
            </Tr>)}
        </tbody>
    </table>
}

const useClearPhazesToWorkout = () => {
    const root = useRoot();
    useEffect(() => root.tmp.workoutPhazesIDsMarker.clear());
}

export default observer(runBeforeFC(observer(Table), useClearPhazesToWorkout));



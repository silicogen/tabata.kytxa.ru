import React from "react";
import { PlayButton, PauseButton, StopButton } from "../Controls/Buttons";
import { css } from "@styled-system/css";
import { observer } from "mobx-react";
import { useRoot } from "store/Root";
import { getEnv } from "mobx-state-tree";
import GoerStore from "store/Goer";
import { SystemStyleObject } from "@styled-system/css";

const numSSO: SystemStyleObject = { fontSize: "40px", flex: "1 0", whiteSpace: "nowrap" };
const nameSSO: SystemStyleObject = { fontSize: "20px", flex: "5 0" };

const Goer: React.FC = () => {
    const root = useRoot();
    const workout = root.selected.workout.ref;
    const exercizes = workout?.workoutExesrcizes.items.map(we => we.ref) ?? [];
    const phazes = workout?.workoutPhazes.items.map(we => we.ref) ?? [];
    const goer = getEnv(root).goer as GoerStore;
    const w = goer.exercizeNumber > 0;
    const [stoped, paused] = [goer.stoped, goer.paused];
    const rowSSO: SystemStyleObject = { display: "flex", alignItems: "center", gap: "10px", color: w ? "initial" : "grey" };
    const playIsImposible = workout === undefined
        || exercizes.length === 0
        || phazes.length === 0
        || phazes.some(ph => ph?.duration === undefined)
    //justifyContent:"space-around"
    return <div>
        {/* {goer.exercizeNumber} */}
        <div css={css({ display: "flex", m: "0.4rem 1rem", })}>
            {stoped &&
                <PlayButton
                    onClick={() => goer.start(workout!)}
                    disabled={playIsImposible} />}
            {!stoped && !paused &&
                <PauseButton
                    onClick={goer.pause} />}
            {!stoped && paused &&
                <PlayButton
                    onClick={goer.resume} />}
            {!stoped &&
                <StopButton
                    onClick={goer.stop}
                    css={css({ marginLeft: "auto" })} />}
        </div>
        <div css={css(rowSSO)}>
            <div css={css(numSSO)}>
                {`{${w ? exercizes.length - goer.exercizeNumber + 1 : "о"}
                /${exercizes.length}}`}
            </div>
            <div css={css(nameSSO)}>
                {`${w ? goer.currentExercize?.name : "Наименование упражнения"}`}
            </div >
        </div>
        <div css={css(rowSSO)}>
            <div css={css(numSSO)}>
                {`{${w ? goer.secondsRemains : "о"}/${w ? goer.phazeDuration : "п"}}`}
            </div>
            <div css={css(nameSSO)}>
                {`${w ? goer.phazeName : "Наименование фазы"}`}
            </div>
        </div>

        <div css={css({ m: "1rem " })}>
            Фазы
            <ul>
                {phazes.map(p =>
                    <li key={p?.id} css={css({ bg: p === goer.currentPhaze ? "lightblue" : "unset" })}>
                        {p?.name}
                    </li>)}
            </ul>
            Упражнения
            < ul >
                {exercizes.map(e =>
                    <li key={e?.id} css={css({ bg: e === goer.currentExercize ? "lightblue" : "unset" })}>
                        {e?.name}
                    </li>)}
            </ul >
        </div>
    </div >
}

export default observer(Goer);
import React from "react";
import { PlayButton, PauseButton, StopButton } from "../Controls/Buttons";
import { css } from "@styled-system/css";
import { observer } from "mobx-react";
import { useRoot } from "store/Root";
import { getEnv, applySnapshot } from "mobx-state-tree";
import GoerStore from "store/Goer";
import { SystemStyleObject } from "@styled-system/css";
import { useTheme } from "css/theme";
import { useRemote } from "store/Remote";

const numSSO: SystemStyleObject = { fontSize: "40px", flex: "1 0", whiteSpace: "nowrap" };
const nameSSO: SystemStyleObject = { fontSize: "20px", flex: "5 0" };

const Goer: React.FC = () => {
    const theme = useTheme();
    const wrksnps = useRemote().wrksnps;
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

    const loadExample = async () => {
        const content = await wrksnps.loadExample();
        const json = JSON.parse(content);
        applySnapshot(root, json);
    }

    return <div css={css(theme.divs.commonPage)}>
        <section css={css(theme.sections.common)}>
            <h2>Выполнение тренировки <i>{workout?.name}</i></h2>
            <div css={css({ display: "flex", flexFlow: "row wrap", gap: "1rem", m: "1rem 0" })}>
                <button
                    css={css(theme.buttons.primary)}
                    onClick={loadExample}
                >Загрузить хранилище с примерами тренировок</button>
            </div>
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
                <h3>{workout?.name}</h3>
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
        </section>
    </div >
}

export default observer(Goer);
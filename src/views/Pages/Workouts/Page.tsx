import React, { useRef, useEffect } from "react";
import { observer } from "mobx-react";
import { css } from "utils";
import 'styled-components/macro';
import { useRoot } from "store/Root";
import { useTheme } from "css/theme";
import { ChevronDetails } from "views/Controls/Buttons";
import Buttons from "./Buttons";
import Exercizes from "./Exercizes";
import Phazes from "./Phazes";
import Table from "./Table";
import { ReactComponent as PinSVG } from "icons/me/pin.svg";

const Page: React.FC = () => {
    const root = useRoot();
    const theme = useTheme();
    const listDetailsPageRef = useRef(null);
    const detailsRef = useRef(null);
    useEffect(() => {
        getComputedStyle(listDetailsPageRef.current!).gridTemplateAreas === '"list details"' ||
            root.ui.setWorkoutDetailsHight(getComputedStyle(detailsRef.current!).height ?? "");
    })
    const ui = root.ui;
    const workouts = root.workouts;
    const selected = root.selected.workout.ref;
    return <div ref={listDetailsPageRef} css={css(theme.divs.listDetailsPage)}>
        <section
            ref={detailsRef}
            css={css(theme.sections.details(
                root.ui.workoutDetailsHightIsFixed,
                root.ui.workoutDetailsHight))}>
            <h2>Параметры тренировки</h2>
            <div style={{ display: "flex", flexFlow: "column", gap: "1rem" }}>
                <div css={css(theme.divs.params)}>
                    <label
                        htmlFor="nameInput"
                        style={{ justifySelf: "end" }}>
                        Наименование:
                    </label>
                    <input
                        id="nameInput"
                        value={selected?.name ?? ""}
                        disabled={!selected}
                        placeholder="наименование тренировки"
                        onChange={e => selected?.setName(e.target.value)}
                        css={css(theme.inputs.name)} />
                </div>

                <div>
                    <ChevronDetails
                        onClick={ui.toggleWorkoutPhazesOpen}
                        isRotated={ui.workoutPhazesOpen}
                        disabled={!selected}
                        css={css({ fontSize: "1.3rem", display: "block" })}
                    >
                        Фазы тренировки
                    </ChevronDetails>
                    {ui.workoutPhazesOpen && selected && <Phazes />}
                </div>

                <div>
                    <ChevronDetails
                        onClick={ui.toggleWorkoutExercizesOpen}
                        isRotated={ui.workoutExercizesOpen}
                        disabled={!selected}
                        css={css({ fontSize: "1.3rem", display: "block" })}
                    >
                        Упражнения тренировки
                    </ChevronDetails>

                    {ui.workoutExercizesOpen && selected && <Exercizes />}
                </div>
            </div>

        </section>
        <section css={css(theme.sections.list)}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2>  Список тренировок</h2>
                <PinSVG
                    onClick={root.ui.toggleWorkoutDetailsHightIsFixed}
                    css={css(theme.svgs.pin(root.ui.workoutDetailsHightIsFixed))} />
            </div>
            <Buttons />
            {workouts.items.length > 0 && <Table />}
        </section>
    </div >
};

export default observer(Page);


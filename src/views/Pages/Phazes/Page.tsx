import React from "react";
import { css } from "utils";
import 'styled-components/macro';
import { RouteComponentProps } from "react-router-dom";
import { observer } from "mobx-react";
import { useRoot } from "store/Root";
import { useTheme } from "css/theme";
import Table from "./Table";
import Buttons from "./Buttons";
import ForWorkout from "./ForWorkout";
import { IntInput } from "views/Controls/Inputs";

const Page: React.FC<RouteComponentProps> = props => {
    const theme = useTheme();
    const root = useRoot();
    const phazes = root.phazes;
    const selected = root.selected.phaze.ref;
    const forWorkout = new URLSearchParams(props.location.search).get("forWorkout") !== null;

    return <div css={css(theme.divs.listDetailsPage)}>
        <section css={css(theme.sections.details(false))}>
            <h2>Параметры фазы</h2>
            <div css={css(theme.divs.params)}>
                <label
                    htmlFor="nameInput"
                    style={{ justifySelf: "end" }}>
                    Наименование:
                </label>
                <input
                    id="nameInput"
                    value={selected?.name ?? ""}
                    onChange={e => selected?.setName(e.target.value)}
                    css={css(theme.inputs.name)} />

                <label
                    htmlFor="durationInput"
                    style={{ justifySelf: "end" }} >
                    Продолжительность:
                </label>
                <IntInput
                    id="durationInput"
                    value={selected?.duration}
                    setValue={selected?.setDuration}
                />
            </div>
        </section>
        <section css={css(theme.sections.list)}>
            <h2>Список фаз</h2>
            <Buttons />
            {phazes.items.length > 0 && <Table forWorkout={forWorkout} />}
            {forWorkout && <ForWorkout />}
        </section>
    </div>
}

export default observer(Page);
import React from "react";
import { css } from "utils";
// import 'styled-components/macro';
import { RouteComponentProps } from "react-router-dom";
import { observer } from "mobx-react";
import { useRoot } from "store/Root";
import { useTheme } from "css/theme";
import Table from "./Table";
import Buttons from "./Buttons";
import ForWorkout from "./ForWorkout";
const Page: React.FC<RouteComponentProps> = props => {
    const theme = useTheme();
    const root = useRoot();
    const exercizes = root.exercizes;
    const selected = root.selected.exercize.ref;
    const forWorkout = new URLSearchParams(props.location.search).get("forWorkout") !== null;
    return <div css={css(theme.divs.listDetailsPage)}>
        <section css={css(theme.sections.details(false))}>
            <h2>Параметры упражнения</h2>
            <div css={css(theme.divs.params)} >
                <label
                    htmlFor="nameInput"
                    style={{ justifySelf: "end" }}>
                    Наименование:
                </label>
                <input
                    id="nameInput"
                    value={selected?.name ?? ""}
                    disabled={!selected}
                    placeholder="наименование упражнения"
                    onChange={e => selected?.setName(e.target.value)}
                    css={css(theme.inputs.name)} />
            </div>
        </section>
        <section css={css(theme.sections.list)}>
            <h2>Список упражнений</h2>
            <Buttons />
            {exercizes.items.length > 0 && <Table forWorkout={forWorkout} />}
            {forWorkout && <ForWorkout />}
        </section>
    </div >
}

export default observer(Page);
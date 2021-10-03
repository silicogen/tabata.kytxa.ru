import React from "react";
import { observer } from "mobx-react";
import { css } from "@styled-system/css";

import { useTheme } from "css/theme";
import { PlusButton, EditButton, UpButton, DownButton, DeleteButton } from ".";
import { ItemsBoxFactory } from "store/items";
import { IAnyModelType, Instance } from "mobx-state-tree";
import { RefToSelectedBoxFactory } from "store/common/RefToSelectedBoxFactory";
import { NavLink } from "react-router-dom";

function ButtonsFactory<T extends IAnyModelType>(Model: T) {
    const ItemsOfModelBoxFactory = () => ItemsBoxFactory(Model);
    const RefToSelectedOfModelBoxFactory = () => RefToSelectedBoxFactory(Model);
    interface Props {
        itemsBox: Instance<ReturnType<typeof ItemsOfModelBoxFactory>>;
        refToSelectedBox: Instance<ReturnType<typeof RefToSelectedOfModelBoxFactory>>;
    }
    const ItemsButtons: React.FC<Props> = ({ itemsBox: items, refToSelectedBox: selector }) => {
        return <>
            <UpButton
                disabled={items.shiftDownIsUnavalable(selector.ref)}
                onClick={() => items.shiftUp(selector.ref!)} />
            <DownButton
                disabled={items.shiftUpIsUnavalable(selector.ref)}
                onClick={() => items.shiftDown(selector.ref!)} />
            <DeleteButton
                disabled={items.removeIsUnavalable(selector.ref)}
                onClick={() => window.confirm("Удаляем?") && items.remove(selector.ref!)} />
        </>
    }
    return observer(ItemsButtons);
};

export function ItemsButtonsFactory<T extends IAnyModelType>(Model: T) {
    const ItemsOfModelBoxFactory = () => ItemsBoxFactory(Model);
    const RefToSelectedOfModelBoxFactory = () => RefToSelectedBoxFactory(Model);
    interface Props {
        itemsBox: Instance<ReturnType<typeof ItemsOfModelBoxFactory>>;
        refToSelectedBox: Instance<ReturnType<typeof RefToSelectedOfModelBoxFactory>>;
    }
    const ItemsButtons0 = ButtonsFactory(Model);
    const ItemsButtons: React.FC<Props> = ({ itemsBox: items, refToSelectedBox: selector }) => {
        const theme = useTheme();
        const add = () => selector.toggle(items.addDefault(selector.ref));
        return <div css={css(theme.divs.buttonsPanel)}>
            <PlusButton onClick={add} />
            <ItemsButtons0 itemsBox={items} refToSelectedBox={selector} />
        </div>
    }
    return observer(ItemsButtons);
};

export function RefItemsButtonsFactory<T extends IAnyModelType>(Model: T, toSourceLinkAddress: string) {
    const ItemsOfModelBoxFactory = () => ItemsBoxFactory(Model);
    const RefToSelectedOfModelBoxFactory = () => RefToSelectedBoxFactory(Model);
    interface Props {
        itemsBox: Instance<ReturnType<typeof ItemsOfModelBoxFactory>>;
        refToSelectedBox: Instance<ReturnType<typeof RefToSelectedOfModelBoxFactory>>;
    }
    const ItemsButtons0 = ButtonsFactory(Model);
    const ItemsButtons: React.FC<Props> = ({ itemsBox: items, refToSelectedBox: selector }) => {
        const theme = useTheme();
        return <div css={css(theme.divs.buttonsPanel)}>
            <NavLink to={toSourceLinkAddress}> <EditButton /></NavLink>
            <ItemsButtons0 itemsBox={items} refToSelectedBox={selector} />
        </div>
    }
    return observer(ItemsButtons);
};
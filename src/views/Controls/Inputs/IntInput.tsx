import React from "react";
import { css } from "utils";
import 'styled-components/macro';
import { observer } from "mobx-react";
import { useTheme } from "css/theme";
import { IncrementButton, DecrementButton } from "views/Controls/Buttons";

interface Props {
    value?: number;
    setValue?: (value?: number) => void;
    disabled?: boolean;
    placeholder?: string;
    id?: string;
}
const IntInput0: React.FC<Props> = ({ value, setValue, placeholder, disabled, id }) => {
    const theme = useTheme();
    const incr = (d: number) => {
        if (value === undefined) {
            setValue?.(d);
        } else {
            setValue?.(value + d);
        }
    };
    return <div style={{ display: 'inline-flex' }} >
        <DecrementButton onClick={() => incr(-1)} disabled={disabled} />
        <input
            id={id}
            inputMode="numeric"
            value={value === undefined ? "" : value}
            disabled={disabled}
            placeholder={placeholder}
            onChange={e => {
                if (e.target.value === "") {
                    setValue?.(undefined);
                    return;
                }
                const val = Number.parseInt(e.target.value);
                if (Number.isNaN(val)) return;
                setValue?.(val);
            }}
            css={css(theme?.inputs.int)}
        />
        <IncrementButton onClick={() => incr(1)} disabled={disabled} />
    </div >
};

export const IntInput = observer(IntInput0);
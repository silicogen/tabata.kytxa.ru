import { ThemeProvider } from 'styled-components';
import { SystemStyleObject } from "@styled-system/css";
import { types } from "mobx-state-tree";
import { render, screen } from '@testing-library/react';
import { IntInput } from '..';

const theme = {
    inputs: {
        duration: {
            // display: "none",
            border: "none",
            borderBottom: "1px solid",
            bg: "inherit",
            fontSize: "1.3rem",
        } as SystemStyleObject
    },
};

const GetElement = () =>
    <ThemeProvider theme={theme}>
        <IntInput
            disabled={false}
            value={model.value}
            setValue={model.setValue} />
    </ThemeProvider>;

const Model = types.model("Model", {
    value: types.maybe(types.number)
}).actions(self => ({
    setValue(val?: number) {
        self.value = val;
    }
}));

const model = Model.create({ value: 2 });

test('click rerender', () => {
    const { rerender } = render(<GetElement />);
    const input = screen.getByRole("textbox");
    const button = screen.getByText("-");

    expect(model.value).toBe(2);
    expect(input.attributes.getNamedItem("value")?.value).toBe("2");

    button.click();
    expect(model.value).toBe(1);
    rerender(<GetElement />);
    expect(input.attributes.getNamedItem("value")?.value).toBe("1");
});

// test('exists', () => {
//     render(
//         <ThemeProvider theme={theme}>
//             <IntInput value={11} placeholder="длительность" />
//         </ThemeProvider>
//     );
//     const input = screen.getByRole("textbox");
//     expect(input).toBeInTheDocument();
//     expect(input).toBeVisible();
//     expect(input.attributes.getNamedItem("value")?.value).toBe("11");
//     expect(input.attributes.getNamedItem("placeholder")?.value).toBe("длительность");
// });
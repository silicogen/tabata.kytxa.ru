import { ThemeProvider } from 'styled-components';
import { SystemStyleObject } from "@styled-system/css";
import { types } from "mobx-state-tree";
import TestRenderer from 'react-test-renderer';
import { IntInput } from '..';

const theme = {
    inputs: {
        duration: {
            border: "none",
            borderBottom: "1px solid",
            bg: "inherit",
            fontSize: "1.3rem",
        } as SystemStyleObject
    },
};

const Model = types.model("Model", {
    value: types.maybe(types.number)
}).actions(self => ({
    setValue(val?: number) {
        self.value = val;
    }
}));

const model = Model.create({ value: 2 });

const GetElement = () =>
    <ThemeProvider theme={theme}>
        <IntInput
            disabled={false}
            value={model.value}
            setValue={model.setValue} />
    </ThemeProvider>;

const testRenderer = TestRenderer.create(<GetElement />);
const testInstance = testRenderer.root;

test('click testRenderer', () => {
    const button = testInstance.findAllByType("button")[0];
    const input = testInstance.findByType("input");
    expect(input.props["value"]).toBe(2);

    button.props.onClick();
    testRenderer.update(<GetElement />);
    expect(input.props["value"]).toBe(1);
});
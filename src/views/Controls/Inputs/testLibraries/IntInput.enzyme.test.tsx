import { ThemeProvider } from 'styled-components';
import { SystemStyleObject } from "@styled-system/css";
import { types } from "mobx-state-tree";
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';
import { IntInput } from '..';

//@ts-ignore
Enzyme.configure({ adapter: new Adapter() });

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

const wrapper = Enzyme.mount(<GetElement />);
const button = wrapper.find("button").at(0);
test('click enzyme', () => {
    expect(wrapper.find("button").length).toBe(2);
    expect(wrapper.find("input").length).toBe(1);

    expect(model.value).toBe(2);
    expect(wrapper.find("input").at(0).props().value).toBe(2);

    button.simulate('click');
    wrapper.setProps({});
    expect(model.value).toBe(1);
    expect(wrapper.find("input").at(0).props().value).toBe(1);

    button.simulate('click');
    wrapper.setProps({});
    expect(model.value).toBe(0);
    expect(wrapper.find("input").at(0).props().value).toBe(0);

});
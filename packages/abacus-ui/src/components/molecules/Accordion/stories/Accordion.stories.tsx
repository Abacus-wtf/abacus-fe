import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Checkbox } from "@atoms";
import { Accordion } from "../src";

export default {
  title: "molecule/Accordion",
  component: Accordion,
  argTypes: {
    title: {
      type: "string",
    },
    type: {
      type: "string",
    },
  },
} as ComponentMeta<typeof Accordion>;

const items = [
  { name: "Hello" },
  { name: "People" },
  { name: "Who" },
  { name: "Stumble" },
  { name: "Blindly" },
];

const Template: ComponentStory<typeof Accordion> = (args) => {
  const [checked, setChecked] = React.useState(items.map(() => false));

  const onChange = (index: number) => () =>
    setChecked((prev) => prev.map((item, i) => (i !== index ? item : !item)));
  return (
    <div style={{ maxWidth: "200px" }}>
      <Accordion {...args}>
        {items.map((item, index) => (
          <Checkbox
            {...args}
            key={item.name}
            name="storybook"
            label={item.name}
            id={item.name}
            value={item.name}
            checked={checked[index]}
            onChange={onChange(index)}
          />
        ))}
      </Accordion>
    </div>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  title: "Hello",
  type: "checkbox",
};

export const Radio = Template.bind({});
Radio.args = {
  title: "Hello",
  type: "radio",
};

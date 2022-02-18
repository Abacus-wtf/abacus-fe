import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Checkbox } from "@atoms";
import { Accordion } from "../src";

export default {
  title: "molecule/Accordion",
  component: Accordion,
  argTypes: {},
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
            key={item.name}
            name={item.name}
            label={item.name}
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
};

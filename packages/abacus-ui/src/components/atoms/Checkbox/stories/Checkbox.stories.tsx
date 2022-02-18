import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Checkbox } from "../src";

export default {
  title: "atom/Checkbox",
  component: Checkbox,
  argTypes: {},
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args) => {
  const [checked, setChecked] = React.useState(false);
  return (
    <Checkbox
      {...args}
      checked={checked}
      onChange={() => setChecked((value) => !value)}
    />
  );
};

export const Primary = Template.bind({});
Primary.args = {
  label: "Featured",
  name: "featured",
};

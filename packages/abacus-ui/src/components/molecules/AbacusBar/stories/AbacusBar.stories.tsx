import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { AbacusBar } from "../src";

export default {
  title: "molecules/AbacusBar",
  component: AbacusBar,
  argTypes: {},
} as ComponentMeta<typeof AbacusBar>;

const Template: ComponentStory<typeof AbacusBar> = (args) => (
  <AbacusBar {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  changeToPosition: () => {},
  totalNumberOfBeads: 5,
  currentPosition: 2,
};

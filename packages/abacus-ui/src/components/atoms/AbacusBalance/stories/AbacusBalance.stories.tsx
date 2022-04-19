import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { AbacusBalance } from "../src";

export default {
  title: "atom/AbacusBalance",
  component: AbacusBalance,
  argTypes: {},
} as ComponentMeta<typeof AbacusBalance>;

const Template: ComponentStory<typeof AbacusBalance> = (args) => (
  <AbacusBalance {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  balance: 11,
};

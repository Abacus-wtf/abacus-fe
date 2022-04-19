import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { CardBar } from "../src";

export default {
  title: "molecule/CardBar",
  component: CardBar,
  argTypes: {},
} as ComponentMeta<typeof CardBar>;

const Template: ComponentStory<typeof CardBar> = (args) => (
  <div style={{ maxWidth: 800 }}>
    <CardBar {...args} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
  title: "Doodle #1",
  poolAmount: 1.22,
  poolAmountUSD: 800.51,
  participants: 59,
  owner: "bgian.eth",
};

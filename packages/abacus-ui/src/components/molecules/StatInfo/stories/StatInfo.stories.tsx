import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { StatInfo } from "../src";

export default {
  title: "molecule/StatInfo",
  component: StatInfo,
  argTypes: {},
} as ComponentMeta<typeof StatInfo>;

const Template: ComponentStory<typeof StatInfo> = (args) => (
  <StatInfo {...args} />
);

export const Primary = Template.bind({});
Primary.args = { stat: "1,200", title: "Treasury Size" };

export const Secondary = Template.bind({});
Secondary.args = { stat: "100", title: "NFTs Appraised", showEthIcon: true };

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ProgressBar } from "../src";

export default {
  title: "atom/ProgressBar",
  component: ProgressBar,
  argTypes: {},
} as ComponentMeta<typeof ProgressBar>;

const Template: ComponentStory<typeof ProgressBar> = (args) => (
  <ProgressBar {...args} progress={0.5} label="50% Filled / 50% Left" />
);

export const Primary = Template.bind({});
Primary.args = {};

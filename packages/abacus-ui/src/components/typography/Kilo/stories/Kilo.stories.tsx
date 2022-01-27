import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Kilo } from "../src";

export default {
  title: "atom/Kilo",
  component: Kilo,
  argTypes: {},
} as ComponentMeta<typeof Kilo>;

const Template: ComponentStory<typeof Kilo> = (args) => <Kilo {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: "Hi there, this is what a <Kilo> tag looks like - renders as div",
};

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Mega } from "../src";

export default {
  title: "atom/Mega",
  component: Mega,
  argTypes: {},
} as ComponentMeta<typeof Mega>;

const Template: ComponentStory<typeof Mega> = (args) => <Mega {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: "This is what a <Mega /> tag looks like - renders as div",
};

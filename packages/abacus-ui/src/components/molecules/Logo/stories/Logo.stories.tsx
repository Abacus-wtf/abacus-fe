import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Logo } from "../src";

export default {
  title: "molecules/Logo",
  component: Logo,
  argTypes: {},
} as ComponentMeta<typeof Logo>;

const Template: ComponentStory<typeof Logo> = (args) => <Logo {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

export const Dark = Template.bind({});
Dark.args = { isDark: true };

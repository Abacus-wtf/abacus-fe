import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Pill } from "../src";

export default {
  title: "atom/Pill",
  component: Pill,
  argTypes: {},
} as ComponentMeta<typeof Pill>;

const Template: ComponentStory<typeof Pill> = (args) => <Pill {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

export const Secondary = Template.bind({});
Number.args = {};


import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Milli } from "../src";

export default {
  title: "typography/Milli",
  component: Milli,
  argTypes: {},
} as ComponentMeta<typeof Milli>;

const Template: ComponentStory<typeof Milli> = (args) => <Milli {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: "This is what a <Milli /> component looks like - renders as div",
};

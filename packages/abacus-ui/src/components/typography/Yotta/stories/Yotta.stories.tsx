import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Yotta } from "../src";

export default {
  title: "atom/Yotta",
  component: Yotta,
  argTypes: {},
} as ComponentMeta<typeof Yotta>;

const Template: ComponentStory<typeof Yotta> = (args) => <Yotta {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: "Yotta is 2 sizes larger than h1",
};

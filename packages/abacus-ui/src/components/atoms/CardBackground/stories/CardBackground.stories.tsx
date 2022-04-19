import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { CardBackground } from "../src";

export default {
  title: "atom/CardBackground",
  component: CardBackground,
  argTypes: {},
} as ComponentMeta<typeof CardBackground>;

const Template: ComponentStory<typeof CardBackground> = (args) => (
  <CardBackground {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  isHalfScreen: true,
  children: <div>hello world</div>,
};

export const Secondary = Template.bind({});
Secondary.args = {
  isHalfScreen: false,
  children: <div>hello world</div>,
};

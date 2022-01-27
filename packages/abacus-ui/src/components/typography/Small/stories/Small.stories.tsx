import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Small } from "../src";

export default {
  title: "atom/Small",
  component: Small,
  argTypes: {},
} as ComponentMeta<typeof Small>;

const Template: ComponentStory<typeof Small> = (args) => <Small {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: "This is what a <small /> tag looks like",
};

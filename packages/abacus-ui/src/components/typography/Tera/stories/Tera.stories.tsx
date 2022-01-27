import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Tera } from "../src";

export default {
  title: "atom/Tera",
  component: Tera,
  argTypes: {},
} as ComponentMeta<typeof Tera>;

const Template: ComponentStory<typeof Tera> = (args) => <Tera {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: "This is what a <Tera /> looks like - renders as div",
};

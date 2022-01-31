import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Giga } from "../src";

export default {
  title: "typography/Giga",
  component: Giga,
  argTypes: {},
} as ComponentMeta<typeof Giga>;

const Template: ComponentStory<typeof Giga> = (args) => <Giga {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: "This is what a <Giga /> tag looks like - renders as div",
};

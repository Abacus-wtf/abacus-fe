import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Peta } from "../src";

export default {
  title: "typography/Peta",
  component: Peta,
  argTypes: {},
} as ComponentMeta<typeof Peta>;

const Template: ComponentStory<typeof Peta> = (args) => <Peta {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: "This is what a <Peta /> tag looks like - renders as div",
};

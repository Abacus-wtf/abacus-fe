import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { H6 } from "../src";

export default {
  title: "typography/H6",
  component: H6,
  argTypes: {},
} as ComponentMeta<typeof H6>;

const Template: ComponentStory<typeof H6> = (args) => <H6 {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: "This is an <h6/> tag",
};

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Nina } from "../src";

export default {
  title: "typography/Nina",
  component: Nina,
  argTypes: {},
} as ComponentMeta<typeof Nina>;

const Template: ComponentStory<typeof Nina> = (args) => <Nina {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: "Nina is 3 sizes larger than h1",
};

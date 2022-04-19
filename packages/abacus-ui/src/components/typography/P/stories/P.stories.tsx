import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { P } from "../src";

export default {
  title: "typography/P",
  component: P,
  argTypes: {},
} as ComponentMeta<typeof P>;

const Template: ComponentStory<typeof P> = (args) => <P {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: "Hi there, this is what a <p> tag looks like",
};

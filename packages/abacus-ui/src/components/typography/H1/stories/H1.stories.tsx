import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { H1 } from "../src";

export default {
  title: "typography/H1",
  component: H1,
  argTypes: {},
} as ComponentMeta<typeof H1>;

const Template: ComponentStory<typeof H1> = (args) => <H1 {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: "Semantic html states there should only be one <h1 /> tag per page",
};

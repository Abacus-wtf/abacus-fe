import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { H3 } from "../src";

export default {
  title: "atom/H3",
  component: H3,
  argTypes: {},
} as ComponentMeta<typeof H3>;

const Template: ComponentStory<typeof H3> = (args) => <H3 {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: "This is what an <h3 /> looks like",
};

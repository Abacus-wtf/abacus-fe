import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { H4 } from "../src";

export default {
  title: "typography/H4",
  component: H4,
  argTypes: {},
} as ComponentMeta<typeof H4>;

const Template: ComponentStory<typeof H4> = (args) => <H4 {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: "This is what an <h4 /> tag looks like",
};

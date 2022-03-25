import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { H5 } from "../src";

export default {
  title: "typography/H5",
  component: H5,
  argTypes: {},
} as ComponentMeta<typeof H5>;

const Template: ComponentStory<typeof H5> = (args) => <H5 {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: "This is what an <h5 /> tag looks like",
};

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { OpenseaObject } from "../src";

export default {
  title: "atom/OpenseaObject",
  component: OpenseaObject,
  argTypes: {},
} as ComponentMeta<typeof OpenseaObject>;

const Template: ComponentStory<typeof OpenseaObject> = (args) => (
  <OpenseaObject {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  src: "../../../static/img_example.png",
  link: "google.com",
};

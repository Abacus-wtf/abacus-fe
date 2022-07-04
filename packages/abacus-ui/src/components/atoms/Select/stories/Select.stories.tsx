import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Select } from "../src";

export default {
  title: "atom/Select",
  component: Select,
  argTypes: {},
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Range } from "../src";

export default {
  title: "atom/Range",
  component: Range,
  argTypes: {},
} as ComponentMeta<typeof Range>;

const Template: ComponentStory<typeof Range> = (args) => <Range {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

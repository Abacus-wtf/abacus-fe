import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { LoadingShimmer } from "../src";

export default {
  title: "atom/LoadingShimmer",
  component: LoadingShimmer,
  argTypes: {},
} as ComponentMeta<typeof LoadingShimmer>;

const Template: ComponentStory<typeof LoadingShimmer> = (args) => (
  <LoadingShimmer {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};

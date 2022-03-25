import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ExploreInfo } from "../src";

export default {
  title: "atom/ExploreInfo",
  component: ExploreInfo,
  argTypes: {},
} as ComponentMeta<typeof ExploreInfo>;

const Template: ComponentStory<typeof ExploreInfo> = (args) => (
  <ExploreInfo {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  title: "Participants",
  text: "12",
  unit: "People",
};

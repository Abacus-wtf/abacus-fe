import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { PersistentBanner } from "../src";

export default {
  title: "atom/PersistentBanner",
  component: PersistentBanner,
  argTypes: {},
} as ComponentMeta<typeof PersistentBanner>;

const Template: ComponentStory<typeof PersistentBanner> = (args) => (
  <PersistentBanner {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { SessionCountdown } from "../src";

export default {
  title: "atom/SessionCountdown",
  component: SessionCountdown,
  argTypes: {},
} as ComponentMeta<typeof SessionCountdown>;

const Template: ComponentStory<typeof SessionCountdown> = (args) => (
  <SessionCountdown {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  endTime: 1647027719000,
};

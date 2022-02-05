import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ProfileInfo } from "../src";

export default {
  title: "molecules/ProfileInfo",
  component: ProfileInfo,
  argTypes: {},
} as ComponentMeta<typeof ProfileInfo>;

const Template: ComponentStory<typeof ProfileInfo> = (args) => (
  <ProfileInfo {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  profileName: "0xinsanity.eth",
  profileIcon: "../../../static/prof.jpeg",
};

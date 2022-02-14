import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ProfileIcon } from "../src";

export default {
  title: "atom/ProfileIcon",
  component: ProfileIcon,
  argTypes: {},
} as ComponentMeta<typeof ProfileIcon>;

const Template: ComponentStory<typeof ProfileIcon> = (args) => (
  <ProfileIcon {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  src: "../../../../static/prof.jpeg",
};

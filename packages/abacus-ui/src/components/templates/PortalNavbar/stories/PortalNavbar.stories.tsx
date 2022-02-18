import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { PortalNavbar } from "../src";

export default {
  title: "template/PortalNavbar",
  component: PortalNavbar,
  argTypes: {},
} as ComponentMeta<typeof PortalNavbar>;

const Template: ComponentStory<typeof PortalNavbar> = (args) => (
  <PortalNavbar {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  balance: 12.343,
  profileName: "0xinsanity.eth",
  profileIcon: "../../../static/prof.jpeg",
};

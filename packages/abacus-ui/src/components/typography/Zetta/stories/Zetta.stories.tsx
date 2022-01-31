import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Zetta } from "../src";

export default {
  title: "typography/Zetta",
  component: Zetta,
  argTypes: {},
} as ComponentMeta<typeof Zetta>;

const Template: ComponentStory<typeof Zetta> = (args) => <Zetta {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: "Zetta is one size larger than h1",
};

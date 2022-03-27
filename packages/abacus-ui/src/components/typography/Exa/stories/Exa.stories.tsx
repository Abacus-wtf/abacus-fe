import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Exa } from "../src";

export default {
  title: "typography/Exa",
  component: Exa,
  argTypes: {},
} as ComponentMeta<typeof Exa>;

const Template: ComponentStory<typeof Exa> = (args) => <Exa {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: "Exa fur yer boots - same size as h1",
};

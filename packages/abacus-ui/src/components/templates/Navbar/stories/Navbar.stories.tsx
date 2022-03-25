import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Navbar } from "../src";

export default {
  title: "template/Navbar",
  component: Navbar,
  argTypes: {},
} as ComponentMeta<typeof Navbar>;

const Template: ComponentStory<typeof Navbar> = (args) => <Navbar {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: (
    <>
      <div>first section</div>
      <div>middle logo</div>
      <div>end section</div>
    </>
  ),
};

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Loader } from "../src";

export default {
  title: "atom/Loader",
  component: Loader,
  argTypes: {},
} as ComponentMeta<typeof Loader>;

const Template: ComponentStory<typeof Loader> = (args) => (
  <div style={{ height: "300px", width: "300px" }}>
    <Loader {...args} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {};

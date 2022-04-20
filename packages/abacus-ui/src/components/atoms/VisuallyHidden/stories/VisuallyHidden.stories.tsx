import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { VisuallyHidden } from "../src";

export default {
  title: "atom/VisuallyHidden",
  component: VisuallyHidden,
  argTypes: {},
} as ComponentMeta<typeof VisuallyHidden>;

const Template: ComponentStory<typeof VisuallyHidden> = (args) => (
  <VisuallyHidden {...args}>
    This text won't be visible, but a screenreader will still read it
  </VisuallyHidden>
);

export const Primary = Template.bind({});
Primary.args = {};

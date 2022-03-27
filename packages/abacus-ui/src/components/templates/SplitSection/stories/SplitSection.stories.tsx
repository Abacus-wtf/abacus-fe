import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { SplitSection } from "../src";

export default {
  title: "template/SplitSection",
  component: SplitSection,
  argTypes: {},
} as ComponentMeta<typeof SplitSection>;

const Template: ComponentStory<typeof SplitSection> = (args) => (
  <SplitSection {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  leftSection: (
    <div style={{ height: 350, width: "100%", backgroundColor: "black" }}>
      hello
    </div>
  ),
  rightSection: (
    <div style={{ height: 350, width: "100%", backgroundColor: "gray" }}>
      hello
    </div>
  ),
};

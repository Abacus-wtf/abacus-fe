import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { MiniList } from "../src";

export default {
  title: "atom/MiniList",
  component: MiniList,
  argTypes: {},
} as ComponentMeta<typeof MiniList>;

const Template: ComponentStory<typeof MiniList> = (args) => (
  <MiniList {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  info: {
    One: "1 ETH",
    Two: "2 ETH",
    Three: "3 ETH",
  },
};

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { PriceHistory } from "../src";

export default {
  title: "molecule/PriceHistory",
  component: PriceHistory,
  argTypes: {},
} as ComponentMeta<typeof PriceHistory>;

const Template: ComponentStory<typeof PriceHistory> = (args) => (
  <div style={{ maxWidth: 400 }}>
    <PriceHistory {...args} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
  etherscanLink: "https://etherscan.io",
  openseaLink: "https://opensea.io",
};

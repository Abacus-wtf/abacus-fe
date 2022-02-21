import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { FundCard } from "../src";

export default {
  title: "molecule/FundCard",
  component: FundCard,
  argTypes: {},
} as ComponentMeta<typeof FundCard>;

const Template: ComponentStory<typeof FundCard> = (args) => (
  <div style={{ maxWidth: 400 }}>
    <FundCard {...args} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
  title: "Deposit funds",
  buttonTitle: "Deposit Funds",
  onClick: () => {},
};

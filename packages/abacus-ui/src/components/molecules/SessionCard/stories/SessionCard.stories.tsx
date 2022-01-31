import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { SessionCard } from "../src";

export default {
  title: "molecules/SessionCard",
  component: SessionCard,
  argTypes: {},
} as ComponentMeta<typeof SessionCard>;

const Template: ComponentStory<typeof SessionCard> = (args) => (
  <SessionCard {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  imgSrc: "../../../../static/img_example.png",
  title: "NFT Title #1",
  bounty: "1",
  participants: "12",
  appraisal: "69",
};

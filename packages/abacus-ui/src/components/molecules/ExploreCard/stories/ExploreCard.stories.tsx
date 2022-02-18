import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ExploreCard } from "../src";

export default {
  title: "molecule/ExploreCard",
  component: ExploreCard,
  argTypes: {},
} as ComponentMeta<typeof ExploreCard>;

const Template: ComponentStory<typeof ExploreCard> = (args) => (
  <ExploreCard {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  nftSrc: "../../../../static/img_example.png",
  nftTitle: "Saturiazone",
  endTime: 1647027719000,
  numParticipants: 69,
  poolAmount: 1.22,
  poolAmountDollars: 800,
  link: "http://google.com",
  imgs: [
    "../../../../static/prof.jpeg",
    "../../../../static/prof.jpeg",
    "../../../../static/prof.jpeg",
    "../../../../static/prof.jpeg",
    "../../../../static/prof.jpeg",
    "../../../../static/prof.jpeg",
    "../../../../static/prof.jpeg",
    "../../../../static/prof.jpeg",
    "../../../../static/prof.jpeg",
    "../../../../static/prof.jpeg",
    "../../../../static/prof.jpeg",
    "../../../../static/prof.jpeg",
  ],
};

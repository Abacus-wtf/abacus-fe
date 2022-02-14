import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ExploreScrollableCard } from "../src";
import { SessionState } from "../src/ExploreScrollableCard";

export default {
  title: "molecule/ExploreScrollableCard",
  component: ExploreScrollableCard,
  argTypes: {},
} as ComponentMeta<typeof ExploreScrollableCard>;

const Template: ComponentStory<typeof ExploreScrollableCard> = (args) => (
  <ExploreScrollableCard {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  cardInfo: {
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
  },
  currentStatus: SessionState.Vote,
};

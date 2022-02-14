import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ExploreCarousel } from "../src";

export default {
  title: "organism/ExploreCarousel",
  component: ExploreCarousel,
  argTypes: {},
} as ComponentMeta<typeof ExploreCarousel>;

const Template: ComponentStory<typeof ExploreCarousel> = (args) => (
  <ExploreCarousel {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  cards: [
    {
      nftSrc: "../../../../static/prof.jpeg",
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
    {
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
    {
      nftSrc: "../../../../static/abacus_crowds_bg.png",
      nftTitle: "Saturiazone 2",
      endTime: 1647027717000,
      numParticipants: 12,
      poolAmount: 3.22,
      poolAmountDollars: 600,
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
  ],
};

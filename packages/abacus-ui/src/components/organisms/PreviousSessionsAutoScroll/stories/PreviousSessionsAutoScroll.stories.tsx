import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { PreviousSessionsAutoScroll } from "../src";

export default {
  title: "organism/PreviousSessionsAutoScroll",
  component: PreviousSessionsAutoScroll,
  argTypes: {},
} as ComponentMeta<typeof PreviousSessionsAutoScroll>;

const Template: ComponentStory<typeof PreviousSessionsAutoScroll> = (args) => (
  <PreviousSessionsAutoScroll {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  sessions: [
    {
      imgSrc: "../../../../static/img_example.png",
      title: "NFT Title #1",
      bounty: "1",
      participants: "12",
      appraisal: "69",
    },
    {
      imgSrc: "../../../../static/img_example.png",
      title: "NFT Title #1",
      bounty: "1",
      participants: "12",
      appraisal: "69",
    },
    {
      imgSrc: "../../../../static/img_example.png",
      title: "NFT Title #1",
      bounty: "1",
      participants: "12",
      appraisal: "69",
    },
    {
      imgSrc: "../../../../static/img_example.png",
      title: "NFT Title #1",
      bounty: "1",
      participants: "12",
      appraisal: "69",
    },
    {
      imgSrc: "../../../../static/img_example.png",
      title: "NFT Title #1",
      bounty: "1",
      participants: "12",
      appraisal: "69",
    },
    {
      imgSrc: "../../../../static/img_example.png",
      title: "NFT Title #1",
      bounty: "1",
      participants: "12",
      appraisal: "69",
    },
  ],
};

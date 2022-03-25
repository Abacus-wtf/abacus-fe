import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ActivitySection } from "../src";

export default {
  title: "molecule/ActivitySection",
  component: ActivitySection,
  argTypes: {},
} as ComponentMeta<typeof ActivitySection>;

const Template: ComponentStory<typeof ActivitySection> = (args) => (
  <ActivitySection {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  activityList: [
    {
      img: "../../../../static/prof.jpeg",
      appraisalAmount: 1,
      stakeAmount: 1,
      appraisorAddress: "0x1234541234123",
    },
    {
      img: "../../../../static/prof.jpeg",
      appraisalAmount: 1,
      stakeAmount: 1,
      appraisorAddress: "0x1234541234123",
    },
    {
      img: "../../../../static/prof.jpeg",
      appraisalAmount: 1,
      stakeAmount: 1,
      appraisorAddress: "0x1234541234123",
    },
    {
      img: "../../../../static/prof.jpeg",
      appraisalAmount: 1,
      stakeAmount: 1,
      appraisorAddress: "0x1234541234123",
    },
    {
      img: "../../../../static/prof.jpeg",
      appraisalAmount: 1,
      stakeAmount: 1,
      appraisorAddress: "0x1234541234123",
    },
    {
      img: "../../../../static/prof.jpeg",
      appraisalAmount: 1,
      stakeAmount: 1,
      appraisorAddress: "0x1234541234123",
    },
    {
      img: "../../../../static/prof.jpeg",
      appraisalAmount: 1,
      stakeAmount: 1,
      appraisorAddress: "0x1234541234123",
    },
  ],
};

export const Secondary = Template.bind({});
Secondary.args = {
  activityList: [],
};

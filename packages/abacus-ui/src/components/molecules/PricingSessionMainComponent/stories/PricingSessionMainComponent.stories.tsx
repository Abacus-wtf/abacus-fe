import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { SessionState } from "components/molecules/ExploreScrollableCard/src/ExploreScrollableCard";
import { PricingSessionMainComponent } from "../src";

export default {
  title: "molecule/PricingSessionMainComponent",
  component: PricingSessionMainComponent,
  argTypes: {},
} as ComponentMeta<typeof PricingSessionMainComponent>;

const Template: ComponentStory<typeof PricingSessionMainComponent> = (args) => (
  <div style={{ width: 1000 }}>
    <PricingSessionMainComponent {...args} />
  </div>
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
  currentState: SessionState.Vote,
  isParticipant: false,
  currentEthBalance: 1.1,
  openDepositModal: () => {},
  onMainClick: () => {},
};

export const Secondary = Template.bind({});
Secondary.args = {
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
  currentState: SessionState.Vote,
  isParticipant: false,
  currentEthBalance: 1.1,
  openDepositModal: () => {},
  onMainClick: () => {},
  participation: {
    appraisal: 1,
    stake: 1.1,
    seedNumber: "0x1234",
  },
};

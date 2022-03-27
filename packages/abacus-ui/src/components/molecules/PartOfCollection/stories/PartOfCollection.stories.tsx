import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { PartOfCollection } from "../src";

export default {
  title: "molecule/PartOfCollection",
  component: PartOfCollection,
  argTypes: {},
} as ComponentMeta<typeof PartOfCollection>;

const Template: ComponentStory<typeof PartOfCollection> = (args) => (
  <div style={{ width: 900 }}>
    <PartOfCollection {...args} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
  openseaObjects: [
    {
      src: "https://pbs.twimg.com/profile_images/1484416288097116160/xLR2e4eu_400x400.png",
      link: "google.com",
    },
    {
      src: "https://pbs.twimg.com/profile_images/1484416288097116160/xLR2e4eu_400x400.png",
      link: "google.com",
    },
    {
      src: "https://pbs.twimg.com/profile_images/1484416288097116160/xLR2e4eu_400x400.png",
      link: "google.com",
    },
    {
      src: "https://pbs.twimg.com/profile_images/1484416288097116160/xLR2e4eu_400x400.png",
      link: "google.com",
    },
    {
      src: "https://pbs.twimg.com/profile_images/1484416288097116160/xLR2e4eu_400x400.png",
      link: "google.com",
    },
    {
      src: "https://pbs.twimg.com/profile_images/1484416288097116160/xLR2e4eu_400x400.png",
      link: "google.com",
    },
    {
      src: "https://pbs.twimg.com/profile_images/1484416288097116160/xLR2e4eu_400x400.png",
      link: "google.com",
    },
    {
      src: "https://pbs.twimg.com/profile_images/1484416288097116160/xLR2e4eu_400x400.png",
      link: "google.com",
    },
    {
      src: "https://pbs.twimg.com/profile_images/1484416288097116160/xLR2e4eu_400x400.png",
      link: "google.com",
    },
    {
      src: "https://pbs.twimg.com/profile_images/1484416288097116160/xLR2e4eu_400x400.png",
      link: "google.com",
    },
    {
      src: "https://pbs.twimg.com/profile_images/1484416288097116160/xLR2e4eu_400x400.png",
      link: "google.com",
    },
    {
      src: "https://pbs.twimg.com/profile_images/1484416288097116160/xLR2e4eu_400x400.png",
      link: "google.com",
    },
  ],
};

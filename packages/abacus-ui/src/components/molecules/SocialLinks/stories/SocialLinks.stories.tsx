import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { SocialLinks } from "../src";

export default {
  title: "molecules/SocialLinks",
  component: SocialLinks,
  argTypes: {
    twitter: {
      name: "twitter",
      type: { name: "string", required: true },
      defaultValue: "https://twitter.com/abacus_wtf",
      description: "Link to twitter handle",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "https://twitter.com/abacus_wtf" },
      },
      control: {
        type: "text",
      },
    },
    discord: {
      name: "discord",
      type: { name: "string", required: true },
      defaultValue:
        "https://discord.com/channels/861936155494842368/871084437306220564",
      description: "Link to discord channel",
      table: {
        type: { summary: "string" },
        defaultValue: {
          summary:
            "https://discord.com/channels/861936155494842368/871084437306220564",
        },
      },
      control: {
        type: "text",
      },
    },
    medium: {
      name: "medium",
      type: { name: "string", required: true },
      defaultValue: "https://medium.com/abacus-wtf",
      description: "Link to medium page",
      table: {
        type: { summary: "string" },
        defaultValue: {
          summary: "https://medium.com/abacus-wtf",
        },
      },
      control: {
        type: "text",
      },
    },
  },
} as ComponentMeta<typeof SocialLinks>;

const Template: ComponentStory<typeof SocialLinks> = (args) => (
  <SocialLinks {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};

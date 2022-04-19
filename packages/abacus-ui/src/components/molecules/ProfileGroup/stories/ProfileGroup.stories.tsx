import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ProfileGroup } from "../src";

export default {
  title: "molecule/ProfileGroup",
  component: ProfileGroup,
  argTypes: {},
} as ComponentMeta<typeof ProfileGroup>;

const Template: ComponentStory<typeof ProfileGroup> = (args) => (
  <ProfileGroup {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
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
  numParticipants: 69,
};

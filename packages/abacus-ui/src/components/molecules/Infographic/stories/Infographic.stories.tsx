import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { AbacusCrowdsIcon } from "../../../icons";
import { Infographic } from "../src";

export default {
  title: "molecules/Infographic",
  component: Infographic,
  argTypes: {},
} as ComponentMeta<typeof Infographic>;

const Template: ComponentStory<typeof Infographic> = (args) => (
  <Infographic {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  imgSrc: "../../../../static/abacus_crowds_bg.png",
  icon: <AbacusCrowdsIcon />,
  title: "Abacus Crowds",
  description:
    "A short description about how Abacus Crowd works in a simple way.",
  onClick: () => {
    console.log("click");
  },
};

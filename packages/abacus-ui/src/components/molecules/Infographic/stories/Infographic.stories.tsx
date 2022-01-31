import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

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
  icon: "../../../../static/abacus_crowds_icon.svg",
  title: "Abacus Crowds",
  description:
    "A short description about how Abacus Crowd works in a simple way.",
  onClick: () => {
    console.log("click");
  },
};

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ExploreImage } from "../src";

export default {
  title: "atoms/ExploreImage",
  component: ExploreImage,
  argTypes: {},
} as ComponentMeta<typeof ExploreImage>;

const Template: ComponentStory<typeof ExploreImage> = (args) => (
  <ExploreImage {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  enableFullBorderRadius: true,
  imgSrc: "../../../../static/img_example.png",
};

export const Secondary = Template.bind({});
Secondary.args = {
  imgSrc: "../../../../static/img_example.png",
};

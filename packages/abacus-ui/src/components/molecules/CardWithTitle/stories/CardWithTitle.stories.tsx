import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { CardWithTitle } from "../src";

export default {
  title: "molecule/CardWithTitle",
  component: CardWithTitle,
  argTypes: {},
} as ComponentMeta<typeof CardWithTitle>;

const Template: ComponentStory<typeof CardWithTitle> = (args) => (
  <CardWithTitle {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  title: "Price History",
  children: <></>,
};

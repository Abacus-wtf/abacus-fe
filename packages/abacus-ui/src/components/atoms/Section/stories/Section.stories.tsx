import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Section } from "../src";

export default {
  title: "atom/Section",
  component: Section,
  argTypes: {},
} as ComponentMeta<typeof Section>;

const Template: ComponentStory<typeof Section> = (args) => (
  <Section {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  foo: "Hello world",
};

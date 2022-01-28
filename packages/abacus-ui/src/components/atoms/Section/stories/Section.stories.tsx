import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Section } from "../src";

export default {
  title: "atom/Section",
  component: Section,
  argTypes: {},
} as ComponentMeta<typeof Section>;

const Template: ComponentStory<typeof Section> = (args) => (
  <Section {...args}>
    <div style={{ height: "200px", width: "200px" }}>Hello</div>
    <div style={{ height: "200px", width: "200px" }}>World</div>
  </Section>
);

export const Primary = Template.bind({});

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Section } from "../src";

export default {
  title: "atom/Section",
  component: Section,
  argTypes: {},
} as ComponentMeta<typeof Section>;

const Placeholder = ({ copy }: { copy: string }) => (
  <div
    style={{
      height: "200px",
      width: "100%",
      background: "gray",
      margin: "4px",
      color: "white",
      fontSize: "4rem",
      fontFamily: "sans-serif",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textTransform: "uppercase",
    }}
  >
    {copy}
  </div>
);

const Template: ComponentStory<typeof Section> = (args) => (
  <Section {...args}>
    <Placeholder copy="Hello" />
    <Placeholder copy="World" />
  </Section>
);

export const Primary = Template.bind({});

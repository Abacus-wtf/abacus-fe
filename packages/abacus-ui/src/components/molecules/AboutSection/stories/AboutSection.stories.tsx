import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { AboutSection } from "../src";

export default {
  title: "molecule/AboutSection",
  component: AboutSection,
  argTypes: {},
} as ComponentMeta<typeof AboutSection>;

const Template: ComponentStory<typeof AboutSection> = (args) => (
  <div style={{ maxWidth: 500 }}>
    <AboutSection {...args} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
  description:
    "Make Yourself at Home is a series of photographs exploring the loss and subsequent redefining of home. Straddling the line between mundane and absurd, each image deconstructs a personal experience and depicts my understanding of home as a place of both comfort and turbulence. In contrast to bizarre and often unlikely scenarios, Make Yourself at Home remains grounded in familiar domestic settings. The end result is a series of psychological landscapes reflecting on identity, relationships, trauma and the changes that are necessary to move forward.",
};

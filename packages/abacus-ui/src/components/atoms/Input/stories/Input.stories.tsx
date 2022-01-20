import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Input } from "../src";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "atoms/Input",
  component: Input,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Input>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Text = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Text.args = {
  type: "text",
  value: "Hello World!",
  onChange: (s: string) => {
    console.log(s);
  },
  name: "text_input",
  label: "Text Label",
  id: "foo123",
};

export const Number = Template.bind({});
Number.args = {
  type: "number",
  value: "234.23",
  onChange: (s: string) => {
    console.log(s);
  },
  name: "number_input",
  label: "Number Label",
  id: "foo123",
};

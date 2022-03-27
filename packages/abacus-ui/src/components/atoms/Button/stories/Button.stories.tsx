import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Button } from "../src";
import { ButtonType } from "../src/Button";

export default {
  title: "atom/Button",
  component: Button,
  argTypes: {},
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Standard = Template.bind({});
Standard.args = { children: "Hello world" };

export const Clear = Template.bind({});
Clear.args = { children: "Hello world", buttonType: ButtonType.Clear };

export const White = Template.bind({});
White.args = { children: "Hello world", buttonType: ButtonType.White };

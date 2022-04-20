import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AbacusIcon } from "../../../icons";

import { Flex } from "../src";

export default {
  title: "atoms/Flex",
  component: Flex,
  argTypes: {},
} as ComponentMeta<typeof Flex>;

const Template: ComponentStory<typeof Flex> = (args) => <Flex {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: (
    <>
      <div>Hello</div>
      <AbacusIcon />
      <div>Flex</div>
    </>
  ),
};

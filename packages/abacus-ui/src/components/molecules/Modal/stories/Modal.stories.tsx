import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Modal } from "../src";

export default {
  title: "molecule/Modal",
  component: Modal,
  argTypes: {},
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

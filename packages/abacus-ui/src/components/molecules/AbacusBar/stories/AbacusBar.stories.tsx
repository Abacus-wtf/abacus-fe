import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { AbacusBar } from "../src";

export default {
  title: "molecule/AbacusBar",
  component: AbacusBar,
  argTypes: {},
} as ComponentMeta<typeof AbacusBar>;

const Template: ComponentStory<typeof AbacusBar> = (args) => {
  const [currentPosition, changeCurrentPosition] = useState(2);
  return (
    <AbacusBar
      {...args}
      currentPosition={currentPosition}
      changeToPosition={(newPos) => changeCurrentPosition(newPos)}
    />
  );
};

export const Primary = Template.bind({});
Primary.args = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  totalNumberOfBeads: 5,
};

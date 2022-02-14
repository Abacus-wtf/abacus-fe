import { Kilo } from "@typography";
import { CardWithTitle } from "components/molecules/CardWithTitle";
import React, { FunctionComponent } from "react";
import styled from "styled-components";

type AboutSectionProps = {
  description: string;
};

const KiloStyled = styled(Kilo)`
  color: ${({ theme }) => theme.colors.core.semiTitle};
  overflow: hidden;
`;

const AboutSection: FunctionComponent<AboutSectionProps> = ({
  description,
}) => (
  <CardWithTitle title="About">
    <KiloStyled>{description}</KiloStyled>
  </CardWithTitle>
);

export default AboutSection;

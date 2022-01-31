import React, { FunctionComponent } from "react";
import Mega from "components/typography/Mega/src/Mega";
import styled from "styled-components";
import MiniList from "components/atoms/MiniList/src/MiniList";

export type SessionCardProps = {
  imgSrc: string;
  title: string;
  bounty: number;
  participants: number;
  appraisal: number;
};

const ImageSection = styled.img`
  width: 280px;
  height: 280px;
  border-top-left-radius: ${({ theme }) => theme.borderRadius.section};
  border-top-right-radius: ${({ theme }) => theme.borderRadius.section};
  object-fit: cover;
`;

const MegaStyled = styled(Mega)`
  color: ${({ theme }) => theme.colors.core.white};
  font-family: "Bluu Next";
  padding-bottom: 24px;
`;

const Container = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius.section};
  background-color: rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: ${({ theme }) => theme.transitionTime.main};
  padding: 0px;
  width: 280px;
  height: 480px;

  &:hover {
    opacity: 0.7;
  }
`;

const BottomSection = styled.div`
  padding: 24px;
  padding-top: 18px;
  display: flex;
  flex-direction: column;
`;

const SessionCard: FunctionComponent<SessionCardProps> = ({
  imgSrc,
  title,
  bounty,
  participants,
  appraisal,
}) => (
  <Container>
    <ImageSection src={imgSrc} alt={`${title}`} />
    <BottomSection>
      <MegaStyled>{title}</MegaStyled>
      <MiniList
        info={{
          "Final Bounty": `${bounty} ETH`,
          Participants: `${participants} People`,
          Appraisal: `${appraisal} ETH`,
        }}
      />
    </BottomSection>
  </Container>
);

export default SessionCard;

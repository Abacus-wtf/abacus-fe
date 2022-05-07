import { Button, Font, ButtonType, OutboundLink } from "abacus-ui"
import React, { FunctionComponent } from "react"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: ${({ theme }) => theme.borderRadius.section};
  background-color: ${({ theme }) => theme.colors.utility.white};
  padding: 16px;
  flex: 0 1 auto;
  width: 100%;
  row-gap: 16px;
  position: relative;
`

const IconContainer = styled.a`
  background: linear-gradient(
    90deg,
    rgba(123, 97, 255, 0.2) 18.75%,
    rgba(62, 116, 255, 0.2) 51.56%,
    rgba(0, 204, 136, 0.2) 82.29%
  );
  height: 80px;
  width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
`

const Title = styled(Button)`
  ${Font("kilo")}
  /* font-size: 22px; */
  color: ${({ theme }) => theme.colors.core[900]};
  padding: 13px 20px;
  border-radius: 80px;
  display: flex;
  column-gap: 12px;
  align-items: center;

  &::after {
    content: "";
    border-radius: ${({ theme }) => theme.borderRadius.section};
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  &:hover {
    &::after {
      background-color: ${({ theme }) => theme.colors.utility.white}50;
    }
  }
`

export type SocialCardProps = {
  icon: React.ReactNode
  title: string
  link: string
}

const SocialCard: FunctionComponent<SocialCardProps> = ({
  icon,
  title,
  link,
}) => (
  <Container>
    <IconContainer>{icon}</IconContainer>
    <Title
      href={link}
      as="a"
      target="_blank"
      rel="noopener noreferrer"
      buttonType={ButtonType.Gray}
    >
      {title}
      <OutboundLink />
    </Title>
  </Container>
)

export { SocialCard }

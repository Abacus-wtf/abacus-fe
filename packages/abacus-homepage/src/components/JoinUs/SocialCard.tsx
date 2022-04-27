import { Exa, Mega, VisuallyHidden } from "abacus-ui"
import React, { FunctionComponent } from "react"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: ${({ theme }) => theme.borderRadius.section};
  background-color: ${({ theme }) => theme.colors.utility.white};
  padding: 16px;
  padding-bottom: 100px;
  flex: 0 1 auto;
  width: 100%;
  column-gap: 8px;
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

const Statistic = styled(Exa)`
  font-size: 40px;
  font-weight: bold;
`

const Title = styled(Mega)`
  /* font-size: 22px; */
  color: ${({ theme }) => theme.colors.core[900]};
`

export type SocialCardProps = {
  icon: React.ReactNode
  statistic: string
  title: string
  link: string
  linkDescription: string
}

const SocialCard: FunctionComponent<SocialCardProps> = ({
  icon,
  statistic,
  title,
  link,
  linkDescription,
}) => (
  <Container>
    <IconContainer href={link}>
      {icon}
      <VisuallyHidden>{linkDescription}</VisuallyHidden>
    </IconContainer>
    <Statistic>{statistic}</Statistic>
    <Title>{title}</Title>
  </Container>
)

export { SocialCard }

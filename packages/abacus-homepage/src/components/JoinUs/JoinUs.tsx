import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { SectionTitle } from "@components/SectionTitle"
import { Section } from "@components/Section"
import { Discord, Media, Medium, Twitter } from "abacus-ui"
import { SocialCard, SocialCardProps } from "./SocialCard"

const Container = styled(Section)`
  background-color: #e2eaff;
  padding: 80px 20px;
  align-items: center;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 40px;
  width: 100%;
  align-items: center;

  ${Media.md`
    width: max-content;
  `}
`

const SocialsContainer = styled.div`
  display: flex;
  column-gap: 36px;
  row-gap: 24px;
  flex-direction: column;
  width: max-content;

  ${Media.sm`
    width: 100%;
    flex-direction: row;
  `};
`

const socials: SocialCardProps[] = [
  {
    icon: <Twitter size="52" brandedColor />,
    statistic: "1k+",
    title: "Twitter Followers",
    link: "https://twitter.com/abacus_wtf",
    linkDescription: "Abaucs Twitter Profile",
  },
  {
    icon: <Discord size="52" brandedColor />,
    statistic: "2k+",
    title: "Discord Members",
    link: "https://discord.com/channels/861936155494842368/871084437306220564",
    linkDescription: "Abacus Discord Channel",
  },
  {
    icon: <Medium size="52" brandedColor />,
    statistic: "10+",
    title: "Articles Written",
    link: "https://medium.com/abacus-wtf",
    linkDescription: "Abacus Medium Articles",
  },
]

const JoinUs: FunctionComponent = () => (
  <Container>
    <Wrapper>
      <SectionTitle>Join the Abacus Community</SectionTitle>
      <SocialsContainer>
        {socials.map((social) => (
          <SocialCard key={social.title} {...social} />
        ))}
      </SocialsContainer>
    </Wrapper>
  </Container>
)

export { JoinUs }
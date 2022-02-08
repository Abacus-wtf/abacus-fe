import React, { FunctionComponent } from "react"
import styled, { keyframes } from "styled-components"
import { H2, Media, SessionCard } from "abacus-ui"

const PreviousSessionsHeader = styled(H2)`
  font-size: 3.875rem;
  line-height: 120%;
  font-family: "Bluu Next", serif;
  display: flex;
  justify-content: center;
  margin-top: 120px;
  margin-bottom: 60px;
  text-align: center;

  ${Media.sm`
    margin-top: 180px;
  `}
`

const PreviousSessionsMarquee = styled.div`
  overflow: hidden;
`

const marquee = keyframes`
  0%   { left: 0%; }
  100% { left: -100%; }
`

const Block = styled.div<{ totalItems: number }>`
  height: 480px;
  width: calc(320px * (${({ totalItems }) => totalItems}));
  overflow: hidden;
  box-sizing: border-box;
  position: relative;
`

const Inner = styled.div`
  display: block;
  width: 200%;
  position: absolute;
  animation: ${marquee} 40s linear infinite;

  &:hover {
    animation-play-state: paused;
  }
`

const Span = styled.span`
  float: left;
  width: 50%;
`

const PreviousSession = styled.div`
  display: inline-block;
  margin: 0 20px;
  transition: all 0.2s ease-out;
`

// TODO: Fetch actual data
const previousSessions = [
  {
    imgSrc: "/img_example.png",
    title: "NFT Name",
    bounty: 0,
    participants: 0,
    appraisal: 0,
    id: 1,
  },
  {
    imgSrc: "/img_example.png",
    title: "NFT Name",
    bounty: 0,
    participants: 0,
    appraisal: 0,
    id: 2,
  },
  {
    imgSrc: "/img_example.png",
    title: "NFT Name",
    bounty: 0,
    participants: 0,
    appraisal: 0,
    id: 3,
  },
  {
    imgSrc: "/img_example.png",
    title: "NFT Name",
    bounty: 0,
    participants: 0,
    appraisal: 0,
    id: 4,
  },
  {
    imgSrc: "/img_example.png",
    title: "NFT Name",
    bounty: 0,
    participants: 0,
    appraisal: 0,
    id: 5,
  },
  {
    imgSrc: "/img_example.png",
    title: "NFT Name",
    bounty: 0,
    participants: 0,
    appraisal: 0,
    id: 6,
  },
  {
    imgSrc: "/img_example.png",
    title: "NFT Name",
    bounty: 0,
    participants: 0,
    appraisal: 0,
    id: 7,
  },
  {
    imgSrc: "/img_example.png",
    title: "NFT Name",
    bounty: 0,
    participants: 0,
    appraisal: 0,
    id: 8,
  },
  {
    imgSrc: "/img_example.png",
    title: "NFT Name",
    bounty: 0,
    participants: 0,
    appraisal: 0,
    id: 9,
  },
]

const PreviousSessions: FunctionComponent = () => (
  <>
    <PreviousSessionsHeader>Previous Sessions</PreviousSessionsHeader>
    <PreviousSessionsMarquee>
      <Block totalItems={previousSessions.length}>
        <Inner>
          <Span>
            {previousSessions.map((session) => (
              <PreviousSession key={session.id}>
                <SessionCard {...session} />
              </PreviousSession>
            ))}
          </Span>
          <Span>
            {previousSessions.map((session) => (
              <PreviousSession key={session.id}>
                <SessionCard {...session} />
              </PreviousSession>
            ))}
          </Span>
        </Inner>
      </Block>
    </PreviousSessionsMarquee>
  </>
)

export default PreviousSessions

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

const PreviousSessionsCarousel = styled.div`
  overflow: hidden;
  position: relative;
  display: flex;
  height: 480px;
`

const marquee = keyframes`
  0%   { left: 0%; }
  100% { left: -100%; }
`

const PreviousSessionsWrapper = styled.div`
  display: block;
  width: 200%;
  position: absolute;
  animation: ${marquee} 15s linear infinite;

  &:hover {
    animation-play-state: paused;
  }
`

const PreviousSessionContainer = styled.div<{ delay: number }>`
  display: inline-block;
  margin: 0 20px;
  /* transition: all 0.2s ease-out; */
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
    <PreviousSessionsCarousel>
      <PreviousSessionsWrapper>
        {previousSessions.map((session, index) => (
          <PreviousSessionContainer
            key={session.id}
            delay={(index * 3) / (previousSessions.length - 1)}
          >
            <SessionCard {...session} />
          </PreviousSessionContainer>
        ))}
      </PreviousSessionsWrapper>
    </PreviousSessionsCarousel>
  </>
)

export default PreviousSessions

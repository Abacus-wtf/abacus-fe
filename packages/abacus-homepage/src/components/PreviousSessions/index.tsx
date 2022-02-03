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
  height: 480px;
`

const slide = keyframes`
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-25%);
  }
`

const PreviousSessionsWrapper = styled.div`
  position: absolute;
  display: flex;
  animation: ${slide} 100s linear infinite alternate;
`

const PreviousSessionContainer = styled.div`
  margin: 0 20px;
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
        {previousSessions.map((session) => (
          <PreviousSessionContainer key={session.id}>
            <SessionCard {...session} />
          </PreviousSessionContainer>
        ))}
      </PreviousSessionsWrapper>
    </PreviousSessionsCarousel>
  </>
)

export default PreviousSessions

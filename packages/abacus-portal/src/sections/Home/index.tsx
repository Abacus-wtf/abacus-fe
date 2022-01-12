import React, { useEffect, useRef } from "react"
import { Title, Subheader, UniversalContainer } from "@components/global.styles"
import Button from "@components/Button"
import Card from "@components/Card"
import {
  useGetMultiSessionData,
  useMultiSessionState,
} from "@state/sessionData/hooks"
import _ from "lodash"
import Link from "gatsby-link"
import { PromiseStatus } from "@models/PromiseStatus"
import PaginationButton from "@components/PaginationButton"
import { useGetCurrentNetwork } from "@state/application/hooks"
import { usePrevious } from "@hooks/index"
import {
  BackgroundIMG,
  HeaderBar,
  CardContainer,
  Header,
  HeaderBarContainer,
} from "./Home.styles"

const Home: React.FC = () => {
  const getMultiSessionData = useGetMultiSessionData()
  const isInitializedRef = useRef(false)
  const { multiSessionData, fetchStatus, isLastPage } = useMultiSessionState()
  // const [searchValue, setSearchValue] = useState("")
  const isLoading = fetchStatus === PromiseStatus.Pending
  const networkSymbol = useGetCurrentNetwork()
  const prevNetworkSymbol = usePrevious(networkSymbol)
  const isNewNetwork = networkSymbol !== prevNetworkSymbol

  useEffect(() => {
    if (isNewNetwork) {
      isInitializedRef.current = false
    }

    if (!isInitializedRef.current) {
      isInitializedRef.current = true
      getMultiSessionData()
    }
  }, [getMultiSessionData, isNewNetwork])

  return (
    <UniversalContainer>
      <BackgroundIMG />
      <HeaderBar>
        <Header>
          <Title>Highlighted</Title>
          <Subheader>
            Browse {multiSessionData ? multiSessionData.length : "-"} Total
            Sessions
          </Subheader>
        </Header>
        <HeaderBarContainer>
          {/* <ButtonsWhite>Filter</ButtonsWhite>
          <SearchBar
            input={searchValue}
            changeInput={input => setSearchValue(input)}
            placeholder={"Find something"}
            onEnter={() => {}}
          /> */}
          <Button
            style={{ display: "flex", alignItems: "center" }}
            as={Link}
            to="/create-session"
          >
            Create Session
          </Button>
        </HeaderBarContainer>
      </HeaderBar>

      <CardContainer>
        {_.map(multiSessionData, (i) => (
          <Card key={`${i.address}-${i.tokenId}-${i.nonce}`} {...i} />
        ))}
      </CardContainer>
      <UniversalContainer style={{ alignItems: "center", marginTop: "10px" }}>
        <PaginationButton
          isLastPage={isLastPage}
          isLoading={isLoading}
          getNextPage={getMultiSessionData}
        />
      </UniversalContainer>
      {isLoading && (
        <UniversalContainer style={{ alignItems: "center" }}>
          Loading... {/* TODO: find a loader */}
        </UniversalContainer>
      )}
    </UniversalContainer>
  )
}

export default Home

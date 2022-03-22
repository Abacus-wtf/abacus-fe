import { OpenSeaAsset, shortenAddress } from "@config/utils"
import { Kilo, CardWithTitle, H5, Media, LinkImage } from "abacus-ui"
import React, { FunctionComponent } from "react"
import styled from "styled-components"

type AboutProps = {
  traits: OpenSeaAsset["traits"]
  creator: OpenSeaAsset["creator"]
}

const Creator = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const KiloStyled = styled(Kilo)`
  color: ${({ theme }) => theme.colors.core.semiTitle};
  overflow: hidden;
  display: flex;
  align-items: center;

  & svg {
    margin-left: 6px;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.utility.gray};
  }
`

const StyledImg = styled.img`
  border-radius: 100%;
  height: 40px;
  width: 40px;
  object-fit: cover;
  margin-right: 20px;
`

const StyledH4 = styled(H5)`
  font-weight: bold;
  margin: 0;
  padding: 0;
`

const Traits = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`

const Trait = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 4px;

  & strong {
    margin-right: 6px;
  }

  ${Media.sm`
    flex-direction: row;
  `}
`

const HR = styled.hr`
  width: 100%;
  margin: 0 auto;
  margin-bottom: 4px;
  border-color: ${({ theme }) => theme.colors.core.border};
`

const formatTraitString = (trait: string) =>
  trait
    .split("_")
    .reduce(
      (acc, val) => `${acc} ${val.charAt(0).toUpperCase()}${val.substring(1)}`,
      ""
    )

const About: FunctionComponent<AboutProps> = ({ traits, creator }) => {
  const creatorValue =
    creator?.user?.username || shortenAddress(creator?.address)
  return (
    <CardWithTitle title="Traits">
      {creatorValue && (
        <>
          <StyledH4>Creator</StyledH4>
          <Creator>
            <StyledImg alt="" src={creator?.profile_img_url} />
            <KiloStyled
              as="a"
              href={`https://opensea.io/${creator?.address}`}
              target="_blank"
              rel="noopener noreferer"
            >
              {creatorValue}
              <LinkImage />
            </KiloStyled>
          </Creator>
        </>
      )}

      <Traits>
        {traits?.map((trait) => (
          <>
            <Trait key={trait.trait_type}>
              <strong>{formatTraitString(trait.trait_type)}</strong>
              <div>
                {formatTraitString(String(trait.value))} - {trait.trait_count}{" "}
                have this trait
              </div>
            </Trait>
            <HR />
          </>
        ))}
      </Traits>
    </CardWithTitle>
  )
}

export default About

import GlobalLayout from "@layouts/index"
import CurrentSession from "@sections/CurrentSession"
import { PageProps, GetServerDataProps } from "gatsby"
import { openseaGet, OpenSeaAsset } from "@config/utils"

import React from "react"

interface CurrentSessionPageProps extends PageProps {
  serverData: {
    openseaURL: string
  }
}

const CurrentSessionPage = ({
  location,
  serverData,
}: CurrentSessionPageProps) => (
  <GlobalLayout location={location} backgroundURL={serverData.openseaURL}>
    <CurrentSession location={location} />
  </GlobalLayout>
)

export async function getServerData({ query }: GetServerDataProps) {
  const { address, tokenId } = query
  let asset: OpenSeaAsset
  if (address && tokenId) {
    asset = await openseaGet(`asset/${address}/${tokenId}`)
  }
  return {
    props: {
      openseaURL: asset?.image_url ?? null,
    },
  }
}

export default CurrentSessionPage

import axios, { AxiosResponse } from "axios";

export type OpenSeaAsset = {
  image_preview_url?: string;
  image_url: string;
  animation_url: string | null;
  asset_contract: {
    name: string;
    address: string;
  };
  collection: {
    name: string;
  };
  token_id: string;
  name: string;
  owner?: {
    address: string;
    user?: {
      username: string;
    };
  };
  permalink: string;
};

const DEFAULT_ASSET: OpenSeaAsset = {
  image_url: "",
  animation_url: "",
  permalink: "",
  asset_contract: {
    name: "",
    address: "",
  },
  collection: {
    name: "",
  },
  token_id: "",
  name: "",
};

export type OpenSeaGetResponse = {
  assets: OpenSeaAsset[];
};

type OpenSeaOptions = {
  url: string;
  api_key?: string;
};

export async function openseaGet<T = OpenSeaAsset>(
  input: string,
  openSeaOptions: OpenSeaOptions
) {
  let result: AxiosResponse<T>;
  try {
    result = await axios.get<T>(openSeaOptions.url + input, {
      decompress: false,
      headers: openSeaOptions.api_key
        ? {
            "X-API-KEY": openSeaOptions.api_key,
          }
        : {},
    });
    return result.data;
  } catch (e) {
    return DEFAULT_ASSET;
  }
}

function isOpenSeaAsset(
  asset: OpenSeaAsset | OpenSeaGetResponse
): asset is OpenSeaAsset {
  return (asset as OpenSeaAsset).token_id !== undefined;
}

export type OpenSeaGetManyParams = { nftAddress: string; tokenId: string }[];

export async function openseaGetMany(
  pricingSessions: OpenSeaGetManyParams,
  options: OpenSeaOptions
) {
  const URL = `assets?${pricingSessions
    .map((session) => `asset_contract_addresses=${session.nftAddress}&`)
    .toString()}${pricingSessions
    .map((session) => `token_ids=${session.tokenId}&`)
    .toString()}`;
  const result = await openseaGet<OpenSeaGetResponse>(
    URL.replaceAll(",", ""),
    options
  );
  if (isOpenSeaAsset(result)) {
    const DEFAULT_OPENSEA_GET_RESPONSE: OpenSeaGetResponse = {
      assets: pricingSessions.map((session) => ({
        ...DEFAULT_ASSET,
        asset_contract: { ...DEFAULT_ASSET, address: session.nftAddress },
        token_id: session.tokenId,
      })),
    };
    return DEFAULT_OPENSEA_GET_RESPONSE;
  }
  return result;
}

export const matchOpenSeaAssetToNFT = (
  assets: OpenSeaGetResponse["assets"],
  session: { nftAddress: string; tokenId: string }
) => {
  const ret = assets.find(
    (asset) =>
      String(asset.asset_contract.address) === String(session.nftAddress) &&
      String(asset.token_id) === String(session.tokenId)
  );
  return ret;
};

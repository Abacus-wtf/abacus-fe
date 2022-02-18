export declare type OpenSeaAsset = {
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
export declare type OpenSeaGetResponse = {
    assets: OpenSeaAsset[];
};
declare type OpenSeaOptions = {
    url: string;
    api_key?: string;
};
export declare function openseaGet<T = OpenSeaAsset>(input: string, openSeaOptions: OpenSeaOptions): Promise<OpenSeaAsset | T>;
export declare type OpenSeaGetManyParams = {
    nftAddress: string;
    tokenId: string;
}[];
export declare function openseaGetMany(pricingSessions: OpenSeaGetManyParams, options: OpenSeaOptions): Promise<OpenSeaGetResponse>;
export declare const matchOpenSeaAssetToNFT: (assets: OpenSeaGetResponse["assets"], session: {
    nftAddress: string;
    tokenId: string;
}) => OpenSeaAsset | undefined;
export {};

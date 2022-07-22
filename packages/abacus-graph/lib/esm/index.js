/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

var Aggregate_OrderBy;
(function (Aggregate_OrderBy) {
    Aggregate_OrderBy["Tvl"] = "TVL";
    Aggregate_OrderBy["Id"] = "id";
    Aggregate_OrderBy["TotalParticipants"] = "totalParticipants";
    Aggregate_OrderBy["TotalPools"] = "totalPools";
})(Aggregate_OrderBy || (Aggregate_OrderBy = {}));
var Allocation_OrderBy;
(function (Allocation_OrderBy) {
    Allocation_OrderBy["Amount"] = "amount";
    Allocation_OrderBy["Collection"] = "collection";
    Allocation_OrderBy["Epoch"] = "epoch";
    Allocation_OrderBy["Id"] = "id";
    Allocation_OrderBy["Timestamp"] = "timestamp";
    Allocation_OrderBy["User"] = "user";
})(Allocation_OrderBy || (Allocation_OrderBy = {}));
var Auction_OrderBy;
(function (Auction_OrderBy) {
    Auction_OrderBy["Bids"] = "bids";
    Auction_OrderBy["EndTimestamp"] = "endTimestamp";
    Auction_OrderBy["Ended"] = "ended";
    Auction_OrderBy["HighestBid"] = "highestBid";
    Auction_OrderBy["HighestBidder"] = "highestBidder";
    Auction_OrderBy["Id"] = "id";
})(Auction_OrderBy || (Auction_OrderBy = {}));
var Bid_OrderBy;
(function (Bid_OrderBy) {
    Bid_OrderBy["Amount"] = "amount";
    Bid_OrderBy["Bidder"] = "bidder";
    Bid_OrderBy["Id"] = "id";
    Bid_OrderBy["Timestamp"] = "timestamp";
})(Bid_OrderBy || (Bid_OrderBy = {}));
var EpochAllocationAggregate_OrderBy;
(function (EpochAllocationAggregate_OrderBy) {
    EpochAllocationAggregate_OrderBy["Amount"] = "amount";
    EpochAllocationAggregate_OrderBy["Epoch"] = "epoch";
    EpochAllocationAggregate_OrderBy["Id"] = "id";
})(EpochAllocationAggregate_OrderBy || (EpochAllocationAggregate_OrderBy = {}));
var EpochAllocation_OrderBy;
(function (EpochAllocation_OrderBy) {
    EpochAllocation_OrderBy["Amount"] = "amount";
    EpochAllocation_OrderBy["Collection"] = "collection";
    EpochAllocation_OrderBy["Epoch"] = "epoch";
    EpochAllocation_OrderBy["Id"] = "id";
})(EpochAllocation_OrderBy || (EpochAllocation_OrderBy = {}));
var Nft_OrderBy;
(function (Nft_OrderBy) {
    Nft_OrderBy["Address"] = "address";
    Nft_OrderBy["Id"] = "id";
    Nft_OrderBy["TokenId"] = "tokenId";
    Nft_OrderBy["Vaults"] = "vaults";
})(Nft_OrderBy || (Nft_OrderBy = {}));
/** Defines the order direction, either ascending or descending */
var OrderDirection;
(function (OrderDirection) {
    OrderDirection["Asc"] = "asc";
    OrderDirection["Desc"] = "desc";
})(OrderDirection || (OrderDirection = {}));
var Participant_OrderBy;
(function (Participant_OrderBy) {
    Participant_OrderBy["Id"] = "id";
    Participant_OrderBy["Vaults"] = "vaults";
})(Participant_OrderBy || (Participant_OrderBy = {}));
var SellablePosition_OrderBy;
(function (SellablePosition_OrderBy) {
    SellablePosition_OrderBy["Amount"] = "amount";
    SellablePosition_OrderBy["AvailableEpoch"] = "availableEpoch";
    SellablePosition_OrderBy["Id"] = "id";
    SellablePosition_OrderBy["Owner"] = "owner";
    SellablePosition_OrderBy["SoldAt"] = "soldAt";
    SellablePosition_OrderBy["VaultAddress"] = "vaultAddress";
})(SellablePosition_OrderBy || (SellablePosition_OrderBy = {}));
var Ticket_OrderBy;
(function (Ticket_OrderBy) {
    Ticket_OrderBy["Id"] = "id";
    Ticket_OrderBy["TicketNumber"] = "ticketNumber";
    Ticket_OrderBy["TokenPurchases"] = "tokenPurchases";
    Ticket_OrderBy["TokenPurchasesLength"] = "tokenPurchasesLength";
    Ticket_OrderBy["VaultAddress"] = "vaultAddress";
})(Ticket_OrderBy || (Ticket_OrderBy = {}));
var TokenPurchase_OrderBy;
(function (TokenPurchase_OrderBy) {
    TokenPurchase_OrderBy["Amount"] = "amount";
    TokenPurchase_OrderBy["FinalEpoch"] = "finalEpoch";
    TokenPurchase_OrderBy["Id"] = "id";
    TokenPurchase_OrderBy["Owner"] = "owner";
    TokenPurchase_OrderBy["StartEpoch"] = "startEpoch";
    TokenPurchase_OrderBy["Ticket"] = "ticket";
    TokenPurchase_OrderBy["Timestamp"] = "timestamp";
})(TokenPurchase_OrderBy || (TokenPurchase_OrderBy = {}));
var User_OrderBy;
(function (User_OrderBy) {
    User_OrderBy["Allocations"] = "allocations";
    User_OrderBy["Id"] = "id";
})(User_OrderBy || (User_OrderBy = {}));
var VaultNft_OrderBy;
(function (VaultNft_OrderBy) {
    VaultNft_OrderBy["Id"] = "id";
    VaultNft_OrderBy["Nft"] = "nft";
    VaultNft_OrderBy["Vault"] = "vault";
})(VaultNft_OrderBy || (VaultNft_OrderBy = {}));
var Vault_OrderBy;
(function (Vault_OrderBy) {
    Vault_OrderBy["EmissionsSigned"] = "emissionsSigned";
    Vault_OrderBy["Id"] = "id";
    Vault_OrderBy["Name"] = "name";
    Vault_OrderBy["Nfts"] = "nfts";
    Vault_OrderBy["Owner"] = "owner";
    Vault_OrderBy["SellablePositions"] = "sellablePositions";
    Vault_OrderBy["Size"] = "size";
    Vault_OrderBy["Status"] = "status";
    Vault_OrderBy["Tickets"] = "tickets";
    Vault_OrderBy["Timestamp"] = "timestamp";
    Vault_OrderBy["TotalParticipants"] = "totalParticipants";
})(Vault_OrderBy || (Vault_OrderBy = {}));
var _SubgraphErrorPolicy_;
(function (_SubgraphErrorPolicy_) {
    /** Data will be returned even if the subgraph has indexing errors */
    _SubgraphErrorPolicy_["Allow"] = "allow";
    /** If the subgraph has indexing errors, data will be omitted. The default. */
    _SubgraphErrorPolicy_["Deny"] = "deny";
})(_SubgraphErrorPolicy_ || (_SubgraphErrorPolicy_ = {}));
var AllocationFragmentDoc = { "kind": "Document", "definitions": [{ "kind": "FragmentDefinition", "name": { "kind": "Name", "value": "Allocation" }, "typeCondition": { "kind": "NamedType", "name": { "kind": "Name", "value": "Allocation" } }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "epoch" } }, { "kind": "Field", "name": { "kind": "Name", "value": "collection" } }, { "kind": "Field", "name": { "kind": "Name", "value": "amount" } }, { "kind": "Field", "name": { "kind": "Name", "value": "timestamp" } }] } }] };
var BidFragmentDoc = { "kind": "Document", "definitions": [{ "kind": "FragmentDefinition", "name": { "kind": "Name", "value": "Bid" }, "typeCondition": { "kind": "NamedType", "name": { "kind": "Name", "value": "Bid" } }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "bidder" } }, { "kind": "Field", "name": { "kind": "Name", "value": "timestamp" } }, { "kind": "Field", "name": { "kind": "Name", "value": "amount" } }] } }] };
var NftFragmentDoc = { "kind": "Document", "definitions": [{ "kind": "FragmentDefinition", "name": { "kind": "Name", "value": "NFT" }, "typeCondition": { "kind": "NamedType", "name": { "kind": "Name", "value": "NFT" } }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "address" } }, { "kind": "Field", "name": { "kind": "Name", "value": "tokenId" } }, { "kind": "Field", "name": { "kind": "Name", "value": "vaults" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "vault" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "name" } }] } }] } }] } }] };
var VaultNftFragmentDoc = { "kind": "Document", "definitions": __spreadArray([{ "kind": "FragmentDefinition", "name": { "kind": "Name", "value": "VaultNFT" }, "typeCondition": { "kind": "NamedType", "name": { "kind": "Name", "value": "VaultNFT" } }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "nft" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "NFT" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "vault" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }] } }] } }], NftFragmentDoc.definitions, true) };
var TokenPurchaseFragmentDoc = { "kind": "Document", "definitions": [{ "kind": "FragmentDefinition", "name": { "kind": "Name", "value": "TokenPurchase" }, "typeCondition": { "kind": "NamedType", "name": { "kind": "Name", "value": "TokenPurchase" } }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "amount" } }, { "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "startEpoch" } }, { "kind": "Field", "name": { "kind": "Name", "value": "finalEpoch" } }, { "kind": "Field", "name": { "kind": "Name", "value": "owner" } }, { "kind": "Field", "name": { "kind": "Name", "value": "timestamp" } }] } }] };
var TicketFragmentDoc = { "kind": "Document", "definitions": __spreadArray([{ "kind": "FragmentDefinition", "name": { "kind": "Name", "value": "Ticket" }, "typeCondition": { "kind": "NamedType", "name": { "kind": "Name", "value": "Ticket" } }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "ticketNumber" } }, { "kind": "Field", "name": { "kind": "Name", "value": "vaultAddress" } }, { "kind": "Field", "name": { "kind": "Name", "value": "tokenPurchasesLength" } }, { "kind": "Field", "name": { "kind": "Name", "value": "tokenPurchases" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "TokenPurchase" } }] } }] } }], TokenPurchaseFragmentDoc.definitions, true) };
var SellablePositionFragmentDoc = { "kind": "Document", "definitions": [{ "kind": "FragmentDefinition", "name": { "kind": "Name", "value": "SellablePosition" }, "typeCondition": { "kind": "NamedType", "name": { "kind": "Name", "value": "SellablePosition" } }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "owner" } }, { "kind": "Field", "name": { "kind": "Name", "value": "amount" } }, { "kind": "Field", "name": { "kind": "Name", "value": "vaultAddress" } }, { "kind": "Field", "name": { "kind": "Name", "value": "availableEpoch" } }, { "kind": "Field", "name": { "kind": "Name", "value": "soldAt" } }] } }] };
var VaultFragmentDoc = { "kind": "Document", "definitions": __spreadArray(__spreadArray(__spreadArray([{ "kind": "FragmentDefinition", "name": { "kind": "Name", "value": "Vault" }, "typeCondition": { "kind": "NamedType", "name": { "kind": "Name", "value": "Vault" } }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "nfts" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "VaultNFT" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "owner" } }, { "kind": "Field", "name": { "kind": "Name", "value": "status" } }, { "kind": "Field", "name": { "kind": "Name", "value": "timestamp" } }, { "kind": "Field", "name": { "kind": "Name", "value": "emissionsSigned" } }, { "kind": "Field", "name": { "kind": "Name", "value": "totalParticipants" } }, { "kind": "Field", "name": { "kind": "Name", "value": "tickets" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "Ticket" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "sellablePositions" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "SellablePosition" } }] } }] } }], VaultNftFragmentDoc.definitions, true), TicketFragmentDoc.definitions, true), SellablePositionFragmentDoc.definitions, true) };
var GetAggregatesDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "GetAggregates" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "aggregate" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "StringValue", "value": "MEDICI_RULES", "block": false } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "totalPools" } }, { "kind": "Field", "name": { "kind": "Name", "value": "TVL" } }, { "kind": "Field", "name": { "kind": "Name", "value": "totalParticipants" } }] } }] } }] };
var AllocationsDocument = { "kind": "Document", "definitions": __spreadArray([{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "Allocations" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "first" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "skip" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "allocations" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "first" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "first" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "skip" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "skip" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "Allocation" } }] } }] } }], AllocationFragmentDoc.definitions, true) };
var GetAuctionDocument = { "kind": "Document", "definitions": __spreadArray([{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "GetAuction" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "auction" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "highestBid" } }, { "kind": "Field", "name": { "kind": "Name", "value": "highestBidder" } }, { "kind": "Field", "name": { "kind": "Name", "value": "bids" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "Bid" } }] } }] } }] } }], BidFragmentDoc.definitions, true) };
var GetAuctionsDocument = { "kind": "Document", "definitions": __spreadArray([{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "GetAuctions" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "auctions" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "highestBid" } }, { "kind": "Field", "name": { "kind": "Name", "value": "highestBidder" } }, { "kind": "Field", "name": { "kind": "Name", "value": "bids" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "Bid" } }] } }] } }] } }], BidFragmentDoc.definitions, true) };
var GetEpochAllocationAggregateDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "GetEpochAllocationAggregate" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "epochAllocationAggregate" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "amount" } }, { "kind": "Field", "name": { "kind": "Name", "value": "epoch" } }] } }] } }] };
var GetEpochAllocationsDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "GetEpochAllocations" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "where" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "EpochAllocation_filter" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "epochAllocations" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "where" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "where" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "amount" } }, { "kind": "Field", "name": { "kind": "Name", "value": "collection" } }, { "kind": "Field", "name": { "kind": "Name", "value": "epoch" } }] } }] } }] };
var GetNftDocument = { "kind": "Document", "definitions": __spreadArray([{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "GetNFT" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "nft" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "NFT" } }] } }] } }], NftFragmentDoc.definitions, true) };
var NfTsDocument = { "kind": "Document", "definitions": __spreadArray([{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "NFTs" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "first" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "skip" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "orderBy" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "NFT_orderBy" } }, "defaultValue": { "kind": "EnumValue", "value": "address" } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "orderDirection" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "OrderDirection" } }, "defaultValue": { "kind": "EnumValue", "value": "desc" } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "where" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "NFT_filter" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "nfts" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "first" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "first" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "orderBy" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "orderBy" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "orderDirection" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "orderDirection" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "skip" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "skip" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "where" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "where" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "NFT" } }] } }] } }], NftFragmentDoc.definitions, true) };
var GetPoolsDocument = { "kind": "Document", "definitions": __spreadArray([{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "GetPools" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "first" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "skip" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "orderBy" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Vault_orderBy" } }, "defaultValue": { "kind": "EnumValue", "value": "timestamp" } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "orderDirection" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "OrderDirection" } }, "defaultValue": { "kind": "EnumValue", "value": "desc" } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "where" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Vault_filter" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "vaults" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "first" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "first" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "orderBy" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "orderBy" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "orderDirection" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "orderDirection" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "skip" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "skip" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "where" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "where" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "Vault" } }] } }] } }], VaultFragmentDoc.definitions, true) };
var GetPoolDocument = { "kind": "Document", "definitions": __spreadArray([{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "GetPool" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "vault" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "Vault" } }] } }] } }], VaultFragmentDoc.definitions, true) };
var GetTicketsDocument = { "kind": "Document", "definitions": __spreadArray([{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "GetTickets" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "first" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "skip" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "where" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Ticket_filter" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "tickets" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "first" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "first" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "orderBy" }, "value": { "kind": "EnumValue", "value": "ticketNumber" } }, { "kind": "Argument", "name": { "kind": "Name", "value": "orderDirection" }, "value": { "kind": "EnumValue", "value": "desc" } }, { "kind": "Argument", "name": { "kind": "Name", "value": "skip" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "skip" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "where" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "where" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "Ticket" } }] } }] } }], TicketFragmentDoc.definitions, true) };
var UserAllocationsDocument = { "kind": "Document", "definitions": __spreadArray([{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "UserAllocations" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "where" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Allocation_filter" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "user" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "allocations" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "where" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "where" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "Allocation" } }] } }] } }] } }], AllocationFragmentDoc.definitions, true) };

export { Aggregate_OrderBy, AllocationFragmentDoc, Allocation_OrderBy, AllocationsDocument, Auction_OrderBy, BidFragmentDoc, Bid_OrderBy, EpochAllocationAggregate_OrderBy, EpochAllocation_OrderBy, GetAggregatesDocument, GetAuctionDocument, GetAuctionsDocument, GetEpochAllocationAggregateDocument, GetEpochAllocationsDocument, GetNftDocument, GetPoolDocument, GetPoolsDocument, GetTicketsDocument, NfTsDocument, NftFragmentDoc, Nft_OrderBy, OrderDirection, Participant_OrderBy, SellablePositionFragmentDoc, SellablePosition_OrderBy, TicketFragmentDoc, Ticket_OrderBy, TokenPurchaseFragmentDoc, TokenPurchase_OrderBy, UserAllocationsDocument, User_OrderBy, VaultFragmentDoc, VaultNftFragmentDoc, VaultNft_OrderBy, Vault_OrderBy, _SubgraphErrorPolicy_ };
//# sourceMappingURL=index.js.map

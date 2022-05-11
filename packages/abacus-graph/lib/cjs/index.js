'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

exports.Aggregate_OrderBy = void 0;
(function (Aggregate_OrderBy) {
    Aggregate_OrderBy["Tvl"] = "TVL";
    Aggregate_OrderBy["Id"] = "id";
    Aggregate_OrderBy["TotalParticipants"] = "totalParticipants";
    Aggregate_OrderBy["TotalPools"] = "totalPools";
})(exports.Aggregate_OrderBy || (exports.Aggregate_OrderBy = {}));
exports.Allocation_OrderBy = void 0;
(function (Allocation_OrderBy) {
    Allocation_OrderBy["Amount"] = "amount";
    Allocation_OrderBy["Collection"] = "collection";
    Allocation_OrderBy["Epoch"] = "epoch";
    Allocation_OrderBy["Id"] = "id";
    Allocation_OrderBy["Timestamp"] = "timestamp";
    Allocation_OrderBy["User"] = "user";
})(exports.Allocation_OrderBy || (exports.Allocation_OrderBy = {}));
exports.Auction_OrderBy = void 0;
(function (Auction_OrderBy) {
    Auction_OrderBy["Bids"] = "bids";
    Auction_OrderBy["EndTimestamp"] = "endTimestamp";
    Auction_OrderBy["Ended"] = "ended";
    Auction_OrderBy["HighestBid"] = "highestBid";
    Auction_OrderBy["HighestBidder"] = "highestBidder";
    Auction_OrderBy["Id"] = "id";
})(exports.Auction_OrderBy || (exports.Auction_OrderBy = {}));
exports.Bid_OrderBy = void 0;
(function (Bid_OrderBy) {
    Bid_OrderBy["Amount"] = "amount";
    Bid_OrderBy["Bidder"] = "bidder";
    Bid_OrderBy["Id"] = "id";
    Bid_OrderBy["Timestamp"] = "timestamp";
})(exports.Bid_OrderBy || (exports.Bid_OrderBy = {}));
/** Defines the order direction, either ascending or descending */
exports.OrderDirection = void 0;
(function (OrderDirection) {
    OrderDirection["Asc"] = "asc";
    OrderDirection["Desc"] = "desc";
})(exports.OrderDirection || (exports.OrderDirection = {}));
exports.Participant_OrderBy = void 0;
(function (Participant_OrderBy) {
    Participant_OrderBy["Id"] = "id";
    Participant_OrderBy["Vaults"] = "vaults";
})(exports.Participant_OrderBy || (exports.Participant_OrderBy = {}));
exports.Ticket_OrderBy = void 0;
(function (Ticket_OrderBy) {
    Ticket_OrderBy["Id"] = "id";
    Ticket_OrderBy["TicketNumber"] = "ticketNumber";
    Ticket_OrderBy["TokenPurchases"] = "tokenPurchases";
    Ticket_OrderBy["TokenPurchasesLength"] = "tokenPurchasesLength";
    Ticket_OrderBy["VaultAddress"] = "vaultAddress";
})(exports.Ticket_OrderBy || (exports.Ticket_OrderBy = {}));
exports.TokenPurchase_OrderBy = void 0;
(function (TokenPurchase_OrderBy) {
    TokenPurchase_OrderBy["Amount"] = "amount";
    TokenPurchase_OrderBy["Id"] = "id";
    TokenPurchase_OrderBy["Length"] = "length";
    TokenPurchase_OrderBy["Owner"] = "owner";
    TokenPurchase_OrderBy["SoldAt"] = "soldAt";
    TokenPurchase_OrderBy["Ticket"] = "ticket";
    TokenPurchase_OrderBy["Timestamp"] = "timestamp";
})(exports.TokenPurchase_OrderBy || (exports.TokenPurchase_OrderBy = {}));
exports.User_OrderBy = void 0;
(function (User_OrderBy) {
    User_OrderBy["Allocations"] = "allocations";
    User_OrderBy["Id"] = "id";
})(exports.User_OrderBy || (exports.User_OrderBy = {}));
exports.Vault_OrderBy = void 0;
(function (Vault_OrderBy) {
    Vault_OrderBy["EmissionsSigned"] = "emissionsSigned";
    Vault_OrderBy["Id"] = "id";
    Vault_OrderBy["NftAddress"] = "nftAddress";
    Vault_OrderBy["Nonce"] = "nonce";
    Vault_OrderBy["Owner"] = "owner";
    Vault_OrderBy["Size"] = "size";
    Vault_OrderBy["Status"] = "status";
    Vault_OrderBy["Tickets"] = "tickets";
    Vault_OrderBy["Timestamp"] = "timestamp";
    Vault_OrderBy["TokenId"] = "tokenId";
    Vault_OrderBy["TotalParticipants"] = "totalParticipants";
})(exports.Vault_OrderBy || (exports.Vault_OrderBy = {}));
exports._SubgraphErrorPolicy_ = void 0;
(function (_SubgraphErrorPolicy_) {
    /** Data will be returned even if the subgraph has indexing errors */
    _SubgraphErrorPolicy_["Allow"] = "allow";
    /** If the subgraph has indexing errors, data will be omitted. The default. */
    _SubgraphErrorPolicy_["Deny"] = "deny";
})(exports._SubgraphErrorPolicy_ || (exports._SubgraphErrorPolicy_ = {}));
var GetAggregatesDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "GetAggregates" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "aggregate" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "StringValue", "value": "MEDICI_RULES", "block": false } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "totalPools" } }, { "kind": "Field", "name": { "kind": "Name", "value": "TVL" } }, { "kind": "Field", "name": { "kind": "Name", "value": "totalParticipants" } }] } }] } }] };
var GetAuctionDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "GetAuction" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "auction" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "highestBid" } }, { "kind": "Field", "name": { "kind": "Name", "value": "highestBidder" } }, { "kind": "Field", "name": { "kind": "Name", "value": "bids" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "bidder" } }, { "kind": "Field", "name": { "kind": "Name", "value": "timestamp" } }, { "kind": "Field", "name": { "kind": "Name", "value": "amount" } }] } }] } }] } }] };
var GetAuctionsDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "GetAuctions" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "auctions" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "highestBid" } }, { "kind": "Field", "name": { "kind": "Name", "value": "highestBidder" } }, { "kind": "Field", "name": { "kind": "Name", "value": "bids" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "bidder" } }, { "kind": "Field", "name": { "kind": "Name", "value": "timestamp" } }, { "kind": "Field", "name": { "kind": "Name", "value": "amount" } }] } }] } }] } }] };
var GetPoolsDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "GetPools" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "first" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "skip" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "orderBy" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Vault_orderBy" } }, "defaultValue": { "kind": "EnumValue", "value": "timestamp" } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "orderDirection" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "OrderDirection" } }, "defaultValue": { "kind": "EnumValue", "value": "desc" } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "where" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Vault_filter" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "vaults" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "first" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "first" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "orderBy" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "orderBy" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "orderDirection" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "orderDirection" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "skip" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "skip" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "where" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "where" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "nftAddress" } }, { "kind": "Field", "name": { "kind": "Name", "value": "tokenId" } }, { "kind": "Field", "name": { "kind": "Name", "value": "owner" } }, { "kind": "Field", "name": { "kind": "Name", "value": "status" } }, { "kind": "Field", "name": { "kind": "Name", "value": "nonce" } }, { "kind": "Field", "name": { "kind": "Name", "value": "timestamp" } }, { "kind": "Field", "name": { "kind": "Name", "value": "emissionsSigned" } }, { "kind": "Field", "name": { "kind": "Name", "value": "size" } }, { "kind": "Field", "name": { "kind": "Name", "value": "totalParticipants" } }, { "kind": "Field", "name": { "kind": "Name", "value": "tickets" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "ticketNumber" } }, { "kind": "Field", "name": { "kind": "Name", "value": "vaultAddress" } }, { "kind": "Field", "name": { "kind": "Name", "value": "tokenPurchasesLength" } }, { "kind": "Field", "name": { "kind": "Name", "value": "tokenPurchases" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "amount" } }, { "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "length" } }, { "kind": "Field", "name": { "kind": "Name", "value": "owner" } }, { "kind": "Field", "name": { "kind": "Name", "value": "soldAt" } }, { "kind": "Field", "name": { "kind": "Name", "value": "timestamp" } }] } }] } }] } }] } }] };
var GetPoolDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "GetPool" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "vault" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "nftAddress" } }, { "kind": "Field", "name": { "kind": "Name", "value": "tokenId" } }, { "kind": "Field", "name": { "kind": "Name", "value": "owner" } }, { "kind": "Field", "name": { "kind": "Name", "value": "status" } }, { "kind": "Field", "name": { "kind": "Name", "value": "nonce" } }, { "kind": "Field", "name": { "kind": "Name", "value": "timestamp" } }, { "kind": "Field", "name": { "kind": "Name", "value": "emissionsSigned" } }, { "kind": "Field", "name": { "kind": "Name", "value": "size" } }, { "kind": "Field", "name": { "kind": "Name", "value": "totalParticipants" } }, { "kind": "Field", "name": { "kind": "Name", "value": "tickets" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "ticketNumber" } }, { "kind": "Field", "name": { "kind": "Name", "value": "vaultAddress" } }, { "kind": "Field", "name": { "kind": "Name", "value": "tokenPurchasesLength" } }, { "kind": "Field", "name": { "kind": "Name", "value": "tokenPurchases" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "amount" } }, { "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "length" } }, { "kind": "Field", "name": { "kind": "Name", "value": "owner" } }, { "kind": "Field", "name": { "kind": "Name", "value": "soldAt" } }, { "kind": "Field", "name": { "kind": "Name", "value": "timestamp" } }] } }] } }] } }] } }] };
var GetTicketsDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "GetTickets" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "first" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "skip" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "where" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Ticket_filter" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "tickets" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "first" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "first" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "orderBy" }, "value": { "kind": "EnumValue", "value": "ticketNumber" } }, { "kind": "Argument", "name": { "kind": "Name", "value": "orderDirection" }, "value": { "kind": "EnumValue", "value": "desc" } }, { "kind": "Argument", "name": { "kind": "Name", "value": "skip" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "skip" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "where" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "where" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "ticketNumber" } }, { "kind": "Field", "name": { "kind": "Name", "value": "vaultAddress" } }, { "kind": "Field", "name": { "kind": "Name", "value": "tokenPurchasesLength" } }, { "kind": "Field", "name": { "kind": "Name", "value": "tokenPurchases" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "amount" } }, { "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "length" } }, { "kind": "Field", "name": { "kind": "Name", "value": "owner" } }, { "kind": "Field", "name": { "kind": "Name", "value": "soldAt" } }, { "kind": "Field", "name": { "kind": "Name", "value": "timestamp" } }] } }] } }] } }] };

exports.GetAggregatesDocument = GetAggregatesDocument;
exports.GetAuctionDocument = GetAuctionDocument;
exports.GetAuctionsDocument = GetAuctionsDocument;
exports.GetPoolDocument = GetPoolDocument;
exports.GetPoolsDocument = GetPoolsDocument;
exports.GetTicketsDocument = GetTicketsDocument;
//# sourceMappingURL=index.js.map

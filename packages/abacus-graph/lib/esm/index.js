var Allocation_OrderBy;
(function (Allocation_OrderBy) {
    Allocation_OrderBy["Amount"] = "amount";
    Allocation_OrderBy["Collection"] = "collection";
    Allocation_OrderBy["Epoch"] = "epoch";
    Allocation_OrderBy["Id"] = "id";
    Allocation_OrderBy["Timestamp"] = "timestamp";
    Allocation_OrderBy["User"] = "user";
})(Allocation_OrderBy || (Allocation_OrderBy = {}));
/** Defines the order direction, either ascending or descending */
var OrderDirection;
(function (OrderDirection) {
    OrderDirection["Asc"] = "asc";
    OrderDirection["Desc"] = "desc";
})(OrderDirection || (OrderDirection = {}));
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
    TokenPurchase_OrderBy["Id"] = "id";
    TokenPurchase_OrderBy["Length"] = "length";
    TokenPurchase_OrderBy["Owner"] = "owner";
    TokenPurchase_OrderBy["SoldAt"] = "soldAt";
    TokenPurchase_OrderBy["Ticket"] = "ticket";
    TokenPurchase_OrderBy["Timestamp"] = "timestamp";
})(TokenPurchase_OrderBy || (TokenPurchase_OrderBy = {}));
var User_OrderBy;
(function (User_OrderBy) {
    User_OrderBy["Allocations"] = "allocations";
    User_OrderBy["Id"] = "id";
})(User_OrderBy || (User_OrderBy = {}));
var Vault_OrderBy;
(function (Vault_OrderBy) {
    Vault_OrderBy["EmissionsSigned"] = "emissionsSigned";
    Vault_OrderBy["Id"] = "id";
    Vault_OrderBy["NftAddress"] = "nftAddress";
    Vault_OrderBy["Nonce"] = "nonce";
    Vault_OrderBy["Owner"] = "owner";
    Vault_OrderBy["Status"] = "status";
    Vault_OrderBy["Tickets"] = "tickets";
    Vault_OrderBy["Timestamp"] = "timestamp";
    Vault_OrderBy["TokenId"] = "tokenId";
})(Vault_OrderBy || (Vault_OrderBy = {}));
var _SubgraphErrorPolicy_;
(function (_SubgraphErrorPolicy_) {
    /** Data will be returned even if the subgraph has indexing errors */
    _SubgraphErrorPolicy_["Allow"] = "allow";
    /** If the subgraph has indexing errors, data will be omitted. The default. */
    _SubgraphErrorPolicy_["Deny"] = "deny";
})(_SubgraphErrorPolicy_ || (_SubgraphErrorPolicy_ = {}));
var GetTicketsDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "GetTickets" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "first" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "skip" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "where" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Ticket_filter" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "tickets" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "first" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "first" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "orderBy" }, "value": { "kind": "EnumValue", "value": "ticketNumber" } }, { "kind": "Argument", "name": { "kind": "Name", "value": "orderDirection" }, "value": { "kind": "EnumValue", "value": "desc" } }, { "kind": "Argument", "name": { "kind": "Name", "value": "skip" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "skip" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "where" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "where" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "ticketNumber" } }, { "kind": "Field", "name": { "kind": "Name", "value": "vaultAddress" } }, { "kind": "Field", "name": { "kind": "Name", "value": "tokenPurchasesLength" } }, { "kind": "Field", "name": { "kind": "Name", "value": "tokenPurchases" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "amount" } }, { "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "length" } }, { "kind": "Field", "name": { "kind": "Name", "value": "owner" } }, { "kind": "Field", "name": { "kind": "Name", "value": "soldAt" } }, { "kind": "Field", "name": { "kind": "Name", "value": "timestamp" } }] } }] } }] } }] };

export { Allocation_OrderBy, GetTicketsDocument, OrderDirection, Ticket_OrderBy, TokenPurchase_OrderBy, User_OrderBy, Vault_OrderBy, _SubgraphErrorPolicy_ };
//# sourceMappingURL=index.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HasuraEventOperationType = exports.HasuraSessionTypes = exports.HasuraDataType = void 0;
var HasuraEventOperationType;
(function (HasuraEventOperationType) {
    HasuraEventOperationType["UPDATE"] = "UPDATE";
    HasuraEventOperationType["INSERT"] = "INSERT";
    HasuraEventOperationType["DELETE"] = "DELETE";
    HasuraEventOperationType["MANUAL"] = "MANUAL";
})(HasuraEventOperationType || (HasuraEventOperationType = {}));
exports.HasuraEventOperationType = HasuraEventOperationType;
var HasuraSessionTypes;
(function (HasuraSessionTypes) {
    HasuraSessionTypes["ROLE"] = "x-hasura-role";
    HasuraSessionTypes["USERID"] = "x-hasura-user-id";
})(HasuraSessionTypes || (HasuraSessionTypes = {}));
exports.HasuraSessionTypes = HasuraSessionTypes;
var HasuraDataType;
(function (HasuraDataType) {
    HasuraDataType["NEW"] = "new";
    HasuraDataType["OLD"] = "old";
})(HasuraDataType || (HasuraDataType = {}));
exports.HasuraDataType = HasuraDataType;

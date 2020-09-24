"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
var EventParser = /** @class */ (function () {
    function EventParser(payload) {
        this.payload = payload;
    }
    /**
     * Returns if operation is an INSERT.
     */
    EventParser.prototype.isInsertOperation = function () {
        return this.getOperationType() === types_1.HasuraEventOperationType.INSERT;
    };
    /**
     * Checks if operation is an UPDATE.
     */
    EventParser.prototype.isUpdateOperation = function () {
        return this.getOperationType() === types_1.HasuraEventOperationType.UPDATE;
    };
    /**
     * Checks if operation is a DELETE.
     */
    EventParser.prototype.isDeleteOperation = function () {
        return this.getOperationType() === types_1.HasuraEventOperationType.DELETE;
    };
    /**
     * Checks if operation is MANUAL.
     */
    EventParser.prototype.isManualOperation = function () {
        return this.getOperationType() === types_1.HasuraEventOperationType.MANUAL;
    };
    /**
     * Returns operation type.
     */
    EventParser.prototype.getOperationType = function () {
        return this.payload.event.op;
    };
    /**
     * Returns session variable by provided ID (e.g. x-hasura-user-role).
     * @param id  ID of session variable.
     */
    EventParser.prototype.getSessionVariable = function (id) {
        return this.payload.event.session_variables[id];
    };
    /**
     * Returns all session variables.
     */
    EventParser.prototype.getSessionVariables = function () {
        return this.payload.event.session_variables;
    };
    /**
     * Returns ID of payload.
     */
    EventParser.prototype.getID = function () {
        return this.payload.id;
    };
    /**
     * Returns trigger name (set in Hasura Console).
     */
    EventParser.prototype.getTriggerName = function () {
        return this.payload.trigger.name;
    };
    /**
     * Gets schema name that the event affected.
     */
    EventParser.prototype.getSchemaName = function () {
        return this.payload.table.schema;
    };
    /**
     * Gets table name that the event affected.
     */
    EventParser.prototype.getTableName = function () {
        return this.payload.table.name;
    };
    /**
     * Returns current retry of the event (if it is set in Hasura Console).
     */
    EventParser.prototype.getCurrentRetry = function () {
        var _a;
        return (_a = this.payload.delivery_info) === null || _a === void 0 ? void 0 : _a.current_retry;
    };
    /**
     * Returns max retries for current event.
     */
    EventParser.prototype.getMaxRetries = function () {
        var _a;
        return (_a = this.payload.delivery_info) === null || _a === void 0 ? void 0 : _a.max_retries;
    };
    /**
     * Returns raw data (old - in UPDATE, DELETE and MANUAL events).
     */
    EventParser.prototype.getOldData = function () {
        return this.payload.event.data.old;
    };
    /**
     * Returns raw data (new - in INSERT, UPDATE events).
     */
    EventParser.prototype.getNewData = function () {
        return this.payload.event.data.new;
    };
    /**
     * Returns timestamp of event.
     */
    EventParser.prototype.getTimestamp = function () {
        return this.payload.created_at;
    };
    /**
     * Returns trace data - context ID.
     */
    EventParser.prototype.getTraceContextID = function () {
        return this.payload.trace_context.trace_id;
    };
    /**
     * Returns trace data - span context ID.
     */
    EventParser.prototype.getTraceContextSpanID = function () {
        return this.payload.trace_context.span_id;
    };
    EventParser.prototype.getDataFetchType = function () {
        if (this.isInsertOperation() || this.isManualOperation()) {
            return types_1.HasuraDataType.NEW;
        }
        return types_1.HasuraDataType.OLD;
    };
    /**
     * Fetches data that was sent by Hasura event by the keys provided.
     *
     * @param keys	Data to fetch.
     */
    EventParser.prototype.getData = function () {
        var keys = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            keys[_i] = arguments[_i];
        }
        if (this.isUpdateOperation()) {
            return this.getUData(keys);
        }
        else {
            var type = this.getDataFetchType();
            return this.getIDMData(keys, type);
        }
    };
    /**
     * Fetches update data by keys. If a key does not exist in both new
     * and old the value is set to null and an info message is triggered.
     *
     * @param keys	Keys to fetch.
     */
    EventParser.prototype.getUData = function (keys) {
        var data = {
            old: {},
            new: {}
        };
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (this.payload.event.data.old[key] && this.payload.event.data.new[key]) {
                data.old[key] = this.payload.event.data.old[key];
                data.new[key] = this.payload.event.data.new[key];
            }
            else {
                data.old[key] = null;
                data.new[key] = null;
            }
        }
        return data;
    };
    /**
     * Fetches data for an INSERT, DELETE or MANUAL operation.
     *
     * @param keys	Keys to fetch.
     * @param type 	Type of operation.
     */
    EventParser.prototype.getIDMData = function (keys, type) {
        var data = {};
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (this.payload.event.data[type][key]) {
                data[key] = this.payload.event.data[type][key];
            }
            else {
                data[key] = null;
            }
        }
        return data;
    };
    return EventParser;
}());
exports.default = EventParser;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ActionParser = /** @class */ (function () {
    function ActionParser(payload) {
        this.payload = payload;
    }
    /**
     * Returns session variable by ID.
     * @param id    ID of session variable (e.g. x-hasura-user-role).
     */
    ActionParser.prototype.getSessionVariable = function (id) {
        return this.payload.session_variables[id];
    };
    /**
     * Returns all session variables.
     */
    ActionParser.prototype.getSessionVariables = function () {
        return this.payload.session_variables;
    };
    /**
     * Returns action name.
     */
    ActionParser.prototype.getActionName = function () {
        return this.payload.action.name;
    };
    /**
     * Gets data from action for provided keys.
     *
     * @param keys  Keys to fetch.
     */
    ActionParser.prototype.getData = function () {
        var keys = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            keys[_i] = arguments[_i];
        }
        var payload;
        var data = {};
        // Some people prefer to do input on mutations and other operations
        if (this.payload.input.input) {
            payload = this.payload.input.input;
        }
        else {
            payload = this.payload.input;
        }
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (payload[key]) {
                data[key] = payload[key];
            }
            else {
                data[key] = null;
            }
        }
        return data;
    };
    /**
     * Returns raw data from payload (not fetching by keys we need.)
     */
    ActionParser.prototype.getRawData = function () {
        if (this.payload.input.input) {
            return this.payload.input.input;
        }
        return this.payload.input;
    };
    return ActionParser;
}());
exports.default = ActionParser;

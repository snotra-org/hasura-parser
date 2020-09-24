import { HasuraAction } from './types';
declare class ActionParser {
    private payload;
    constructor(payload: HasuraAction);
    /**
     * Returns session variable by ID.
     * @param id    ID of session variable (e.g. x-hasura-user-role).
     */
    getSessionVariable(id: string): string;
    /**
     * Returns all session variables.
     */
    getSessionVariables(): any;
    /**
     * Returns action name.
     */
    getActionName(): string;
    /**
     * Gets data from action for provided keys.
     *
     * @param keys  Keys to fetch.
     */
    getData(...keys: Array<string>): any;
    /**
     * Returns raw data from payload (not fetching by keys we need.)
     */
    getRawData(): any;
}
export default ActionParser;

import { HasuraEvent } from './types';
declare class EventParser {
    private payload;
    constructor(payload: HasuraEvent);
    /**
     * Returns if operation is an INSERT.
     */
    isInsertOperation(): boolean;
    /**
     * Checks if operation is an UPDATE.
     */
    isUpdateOperation(): boolean;
    /**
     * Checks if operation is a DELETE.
     */
    isDeleteOperation(): boolean;
    /**
     * Checks if operation is MANUAL.
     */
    isManualOperation(): boolean;
    /**
     * Returns operation type.
     */
    getOperationType(): string;
    /**
     * Returns session variable by provided ID (e.g. x-hasura-user-role).
     * @param id  ID of session variable.
     */
    getSessionVariable(id: string): string;
    /**
     * Returns all session variables.
     */
    getSessionVariables(): any;
    /**
     * Returns ID of payload.
     */
    getID(): string;
    /**
     * Returns trigger name (set in Hasura Console).
     */
    getTriggerName(): string;
    /**
     * Gets schema name that the event affected.
     */
    getSchemaName(): string;
    /**
     * Gets table name that the event affected.
     */
    getTableName(): string;
    /**
     * Returns current retry of the event (if it is set in Hasura Console).
     */
    getCurrentRetry(): number | undefined;
    /**
     * Returns max retries for current event.
     */
    getMaxRetries(): number | undefined;
    /**
     * Returns raw data (old - in UPDATE, DELETE and MANUAL events).
     */
    getOldData(): any;
    /**
     * Returns raw data (new - in INSERT, UPDATE events).
     */
    getNewData(): any;
    /**
     * Returns timestamp of event.
     */
    getTimestamp(): string;
    /**
     * Returns trace data - context ID.
     */
    getTraceContextID(): number;
    /**
     * Returns trace data - span context ID.
     */
    getTraceContextSpanID(): number;
    private getDataFetchType;
    /**
     * Fetches data that was sent by Hasura event by the keys provided.
     *
     * @param keys	Data to fetch.
     */
    getData(...keys: Array<string>): any;
    /**
     * Fetches update data by keys. If a key does not exist in both new
     * and old the value is set to null and an info message is triggered.
     *
     * @param keys	Keys to fetch.
     */
    private getUData;
    /**
     * Fetches data for an INSERT, DELETE or MANUAL operation.
     *
     * @param keys	Keys to fetch.
     * @param type 	Type of operation.
     */
    private getIDMData;
}
export default EventParser;

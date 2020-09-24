/**
 * Hasura Action Event types
 */
declare type HasuraAction = {
    session_variables: any;
    input: any;
    action: HasuraActionData;
};
declare type HasuraActionData = {
    name: string;
};
/**
 * Hasura Event Trigger types
 */
declare type HasuraEvent = {
    event: HasuraEventData;
    created_at: string;
    id: string;
    trigger: HasuraEventTrigger;
    table: HasuraEventTable;
    trace_context: HasuraEventTraceContext;
    delivery_info?: HasuraEventDeliveryInfo;
};
declare type HasuraEventTraceContext = {
    trace_id: number;
    span_id: number;
};
declare type HasuraEventDeliveryInfo = {
    max_retries: number;
    current_retry: number;
};
declare type HasuraEventTrigger = {
    name: string;
};
declare type HasuraEventTable = {
    schema: string;
    name: string;
};
declare type HasuraEventData = {
    session_variables: any;
    op: HasuraEventOperationType;
    data: HasuraEventPayload;
};
declare type HasuraEventPayload = {
    old: any;
    new: any;
};
declare enum HasuraEventOperationType {
    UPDATE = "UPDATE",
    INSERT = "INSERT",
    DELETE = "DELETE",
    MANUAL = "MANUAL"
}
declare enum HasuraSessionTypes {
    ROLE = "x-hasura-role",
    USERID = "x-hasura-user-id"
}
declare enum HasuraDataType {
    NEW = "new",
    OLD = "old"
}
export { HasuraDataType, HasuraAction, HasuraSessionTypes, HasuraEvent, HasuraEventTrigger, HasuraEventTable, HasuraEventData, HasuraEventPayload, HasuraEventOperationType };

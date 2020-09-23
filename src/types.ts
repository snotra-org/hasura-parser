/**
 * Hasura Action Event types
 */
type HasuraAction = {
	session_variables: any,
	input: any,
	action: HasuraActionData
}

type HasuraActionData = {
	name: string
}

/**
 * Hasura Event Trigger types
 */

type HasuraEvent = {
	event: HasuraEventData,
	created_at: string,
	id: string,
	trigger: HasuraEventTrigger,
	table: HasuraEventTable,
	trace_context: HasuraEventTraceContext
	delivery_info?: HasuraEventDeliveryInfo
}

type HasuraEventTraceContext = {
	trace_id: number,
	span_id: number
}

type HasuraEventDeliveryInfo = {
	max_retries: number,
	current_retry: number
}

type HasuraEventTrigger = {
	name: string
}

type HasuraEventTable = {
	schema: string,
	name: string
}

type HasuraEventData = {
	session_variables: any,
	op: HasuraEventOperationType,
	data: HasuraEventPayload
}

type HasuraEventPayload = {
	old: any,
	new: any
}

enum HasuraEventOperationType {
	UPDATE = "UPDATE",
	INSERT = "INSERT",
	DELETE = "DELETE",
	MANUAL = "MANUAL"
}

enum HasuraSessionTypes {
	ROLE = "x-hasura-role",
	USERID = "x-hasura-user-id"
}

enum HasuraDataType {
	NEW = "new",
	OLD = "old"
}

export {
	HasuraDataType,
	HasuraAction,
	HasuraSessionTypes,
	HasuraEvent,
	HasuraEventTrigger,
	HasuraEventTable,
	HasuraEventData,
	HasuraEventPayload,
	HasuraEventOperationType
}
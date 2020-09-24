import {
	HasuraEvent,
	HasuraEventOperationType,
	HasuraDataType
} from './types'

class EventParser {
	private payload: HasuraEvent

	constructor( payload: HasuraEvent ) {
		this.payload = payload
	}

	/**
	 * Returns if operation is an INSERT.
	 */
	isInsertOperation(): boolean {
		return this.getOperationType() === HasuraEventOperationType.INSERT
	}

	/**
	 * Checks if operation is an UPDATE.
	 */
	isUpdateOperation(): boolean {
		return this.getOperationType() === HasuraEventOperationType.UPDATE
	}

	/**
	 * Checks if operation is a DELETE.
	 */
	isDeleteOperation(): boolean {
		return this.getOperationType() === HasuraEventOperationType.DELETE
	}

	/**
	 * Checks if operation is MANUAL.
	 */
	isManualOperation(): boolean {
		return this.getOperationType() === HasuraEventOperationType.MANUAL
	}

	/**
	 * Returns operation type.
	 */
	getOperationType(): string {
		return this.payload.event.op
	}

	/**
	 * Returns session variable by provided ID (e.g. x-hasura-user-role).
	 * @param id  ID of session variable.
	 */
	getSessionVariable( id: string ): string {
		return this.payload.event.session_variables[ id ]
	}

	/**
	 * Returns all session variables.
	 */
	getSessionVariables(): any {
		return this.payload.event.session_variables
	}

	/**
	 * Returns ID of payload.
	 */
	getID(): string {
		return this.payload.id
	}

	/**
	 * Returns trigger name (set in Hasura Console).
	 */
	getTriggerName(): string {
		return this.payload.trigger.name
	}

	/**
	 * Gets schema name that the event affected.
	 */
	getSchemaName(): string {
		return this.payload.table.schema
	}

	/**
	 * Gets table name that the event affected.
	 */
	getTableName(): string {
		return this.payload.table.name
	}

	/**
	 * Returns current retry of the event (if it is set in Hasura Console).
	 */
	getCurrentRetry(): number | undefined {
		return this.payload.delivery_info?.current_retry
	}

	/**
	 * Returns max retries for current event.
	 */
	getMaxRetries(): number | undefined {
		return this.payload.delivery_info?.max_retries
	}

	/**
	 * Returns raw data (old - in UPDATE, DELETE and MANUAL events).
	 */
	getOldData(): any {
		return this.payload.event.data.old
	}

	/**
	 * Returns raw data (new - in INSERT, UPDATE events).
	 */
	getNewData(): any {
		return this.payload.event.data.new
	}

	/**
	 * Returns timestamp of event.
	 */
	getTimestamp() {
		return this.payload.created_at
	}

	/**
	 * Returns trace data - context ID.
	 */
	getTraceContextID(): number {
		return this.payload.trace_context.trace_id
	}

	/**
	 * Returns trace data - span context ID.
	 */
	getTraceContextSpanID(): number {
		return this.payload.trace_context.span_id
	}

	private getDataFetchType(): HasuraDataType {
		if ( this.isInsertOperation() || this.isManualOperation() ) {
			return HasuraDataType.NEW
		}
		return HasuraDataType.OLD
	}

	/**
	 * Fetches data that was sent by Hasura event by the keys provided.
	 *
	 * @param keys	Data to fetch.
	 */
    getData( ...keys: Array<string> ) {
		if ( this.isUpdateOperation() ) {
			return this.getUData( keys )
		} else {
			const type = this.getDataFetchType()
			return this.getIDMData( keys, type )
		}
	}

	/**
	 * Fetches update data by keys. If a key does not exist in both new
	 * and old the value is set to null and an info message is triggered.
	 * 
	 * @param keys	Keys to fetch.
	 */
	private getUData( keys: Array<string> ) {
		const data: any = {
			old: {},
			new: {}
		}

		for( let i = 0; i < keys.length; i++ ) {
			const key = keys[ i ]
			if ( this.payload.event.data.old[ key ] && this.payload.event.data.new[ key ] ) {
				data.old[ key ] = this.payload.event.data.old[ key ]
				data.new[ key ] = this.payload.event.data.new[ key ]
			} else {
				data.old[ key ] = null
				data.new[ key ] = null
			}
		}
		return data
	}
	
	/**
	 * Fetches data for an INSERT, DELETE or MANUAL operation.
	 * 
	 * @param keys	Keys to fetch.
	 * @param type 	Type of operation.
	 */
	private getIDMData( keys: Array<string>, type: HasuraDataType ): any {
		const data: any = {}

        for( let i = 0; i < keys.length; i++ ) {
            const key = keys[ i ]
            if ( this.payload.event.data[ type ][ key ] ) {
                data[ key ] = this.payload.event.data[ type ][ key ]
            } else {
                data[ key ] = null
            }
		}
		
		return data

	}

}

export default EventParser
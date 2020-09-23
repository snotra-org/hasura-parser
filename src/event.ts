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

	isInsertOperation(): boolean {
		return this.getOperationType() === HasuraEventOperationType.INSERT
	}

	isUpdateOperation(): boolean {
		return this.getOperationType() === HasuraEventOperationType.UPDATE
	}

	isDeleteOperation(): boolean {
		return this.getOperationType() === HasuraEventOperationType.DELETE
	}

	isManualOperation(): boolean {
		return this.getOperationType() === HasuraEventOperationType.MANUAL
	}

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

	getID(): string {
		return this.payload.id
	}

	getTriggerName(): string {
		return this.payload.trigger.name
	}

	getSchemaName(): string {
		return this.payload.table.schema
	}

	getTableName(): string {
		return this.payload.table.name
	}

	getCurrentRetry(): number | undefined {
		return this.payload.delivery_info?.current_retry
	}

	getMaxRetries(): number | undefined {
		return this.payload.delivery_info?.max_retries
	}

	getOldData(): any {
		return this.payload.event.data.old
	}

	getNewData(): any {
		return this.payload.event.data.new
	}

	getTimestamp() {
		return this.payload.created_at
	}

	getTraceContextID(): number {
		return this.payload.trace_context.trace_id
	}

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
import EventParser from '../src/event'
import { HasuraEvent, HasuraEventOperationType } from '../src/types'

const testData = {
	parse: {
		event: {
			session_variables: {
				'x-hasura-user-id': 5,
				'x-hasura-user-role': 'admin'
			},
			op: HasuraEventOperationType.MANUAL,
			data: {
				old: null,
				new: null
			}
		},
		created_at: "0",
		id: "5",
		trigger: {
			name: "trigger"
		},
		table: {
			schema: "public",
			name: "user"
		},
		trace_context: {
			trace_id: 3,
			span_id: 5
		},
		delivery_info: {
			max_retries: 0,
			current_retry: 0
		}
	},
	delivery_info: {
		event: {
			session_variables: {
				'x-hasura-user-id': 5,
				'x-hasura-user-role': 'admin'
			},
			op: HasuraEventOperationType.MANUAL,
			data: {
				old: null,
				new: null
			}
		},
		created_at: "0",
		id: "5",
		trigger: {
			name: "trigger"
		},
		table: {
			schema: "public",
			name: "user"
		},
		trace_context: {
			trace_id: 3,
			span_id: 5
		}
	},
	insert: {
		event: {
			session_variables: {},
			op: HasuraEventOperationType.INSERT,
			data: {
				old: null,
				new: {
					'id': 3,
					'name': 'bostjan'
				}
			}
		},
		created_at: "",
		id: "",
		trigger: {
			name: "trigger"
		},
		table: {
			schema: "public",
			name: "user"
		},
		trace_context: {
			trace_id: 3,
			span_id: 5
		},
		delivery_info: {
			max_retries: 0,
			current_retry: 0
		}
	},
	update: {
		event: {
			session_variables: {},
			op: HasuraEventOperationType.UPDATE,
			data: {
				old: {
					'id': 5,
					'name': 'victor'
				},
				new: {
					'id': 3,
					'name': 'bostjan'
				}
			}
		},
		created_at: "",
		id: "",
		trigger: {
			name: "trigger"
		},
		table: {
			schema: "public",
			name: "user"
		},
		trace_context: {
			trace_id: 3,
			span_id: 5
		},
		delivery_info: {
			max_retries: 0,
			current_retry: 0
		}
	},
	delete: {
		event: {
			session_variables: {},
			op: HasuraEventOperationType.DELETE,
			data: {
				old: {
					'id': 5,
					'name': 'victor'
				},
				new: {
					'id': 3,
					'name': 'bostjan'
				}
			}
		},
		created_at: "",
		id: "",
		trigger: {
			name: "trigger"
		},
		table: {
			schema: "public",
			name: "user"
		},
		trace_context: {
			trace_id: 3,
			span_id: 5
		},
		delivery_info: {
			max_retries: 0,
			current_retry: 0
		}
	},
	manual: {
		event: {
			session_variables: {},
			op: HasuraEventOperationType.MANUAL,
			data: {
				old: {
					'id': 5,
					'name': 'victor'
				},
				new: {
					'id': 3,
					'name': 'bostjan'
				}
			}
		},
		created_at: "",
		id: "",
		trigger: {
			name: "trigger"
		},
		table: {
			schema: "public",
			name: "user"
		},
		trace_context: {
			trace_id: 3,
			span_id: 5
		},
		delivery_info: {
			max_retries: 0,
			current_retry: 0
		}
	}
}

describe( 'General parsing', () => {
	it( 'Operation type', () => {
		const payload: HasuraEvent = testData.parse
		let parser = new EventParser( payload )
		expect( parser.getOperationType() ).toBe( "MANUAL" )
	} )
	it( 'ID', () => {
		const payload: HasuraEvent = testData.parse
		let parser = new EventParser( payload )
		expect( parser.getID() ).toBe( "5" )
	} )
	it( 'Trigger name', () => {
		const payload: HasuraEvent = testData.parse
		let parser = new EventParser( payload )
		expect( parser.getTriggerName() ).toBe( "trigger" )
	} )
	it( 'Schema name', () => {
		const payload: HasuraEvent = testData.parse
		let parser = new EventParser( payload )
		expect( parser.getSchemaName() ).toBe( "public" )
	} )
	it( 'Table name', () => {
		const payload: HasuraEvent = testData.parse
		let parser = new EventParser( payload )
		expect( parser.getTableName() ).toBe( "user" )
	} )
	it( 'Current retry', () => {
		const payload: HasuraEvent = testData.parse
		let parser = new EventParser( payload )
		expect( parser.getCurrentRetry() ).toBe( 0 )
	} )
	it( 'Max retries', () => {
		const payload: HasuraEvent = testData.parse
		let parser = new EventParser( payload )
		expect( parser.getMaxRetries() ).toBe( 0 )
	} )
	it( 'Timestamp', () => {
		const payload: HasuraEvent = testData.parse
		let parser = new EventParser( payload )
		expect( parser.getTimestamp() ).toBe( "0" )
	} )
	it( 'Trace context ID', () => {
		const payload: HasuraEvent = testData.parse
		let parser = new EventParser( payload )
		expect( parser.getTraceContextID() ).toBe( 3 )
	} )
	it( 'Trace context span ID', () => {
		const payload: HasuraEvent = testData.parse
		let parser = new EventParser( payload )
		expect( parser.getTraceContextSpanID() ).toBe( 5 )
	} ),
	it( 'Session variables', () => {
		const payload: HasuraEvent = testData.parse
		let parser = new EventParser( payload )
		expect( parser.getSessionVariables() ).toBe( payload.event.session_variables )
	} )
	it( 'OLD data', () => {
		const payload: HasuraEvent = testData.parse
		let parser = new EventParser( payload )
		expect( parser.getOldData() ).toBe( null )
	} )
	it( 'NEW data', () => {
		const payload: HasuraEvent = testData.parse
		let parser = new EventParser( payload )
		expect( parser.getNewData() ).toBe( null )
	} )
})

describe( 'Delivery info', () => {
	it( 'Delivery info', () => {
		const payload: HasuraEvent = testData.delivery_info
		let parser = new EventParser( payload )
		expect( parser.getMaxRetries() ).toBe( undefined )
		expect( parser.getCurrentRetry() ).toBe( undefined )
	} )
})

describe( 'Session variables', () => {
	it( 'User ID, user role, user session', () => {
		const payload: HasuraEvent = testData.parse
		let parser = new EventParser( payload )
		expect( parser.getSessionVariable( 'x-hasura-user-id' ) ).toBe( 5 )
		expect( parser.getSessionVariable( 'x-hasura-user-role' ) ).toBe( 'admin' )
		expect( parser.getSessionVariable( 'x-hasura-user-session' ) ).toBe( undefined )
	} )
})

describe( 'Insert Operation', () => {
	it( 'Fetching insert data', () => {
		const payload: HasuraEvent = testData.insert
		const parser = new EventParser( payload )
		const data = parser.getData( "id", "name", "type" )
		expect( data.id ).toBe( payload.event.data.new.id )
		expect( data.name ).toBe( payload.event.data.new.name )
		expect( data.type ).toBe( null )
	} )
	it( 'Checking Fetching insert data', () => {
		const payload: HasuraEvent = testData.insert
		const parser = new EventParser( payload )
		const data = parser.getData( "id", "name", "type" )
		expect( data.id ).toBe( payload.event.data.new.id )
		expect( data.name ).toBe( payload.event.data.new.name )
		expect( data.type ).toBe( null )
	} )
} )

describe( 'Update Operation', () => {
	it( 'Checking update data', () => {
		const payload: HasuraEvent = testData.update
		const parser = new EventParser( payload )
		const data = parser.getData( "id", "type" )
		expect( data.old.id ).toBe( payload.event.data.old.id )
		expect( data.new.id ).toBe( payload.event.data.new.id )
		expect( data.old.type ).toBe( null )
		expect( data.new.type ).toBe( null )
	} )
} )

describe( 'Delete Operation', () => {
	it( 'Checking delete data', () => {
		const payload: HasuraEvent = testData.delete
		const parser = new EventParser( payload )
		const data = parser.getData( "id", "type" )
		expect( data.id ).toBe( payload.event.data.old.id )
	} )
	it( 'Checking OP type', () => {
		const payload: HasuraEvent = testData.delete
		const parser = new EventParser( payload )
		expect( parser.isDeleteOperation() ).toBe( true )
	} )
} )

describe( 'Manual Operation', () => {
	it( 'Checking manual data', () => {
		const payload: HasuraEvent = testData.manual
		const parser = new EventParser( payload )
		const data = parser.getData( "id", "type" )
		expect( data.id ).toBe( payload.event.data.new.id )
	} )
	it( 'Checking OP type', () => {
		const payload: HasuraEvent = testData.manual
		const parser = new EventParser( payload )
		expect( parser.isManualOperation() ).toBe( true )
	} )
} )
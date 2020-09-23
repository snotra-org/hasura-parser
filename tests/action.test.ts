import ActionParser from '../src/action'
import { HasuraAction } from '../src/types'

const testData = {
    parse: {
        session_variables: {
            'x-hasura-user-id': '5'
        },
        input: {},
        action: {
            name: 'test-action'
        }
    },
    data: {
        session_variables: {
            'x-hasura-user-id': '5'
        },
        input: {
            input: {
                'id': 5,
                'data': 'test'
            }
        },
        action: {
            name: 'test-action'
        }
    },
    dataInput: {
        session_variables: {
            'x-hasura-user-id': '5'
        },
        input: {
            'id': 5,
            'data': 'test'
        },
        action: {
            name: 'test-action'
        }
    }
}

describe( 'General parsing', () => {
	it( 'Action name', () => {
		const payload: HasuraAction = testData.parse
		let parser = new ActionParser( payload )
		expect( parser.getActionName() ).toBe( 'test-action' )
	} )
})

describe( 'Data fetching', () => {
	it( 'With input argument', () => {
		const payload: HasuraAction = testData.data
        let parser = new ActionParser( payload )
        const data = parser.getData( "id", "data", "type" )
		expect( data.id ).toBe( payload.input.input.id )
		expect( data.data ).toBe( payload.input.input.data )
		expect( data.type ).toBe( null )
	} )
	it( 'Without input argument', () => {
		const payload: HasuraAction = testData.dataInput
        let parser = new ActionParser( payload )
        const data = parser.getData( "id", "data", "type" )
		expect( data.id ).toBe( payload.input.id )
		expect( data.data ).toBe( payload.input.data )
		expect( data.type ).toBe( null )
	} )
	it( 'Raw data', () => {
		const payload: HasuraAction = testData.dataInput
        let parser = new ActionParser( payload )
        const data = parser.getRawData()
		expect( data ).toBe( payload.input )
	} )
	it( 'Raw data with input argument', () => {
		const payload: HasuraAction = testData.data
        let parser = new ActionParser( payload )
        const data = parser.getRawData()
		expect( data ).toBe( payload.input.input )
	} )
})

describe( 'Session variables', () => {
	it( 'User ID', () => {
		const payload: HasuraAction = testData.parse
        let parser = new ActionParser( payload )
		expect( parser.getSessionVariable( 'x-hasura-user-id' ) ).toBe( testData.parse.session_variables["x-hasura-user-id"] )
		expect( parser.getSessionVariable( 'no-variable' ) ).toBe( undefined )
	} )
	it( 'All values', () => {
		const payload: HasuraAction = testData.parse
        let parser = new ActionParser( payload )
		expect( parser.getSessionVariables() ).toBe( testData.parse.session_variables )
	} )
})


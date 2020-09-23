import {
    HasuraAction
} from './types'

class ActionParser {
	private payload: HasuraAction

	constructor( payload: HasuraAction ) {
		this.payload = payload
    }
    
    /**
     * Returns session variable by ID.
     * @param id    ID of session variable (e.g. x-hasura-user-role).
     */
	getSessionVariable( id: string ): string {
		return this.payload.session_variables[ id ]
	}

    /**
     * Returns all session variables.
     */
    getSessionVariables(): any {
		return this.payload.session_variables
    }
    
    /**
     * Returns action name.
     */
    getActionName(): string {
        return this.payload.action.name
    }

    /**
     * Gets data from action for provided keys.
     * 
     * @param keys  Keys to fetch.
     */
    getData( ...keys: Array<string> ): any {
        let payload;

        const data: any = {}
        
        // Some people prefer to do input on mutations and other operations
        if ( this.payload.input.input ) {
            payload = this.payload.input.input
        } else {
            payload = this.payload.input
        }

        for ( let i = 0; i < keys.length; i++ ) {
            const key = keys[ i ]
            if ( payload[ key ] ) {
                data[ key ] = payload[ key ]
            } else {
                data[ key ] = null
            }
        }

        return data
    }

    /**
     * Returns raw data from payload (not fetching by keys we need.)
     */
    getRawData(): any {
        if ( this.payload.input.input ) {
            return this.payload.input.input
        }
        return this.payload.input
    }

}

export default ActionParser
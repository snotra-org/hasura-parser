# Hasura Parser

![npm version](https://img.shields.io/npm/v/%40snotra/hasura-parser?logo=npm&label=npm%20package&color=rgb(68%2C%20204%2C%2017))
![Coverage](badges/coverage.svg)
![License](https://img.shields.io/github/license/snotra-org/hasura-parser?color=rgba(0%2C126%2C198))

An easy utility library for parsing data from Hasura events and actions.

## Getting started

First install the package.

```bash
yarn add @snotra/hasura-parser
npm install @snotra/hasura-parser
```

## Actions

To use the Action Parser you can either import ActionParser or require the whole package.

```javascript
import { ActionParser } from '@snotra/hasura-parser'

// Data is from your request body
const actionParser = new ActionParser( data )
```

### Parsing data

To get the data you need, just pass in the keys of the arguments you want:

```javascript
const data = actionParser.getData( "id", "type", "user" )
```

This will give you the following response:

```javascript
{
	"id": <data>,
	"type": <data>,
	"user": null
}
```

If the value is not found a `null` will be returned in its place.

If you want to get all the data in its raw form, you can issue the following call:

```javascript
const data = actionParser.getRawData()
```

This will give you all the values that were passed in by Hasura.

### Getting session variables

Single session variable:

```javascript
const userId = actionParser.getSessionVariable( "x-hasura-user-id" )
```

This will either give you the value of the session variable or just `null` if it is not set.

All session variables:

```javascript
const sessionVariables = actionParser.getSessionVariables()
```

### Other data

Action name:

```javascript
const sessionVariables = actionParser.getActionName()
```

## Events

To use the Events Parser you can either import EventParser or require the whole package.

```javascript
import { EventParser } from '@snotra/hasura-parser'

// Data is from your request body
const eventParser = new EventParser( data )
```

### Parsing data

To get the data you need, just pass in the keys of the arguments you want:

```javascript
const data = eventParser.getData( "id", "type", "user" )
```

The response depends on the event type, if it is an INSERT, DELETE or MANUAL operation you will receive the following response:

```javascript
{
	"id": <data>,
	"type": <data>,
	"user": null
}
```

If the value is not found a `null` will be returned in its place.

If it is an UPDATE operation, the object will contain the old and new values:

```javascript
{
	"old": {
		"id": <data>,
		"type": <data>,
		"user": null
	},
	"new": {
		"id": <data>,
		"type": <data>,
		"user": null	
	}
}
```

If you want to get all the data in its raw form, you can issue the following calls:

```javascript
const oldData = eventParser.getOldData()
const newData = eventParser.getNewData()
```

Depending on the event type, old or new can be `null`.

This will give you all the values that were passed in by Hasura.

### Getting session variables

Single session variable:

```javascript
const userId = eventParser.getSessionVariable( "x-hasura-user-id" )
```

This will either give you the value of the session variable or just `null` if it is not set.

All session variables:

```javascript
const sessionVariables = eventParser.getSessionVariables()
```

### Other data

Get ID of event:

```javascript
const eventID = eventParser.getID()
```

Get trigger name (set in Hasura Console):

```javascript
const triggerName = eventParser.getTriggerName()
```

Get schema name (the name of the schema that was affected by the event):

```javascript
const schemaName = eventParser.getSchemaName()
```

Get table name (name of affected table by the event):

```javascript
const tableName = eventParser.getTableName()
```

Get current retries and max retries (if this is set in the event in Hasura):

```javascript
const currentRetry = eventParser.getCurrentRetry()
const maxRetries = eventParser.getMaxRetries()
```

Operation type checking (INSERT, UPDATE, DELETE, MANUAL):

```javascript
const isInsert = eventParser.isInsertOperation() // The following operations return a boolean value
const isUpdate = eventParser.isUpdateOperation()
const isDelete = eventParser.isDeleteOperation()
const isManual = eventParser.isManualOperation()
const operationType = eventParser.getOperationType() // Returns INSERT, UPDATE, DELETE or MANUAL
```

Timestamp of operation:

```javascript
const timestamp = eventParser.getTimestamp()
```

Trace context:

```javascript
const traceContextID = eventParser.getTraceContextID()
const traceContextSpanID = eventParser.getTraceContextSpanID()
```

## Contributions

If you would like to make any contribution you are welcome to do so.
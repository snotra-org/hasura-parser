[![RESULT d.o.o.](https://www.result.eu/wp-content/uploads/2020/09/Result_400.png "RESULT d.o.o.")](https://www.result.eu/graphql "RESULT d.o.o.")
------------

## Hasura Parser

An easy utility library for parsing data from Hasura events and actions.

#### Getting started

First install the package.

```bash
yarn add @result/hasura-parser
npm install @result/hasura-parser
```

##### Parsing actions example

```javascript
import { ActionParser } from '@result/hasura-parser'

// Data is from your request body
const actionParser = new ActionParser( data )
const data = actionParser.getData( "id", "type", "user" )
```

##### Parsing events example

```javascript
import { EventParser } from '@result/hasura-parser'

// Data is from your request body
const eventParser = new EventParser( data )
// You can pass in argument keys to get data
const data = eventParser.getData( "id", "type", "user" )
```

#### Contributions

Made with :fa-heart: at RESULT d.o.o.
If you would like to make any contribution you are welcome to do so.
import PouchDB from 'pouchdb'
import PouchDBFind from 'pouchdb-find'
import { IS_TEST } from './constants'

PouchDB.plugin(PouchDBFind)

/* istanbul ignore next */
if (IS_TEST) {
  PouchDB.plugin(require('pouchdb-adapter-memory'))
}

/* istanbul ignore next */
const adapter = IS_TEST ? 'memory' : 'idb'

const db = new PouchDB('@nadya:v1', { adapter })

db.createIndex({
  index: { fields: ['type', 'owner'] }
})

export default db

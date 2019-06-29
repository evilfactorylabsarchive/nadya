import PouchDB from 'pouchdb'
import { IS_TEST } from './constants'

if (IS_TEST) {
  PouchDB.plugin(require('pouchdb-adapter-memory'))
}

const adapter = IS_TEST ? 'memory' : 'idb'

const db = new PouchDB('@nadya:v1', { adapter })
const userDb = new PouchDB('@nadya-user:v1', { adapter })

export { db, userDb }

export default db

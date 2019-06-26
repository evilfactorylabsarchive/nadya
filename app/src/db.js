import PouchDB from 'pouchdb'

const db = new PouchDB('@nadya:v1')
const userDb = new PouchDB('@nadya-user:v1')

export { db, userDb }

export default db

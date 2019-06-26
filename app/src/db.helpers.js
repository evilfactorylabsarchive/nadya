import PouchDB from 'pouchdb'

PouchDB.plugin(require('pouchdb-adapter-memory'))

export function createDbInstance() {
  const db = new PouchDB('@nadya:test', { adapter: 'memory' })
  return db
}

export function createUserDbInstance() {
  const userDb = new PouchDB('@nadya-user:test', { adapter: 'memory' })
  return userDb
}

export async function cleaningUpDb(db) {
  await db.destroy()
  await db.close()
}

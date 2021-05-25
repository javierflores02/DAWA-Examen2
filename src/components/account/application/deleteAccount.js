/**
 * @param {Object} obj
 * @param {import('../infraestructure/MongoAccountRepository')} obj.AccountRepository
 */

export default ({ AccountRepository }) => {
  return async ( id ) => {
      console.log(`ID: ${id}`)
    return await AccountRepository.delete(id)
  }
}
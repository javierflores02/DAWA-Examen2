/**
 * @param {Object} obj
 * @param {import('../infraestructure/MongoAccountRepository')} obj.AccountRepository
 */

export default ({ AccountRepository }) => {
  return async ({ idOwner }) => {
    const newAccount = {
      idOwner: idOwner,
      balance: 0
    }
    return await AccountRepository.add(newAccount)
  }
}

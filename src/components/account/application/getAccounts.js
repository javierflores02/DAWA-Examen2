/**
 * @param {Object} obj
 * @param {import('../infraestructure/MongoAccountRepository')} obj.AccountRepository
 */

export default ({ AccountRepository }) => {
    return async ( ) => {
        return await AccountRepository.getAll()
    }
}
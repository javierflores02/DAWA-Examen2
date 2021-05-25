/**
 * @param {Object} obj
 * @param {import('../infraestructure/MongoAccountRepository')} obj.AccountRepository
 */

export default ({ AccountRepository }) => {
    return async ( query ) => {
        return await AccountRepository.getAll(query)
    }
}
/**
 * @param {Object} obj
 * @param {import('../infraestructure/MongoAccountRepository')} obj.AccountRepository
 */

export default ({ AccountRepository }) => {
    return async ( id ) => {
        return await AccountRepository.get(id)
    }
}
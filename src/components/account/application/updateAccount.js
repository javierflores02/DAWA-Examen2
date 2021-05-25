/**
 * @param {Object} obj
 * @param {import('../infraestructure/MongoAccountRepository')} obj.AccountRepository
 */

 export default ({ AccountRepository }) => {
    return async ( id,data ) => {
        return await AccountRepository.update(id,data)
    }
}
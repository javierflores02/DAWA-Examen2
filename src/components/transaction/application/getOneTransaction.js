/**
 * @param {Object} obj
 * @param {import('../infraestructure/MongoTransactionRepository')} obj.TransactionRepository
 */

export default ({ TransactionRepository }) => {
    return async ( id ) => {
        return await TransactionRepository.get(id)
    }
}
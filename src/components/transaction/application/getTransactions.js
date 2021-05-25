/**
 * @param {Object} obj
 * @param {import('../infraestructure/MongoTransactionRepository')} obj.TransactionRepository
 */

export default ({ TransactionRepository }) => {
    return async ( ) => {
        return await TransactionRepository.getAll()
    }
}
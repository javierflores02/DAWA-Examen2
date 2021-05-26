/**
 * @param {Object} obj
 * @param {import('../infraestructure/MongoTransactionRepository')} obj.TransactionRepository
 */

export default ({ TransactionRepository }) => {
    return async ( query ) => {
        return await TransactionRepository.getAll( query )
    }
}
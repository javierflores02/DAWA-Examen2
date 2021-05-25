/**
 * @param {Object} obj
 * @param {import('../infraestructure/MongoTransactionRepository')} obj.TransactionRepository
 */

export default ({ TransactionRepository }) => {
  return async ( amount, type, idAccount, from ) => {
    const newTransaction = {
      idAccount: idAccount,
      type: type,
      from: from,
      amount: amount,
      date: new Date()
    }
    return await TransactionRepository.add(newTransaction)
  }
}

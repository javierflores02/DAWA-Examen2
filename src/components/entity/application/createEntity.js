/**
 * @param {Object} obj
 * @param {import('../infraestructure/MongoEntityRepository')} obj.EntityRepository
 */

export default ({ EntityRepository }) => {
  return async ({ name, number, type, ruc }) => {
    const newEntity = {
      name: name,
      number: number,
      type: type,
      ruc: ruc,
    }
    return await EntityRepository.add(newEntity)
  }
}

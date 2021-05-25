/**
 * @param {Object} obj
 * @param {import('../infraestructure/MongoEntityRepository')} obj.EntityRepository
 */

export default ({ EntityRepository }) => {
    return async ( id ) => {
        return await EntityRepository.get(id)
    }
}
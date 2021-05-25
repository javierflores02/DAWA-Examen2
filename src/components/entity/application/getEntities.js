/**
 * @param {Object} obj
 * @param {import('../infraestructure/MongoEntityRepository')} obj.EntityRepository
 */

export default ({ EntityRepository }) => {
    return async ( ) => {
        return await EntityRepository.getAll()
    }
}
/**
 * @param {Object} obj
 * @param {import('../infraestructure/MongoEntityRepository')} obj.EntityRepository
 */

 export default ({ EntityRepository }) => {
    return async ( id,data ) => {
        return await EntityRepository.update(id,data)
    }
}
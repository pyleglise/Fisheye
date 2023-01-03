const axios = require('axios')

const bdd = module.exports = {
  bddFile: 'src/data/photographers.json',

  /**
 * Get all photographers and all medias
 * @returns Array of database objects
 */
  getAllDatas: async () => {
    return axios
      .get(bdd.bddFile, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
          mode: 'cors'
        }
      })
      .then(res => res)
      .catch('Une erreur est survenue !')
  },

  /**
 * Get one photographe with his id
 * @returns Array of database objects
 */
  getPhotographerByID: async (_id) => {
    const photographers = await bdd.getPhotographers()
    const photographe = photographers.find(element => element.id === Number(_id))
    return photographe
  },

  /**
 * Get all photographers
 * @returns Array of database objects
 */
  getPhotographers: async () => {
    const { data } = await bdd.getAllDatas()
    return data.photographers
  },

  /**
 * Get all medias attached to a photographer id
 * @returns Array of database objects
 */
  getMediasByPhotographerId: async (_id) => {
    const { data } = await bdd.getAllDatas()

    const mediasByPhotographerId = data.media.filter(element => element.photographerId === Number(_id))
    // console.log(mediasByPhotographerId)
    return mediasByPhotographerId
  },
  /**
 * Get media by id attached to a photographer id
 * @returns Array of database objects
 */
  getMediasIdByPhotographerId: async (_id, _mediaId) => {
    const data = await bdd.getMediasByPhotographerId(_id)
    const mediasIdByPhotographerId = data.filter(element => element.id === Number(_mediaId))
    // console.log(mediasIdByPhotographerId[0])
    return mediasIdByPhotographerId[0]
  }
}

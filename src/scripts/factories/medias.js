// factoryMedias
module.exports = {
  create (data) {
    const { date, id, image, likes, photographFirstname, photographerId, price, title } = data
    const picture = `/src/assets/medias/${photographFirstname}/${image}`
    const getMediasDOM = () => {
      const article = document.createElement('article')
      const img = document.createElement('img')
      img.setAttribute('src', picture)
      const divLegend = document.createElement('div')
      const pTitle = document.createElement('p')
      pTitle.textContent = title
      const pLikes = document.createElement('p')
      pLikes.textContent = likes
      article.appendChild(img)
      article.appendChild(divLegend)
      divLegend.appendChild(pTitle)
      divLegend.appendChild(pLikes)
      return (article)
    }
    return { date, id, picture, likes, photographFirstname, photographerId, price, title, getMediasDOM }
  }
}

// factoryMedias
module.exports = {
  create (data) {
    const { date, id, image, video, likes, photographFirstname, photographerId, price, title } = data
    let isVideo = false
    let mediaFile = `/src/assets/medias/${photographFirstname}/${image}`
    if (video) {
      isVideo = true
      mediaFile = `/src/assets/medias/${photographFirstname}/${video}`
    }
    const getMediasDOM = () => {
      const article = document.createElement('article')
      const aMedia = document.createElement('a')
      aMedia.setAttribute('href', mediaFile)
      if (!isVideo) {
        const mediaElement = document.createElement('img')
        mediaElement.setAttribute('src', mediaFile)
        aMedia.appendChild(mediaElement)
      } else {
        const mediaElement = document.createElement('video')
        const videoSource = document.createElement('source')
        videoSource.setAttribute('src', mediaFile)
        videoSource.setAttribute('type', 'video/mp4')
        mediaElement.appendChild(videoSource)
        aMedia.appendChild(mediaElement)
      }
      article.appendChild(aMedia)
      const divLegend = document.createElement('div')
      const pTitle = document.createElement('p')
      pTitle.textContent = title
      const pLikes = document.createElement('p')
      pLikes.classList.add('bigger-font-weight')
      pLikes.innerHTML = likes + ' <i class="fa-solid fa-heart"></i>'

      article.appendChild(divLegend)
      divLegend.appendChild(pTitle)
      divLegend.appendChild(pLikes)
      return (article)
    }
    return { date, id, mediaFile, likes, photographFirstname, photographerId, price, title, getMediasDOM }
  }
}

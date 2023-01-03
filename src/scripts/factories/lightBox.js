// factoryLightBox
module.exports = {
  create (data) {
    const { idx, date, id, image, video, likes, photographFirstname, photographerId, price, title } = data
    let isVideo = false
    // console.log(`./src/assets/medias/${photographFirstname}/${image}`)
    let mediaFile = `./src/assets/medias/${photographFirstname}/${image}`
    if (video) {
      isVideo = true
      mediaFile = `./src/assets/medias/${photographFirstname}/${video}`
    }

    const getLbMediaDOM = () => {
      const ilMedia = document.createElement('li')
      ilMedia.classList.add('li-media')
      ilMedia.setAttribute('id', idx)
      ilMedia.setAttribute('aria-label', title)
      if (!isVideo) {
        const mediaElement = document.createElement('img')
        mediaElement.classList.add('lb-image')
        mediaElement.setAttribute('src', mediaFile)
        mediaElement.setAttribute('alt', title)
        ilMedia.appendChild(mediaElement)
      } else {
        const mediaElement = document.createElement('video')
        const videoSource = document.createElement('source')
        videoSource.setAttribute('src', mediaFile)
        videoSource.setAttribute('type', 'video/mp4')
        videoSource.setAttribute('alt', title)
        mediaElement.setAttribute('controls', '')
        mediaElement.appendChild(videoSource)
        ilMedia.appendChild(mediaElement)
      }

      const pTitle = document.createElement('p')
      pTitle.classList.add('lb-title')
      pTitle.setAttribute('role', 'heading')
      pTitle.setAttribute('aria-level', '2')
      pTitle.textContent = title
      ilMedia.appendChild(pTitle)

      return (ilMedia)
    }
    return { idx, date, id, mediaFile, likes, photographFirstname, photographerId, price, title, getLbMediaDOM }
  }
}

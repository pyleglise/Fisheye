// factoryLightBox
module.exports = {
  create (data) {
    const { date, id, image, video, likes, photographFirstname, photographerId, price, title } = data
    let isVideo = false
    let mediaFile = `/src/assets/medias/${photographFirstname}/${image}`
    if (video) {
      isVideo = true
      mediaFile = `/src/assets/medias/${photographFirstname}/${video}`
    }
    // console.log(data)
    // console.log(mediaFile)
    const getLbMediaDOM = () => {
      const lightbox = document.createElement('div')
      lightbox.id = 'lightbox'
      const article = document.createElement('article')
      lightbox.appendChild(article)
      const iArrLeft = document.createElement('i')
      article.appendChild(iArrLeft)
      iArrLeft.classList.add('fa-solid', 'fa-angle-left')
      iArrLeft.textContent = ''

      // aMedia.setAttribute('href', mediaFile)
      // aMedia.setAttribute('title', "Cliquer pour agrandir l'image " + title)
      const divMedia = document.createElement('div')
      divMedia.classList.add('div-media')
      if (!isVideo) {
        // console.log('Is image')
        const mediaElement = document.createElement('img')
        mediaElement.classList.add('lb-image')
        mediaElement.setAttribute('src', mediaFile)
        mediaElement.setAttribute('alt', title)
        divMedia.appendChild(mediaElement)
      } else {
        // console.log('Is video')
        const mediaElement = document.createElement('video')
        const videoSource = document.createElement('source')
        videoSource.setAttribute('src', mediaFile)
        videoSource.setAttribute('type', 'video/mp4')
        videoSource.setAttribute('alt', title)
        mediaElement.setAttribute('controls', '')
        mediaElement.appendChild(videoSource)
        // aMedia.appendChild(mediaElement)
        divMedia.appendChild(mediaElement)
      }
      article.appendChild(divMedia)
      const div = document.createElement('div')
      div.classList.add('lb-right-col')
      const iCloseBtn = document.createElement('i')
      iCloseBtn.classList.add('fa-solid', 'fa-xmark')
      iCloseBtn.textContent = ''
      div.appendChild(iCloseBtn)
      const iArrRight = document.createElement('i')
      iArrRight.classList.add('fa-solid', 'fa-angle-right')
      iArrRight.textContent = ''
      div.appendChild(iArrRight)

      article.appendChild(div)

      // const divLegend = document.createElement('div')
      const pTitle = document.createElement('p')
      pTitle.classList.add('lb-title')
      pTitle.setAttribute('role', 'heading')
      pTitle.setAttribute('aria-level', '2')
      pTitle.textContent = title
      // const pLikes = document.createElement('p')
      // pLikes.classList.add('bigger-font-weight')
      // pLikes.innerHTML = likes + ' <i class="fa-solid fa-heart"></i>'

      // article.appendChild(divLegend)

      divMedia.appendChild(pTitle)
      // divLegend.appendChild(pLikes)
      return (lightbox)
    }
    return { date, id, mediaFile, likes, photographFirstname, photographerId, price, title, getLbMediaDOM }
  }
}

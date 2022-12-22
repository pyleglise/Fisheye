const bdd = require('../modules/bdd')
const factoryPhotographer = require('../factories/photographer')
const factoryMedias = require('../factories/medias')
const page = new URL(document.location).pathname.replace(/\//, '')
const params = (new URL(document.location)).searchParams
const _id = params.get('id')
// const displayModal = require('../utils/contactForm')

const loadPhotographer = async () => {
  // Récupère les datas du photographe
  const photographe = await bdd.getPhotographerByID(_id)
  return photographe
}

const displayPhotographer = async photographe => {
  const photographerHeader = document.querySelector('.photograph-header')
  const photographerModel = factoryPhotographer.create(await photographe)
  const userCardDOM = photographerModel.getUserCardDOM(page)
  photographerHeader.appendChild(userCardDOM)
  const contactButton = document.querySelector('.contact_button')
  const divIdentity = document.querySelector('.div-identity')
  const pictureIdentity = document.querySelector('.picture-identity')
  photographerHeader.insertBefore(divIdentity, contactButton)
  photographerHeader.appendChild(pictureIdentity)
  displayMedias()
}

const displayMedias = async () => {
  const main = document.querySelector('#main')
  const mediasSection = document.createElement('section')
  mediasSection.classList.add('medias-section')
  const photographe = await loadPhotographer()
  const mediasByPhotographerId = await bdd.getMediasByPhotographerId(_id)
  mediasByPhotographerId.forEach((media) => {
    const firstName = photographe.name.substring(photographe.name.lastIndexOf(' '), 0).replace('-', ' ')
    media.photographFirstname = firstName
    const mediaModel = factoryMedias.create(media)
    const mediaCardDOM = mediaModel.getMediasDOM()
    main.appendChild(mediasSection)
    mediasSection.appendChild(mediaCardDOM)
  })
}

if (window.location.pathname.endsWith('photographer.html')) displayPhotographer(loadPhotographer())

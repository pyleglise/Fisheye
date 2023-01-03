const { getPhotographers } = require('../modules/bdd')
const factoryPhotographer = require('../factories/photographer')
// get the page name
const page = new URL(document.location).pathname.split('/').slice(-1)[0]

const displayData = async photographers => {
  const photographersSection = document.querySelector('.photographer_section')

  photographers.forEach((photographer) => {
    const photographerModel = factoryPhotographer.create(photographer)
    const userCardDOM = photographerModel.getUserCardDOM(page)
    photographersSection.appendChild(userCardDOM)
  })
}

const init = async () => {
  const photographers = await getPhotographers()
  displayData(photographers)
}

init()

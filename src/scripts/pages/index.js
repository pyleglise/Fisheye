const { getPhotographers } = require('../modules/bdd')
const factoryPhotographer = require('../factories/photographer')
const page = new URL(document.location).pathname.replace(/\//, '')

const displayData = async photographers => {
  const photographersSection = document.querySelector('.photographer_section')
  // let index = 0
  photographers.forEach((photographer) => {
    const photographerModel = factoryPhotographer.create(photographer)
    const userCardDOM = photographerModel.getUserCardDOM(page)
    // console.log(userCardDOM)
    photographersSection.appendChild(userCardDOM)
    // index++
  })
}

const init = async () => {
  const photographers = await getPhotographers()
  displayData(photographers)
}

// if (window.location.pathname.endsWith('index.html'))
init()

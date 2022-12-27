/* eslint-disable no-undef */
/* Inject css */
console.log('Démarrage')
require('./css/style.scss')
const header = require('./scripts/utils/header')
const footer = require('./scripts/utils/footer')
header.displayHeader()
footer.displayFooter()

// Router : load js file corresponding to the html page and load parameters if exists
const url = new URL(window.location.href)
const _id = url.searchParams.get('id')
const _mediaId = url.searchParams.get('mediaId')
let calledPage = url.pathname.replace(/\//, '')

if (!calledPage) {
  calledPage = 'index.html'
  window.history.pushState('', document.title, url + calledPage)
}

const scriptToLoad = calledPage.replace(/.html/, '')

switch (scriptToLoad) {
  case 'photographer':
    require('./scripts/pages/photographer')(_id, _mediaId)
    break
  default:
    require('./scripts/pages/index')
}

// Bump version
const spanVersion = document.getElementById('version')
spanVersion.innerText = VERSION

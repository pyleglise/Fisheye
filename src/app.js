/* eslint-disable no-undef */
/* Inject css */
require('./css/style.scss')
require.context('./assets', true, /\.(png|svg|jpg|jpeg|gif|otf|cur|mp4)$/i)
require.context('./data', true, /\.json$/i)
const header = require('./scripts/utils/header')
const footer = require('./scripts/utils/footer')
header.displayHeader()
footer.displayFooter()

// Router : load js file corresponding to the html page and load parameters if exists
const url = new URL(window.location.href)
const _id = url.searchParams.get('id')
const _mediaId = url.searchParams.get('mediaId')
const _sortCriteria = url.searchParams.get('sortCriteria')
const _orderUp = url.searchParams.get('orderUp')

// let calledPage = url.pathname.replace(/\//, '')
let calledPage = url.pathname.split('/').slice(-1)[0]

if (!calledPage) {
  calledPage = 'index.html'
  window.history.pushState('', document.title, url + calledPage)
}

const scriptToLoad = calledPage.replace(/.html/, '')

switch (scriptToLoad) {
  case 'photographer':
    require('./scripts/pages/photographer')(_id, _mediaId, _sortCriteria, _orderUp)
    break
  default:
    require('./scripts/pages/index')
}

// Bump version
const spanVersion = document.getElementById('version')
spanVersion.innerText = VERSION

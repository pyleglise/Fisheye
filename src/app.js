/* eslint-disable no-undef */
/* Inject css */
require('./css/style.scss')
require('./scripts/pages/index')
require('./scripts/pages/photographer')
const header = require('./scripts/utils/header')
const footer = require('./scripts/utils/footer')

header.displayHeader()
footer.displayFooter()
// Bump version
const spanVersion = document.getElementById('version')
spanVersion.innerText = VERSION

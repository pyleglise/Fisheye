module.exports = {
  displayFooter () {
    const footer = document.querySelector('footer')
    footer.setAttribute('role', 'banner')
    const pfooter = document.createElement('p')
    pfooter.textContent = 'Version : '
    const spanFooter = document.createElement('span')
    spanFooter.id = 'version'
    footer.appendChild(pfooter)
    pfooter.appendChild(spanFooter)
  }
}

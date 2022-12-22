module.exports = {
  displayFooter () {
    const footer = document.querySelector('footer')
    const pfooter = document.createElement('p')
    pfooter.textContent = 'Version : '
    const spanFooter = document.createElement('span')
    spanFooter.id = 'version'
    footer.appendChild(pfooter)
    pfooter.appendChild(spanFooter)
  }
}

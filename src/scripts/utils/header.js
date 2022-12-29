module.exports = {
  displayHeader () {
    const header = document.querySelector('header')
    header.innerHTML =
        '<a href="./index.html" class="logo-container" aria-label="Back to Home Page">' +
          '<img src="./src/assets/images/logo.png" alt="Fisheye Home Page" class="logo" >' +
        '</a>' +
        '<h1>Nos photographes</h1>'
  }
}

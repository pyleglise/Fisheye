module.exports = {
  displayHeader () {
    const header = document.querySelector('header')
    header.innerHTML =
        '<a href="./index.html" >' +
          '<img src="./src/assets/images/logo.png" alt="Fisheye Home Page" class="logo" >' +
        '</a>' +
        '<h1>Nos photographes</h1>'
  }
}

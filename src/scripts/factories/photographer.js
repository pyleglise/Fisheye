// factoryPhotographer
module.exports = {
  create (data) {
    const { nbLikes, id, name, city, country, tagline, price, portrait } = data
    // console.log(`./src/assets/photographers/${portrait}`)
    const picture = `./src/assets/photographers/${portrait}`
    function getUserCardDOM (page) {
      const article = document.createElement('article')
      const aLink = document.createElement('a')
      aLink.href = 'photographer.html?id=' + id
      aLink.classList.add('photographer-link')
      aLink.setAttribute('aria-label', name)
      const img = document.createElement('img')
      img.classList.add('picture-identity')
      img.setAttribute('src', picture)
      img.setAttribute('alt', 'Photo de profil de ' + name)
      const pTagline = document.createElement('p')
      pTagline.textContent = tagline
      const spanTagline = document.createElement('span')
      spanTagline.textContent = 'Commentaire :'
      spanTagline.classList.add('visually-hidden')
      const pPrice = document.createElement('p')
      pPrice.classList.add('sub-line')
      pPrice.textContent = price + '€/jour'
      pPrice.setAttribute('aria-hidden', true)
      const spanPrice = document.createElement('span')
      spanPrice.textContent = 'Tarif : ' + price + ' euros par jour'
      spanPrice.classList.add('visually-hidden')
      spanPrice.setAttribute('aria-hidden', false)
      if (page === 'index.html') {
        const h2 = document.createElement('h2')
        h2.textContent = name
        h2.setAttribute('aria-label', 'Identité : ' + name)
        const h3 = document.createElement('h3')
        h3.textContent = city + ', ' + country
        h3.setAttribute('aria-label', 'Localisation : ' + city + ', ' + country)
        article.appendChild(aLink)
        aLink.appendChild(img)
        aLink.appendChild(h2)
        article.appendChild(h3)
        article.appendChild(pTagline)
        pTagline.prepend(spanTagline)
        article.appendChild(pPrice)
        article.appendChild(spanPrice)
        return (article)
      } else if (page === 'photographer.html') {
        const divIdentity = document.createElement('div')
        const h1 = document.createElement('h1')
        h1.textContent = name
        const pLocalization = document.createElement('p')
        pLocalization.textContent = city + ', ' + country
        pLocalization.classList.add('p-localization')
        const divNote = document.createElement('div')
        divNote.classList.add('sticky-note')
        const pNote = document.createElement('p')
        pNote.classList.add('p-note')
        const spanNote = document.createElement('span')
        spanNote.classList.add('span-note')
        spanNote.textContent = nbLikes + ' '
        pNote.appendChild(spanNote)
        pNote.innerHTML += ' <i class="fa-solid fa-heart"></i> ' + price + '€ / jour'

        divNote.appendChild(pNote)
        divIdentity.classList.add('div-identity')
        divIdentity.appendChild(h1)
        divIdentity.appendChild(pLocalization)
        divIdentity.appendChild(pTagline)
        divIdentity.append(img)
        divIdentity.append(divNote)
        return (divIdentity)
      }
    }

    return { id, name, city, country, tagline, price, picture, getUserCardDOM }
  }
}

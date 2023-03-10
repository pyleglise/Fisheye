// Photographer page handling
module.exports = (_id, _mediaId, _sortCriteria, _orderUp) => {
  require('../../css/lightbox.scss')

  const bdd = require('../modules/bdd')
  const factoryPhotographer = require('../factories/photographer')
  const factoryMedias = require('../factories/medias')
  const factoryLightbox = require('../factories/lightBox')
  const errMsg = require('../utils/errorMsg')
  const { modalLinker, domLinker, lightboxLinker } = require('../utils/linker')
  const { regExName, regExEmail, regExMessage } = require('../utils/regExPatterns')
  const {
    displayModal, closeModal, checkTextField, errorDisplayHandler, checkFormValid,
    checker
  } = require('../utils/contactForm')

  // get the page name
  const page = new URL(document.location).pathname.split('/').slice(-1)[0]

  // parse the parameters
  _id = parseInt(_id)
  _mediaId = parseInt(_mediaId)
  // console.log(_orderUp)
  let orderUp
  if (_orderUp !== undefined && _orderUp !== null) {
    orderUp = _orderUp.toLowerCase() === 'true'
  } else orderUp = true // keep it boolean
  console.log(orderUp)
  let sortCriteria = _sortCriteria

  /**
   * Get all the photograper according to it's id which is defined globally
   * @param : none
   * @returns : Array of informations on the photographer
   */
  const loadPhotographer = async () => {
    const photographe = await bdd.getPhotographerByID(_id)
    return photographe
  }

  /**
   * Display the photograper's header according the datas fetched by loadPhotographer
   * @param : object 'photograph' generated by 'loadPhotographer'
   */
  const displayPhotographer = async (photographe) => {
    const photographerHeader = document.querySelector('.photograph-header')
    const photographerModel = factoryPhotographer.create(await photographe)
    const userCardDOM = photographerModel.getUserCardDOM(page)
    photographerHeader.appendChild(userCardDOM)
    const contactButton = document.querySelector('.contact_button')
    const divIdentity = document.querySelector('.div-identity')
    const pictureIdentity = document.querySelector('.picture-identity')
    photographerHeader.insertBefore(divIdentity, contactButton)
    photographerHeader.appendChild(pictureIdentity)
    const nbLikes = await displayMedias(photographe)
    photographe.nbLikes = nbLikes
    await displayTotalLikes(photographe)
  }

  /**
   * Display the medias of the photographer according the datas fetched by loadPhotographer
   * @param : object 'photograph' generated by 'loadPhotographer'
   */
  const displayMedias = async (photographe) => {
    const mediaSection = document.querySelector('.medias-section')
    if (mediaSection) mediaSection.remove()
    const mediasSection = document.createElement('section')
    mediasSection.classList.add('medias-section')
    // const aTitle = document.createElement('a')
    // aTitle.textContent = 'Title'

    if (orderUp === undefined) orderUp = true
    const mediasByPhotographerId = await bdd.getMediasByPhotographerId(_id)
    const byPop = (a, b) => a.likes - b.likes
    const byTitle = (a, b) => a.title.localeCompare(b.title)
    const byDate = (a, b) => new Date(a.date) - new Date(b.date)
    switch (sortCriteria) {
      case 'likes':
        mediasByPhotographerId.sort(byPop)
        break
      case 'date':
        mediasByPhotographerId.sort(byDate)
        break
      case 'title':
        mediasByPhotographerId.sort(byTitle)
        break
      default:
        mediasByPhotographerId.sort(byPop)
    }

    if (!orderUp) {
      mediasByPhotographerId.reverse()
    }
    let nbLikes = 0
    const eventLike = []
    const nbLike = []
    // console.log('displayMedias - photographe:')
    // console.log(photographe)
    mediasByPhotographerId.forEach((media, idx) => {
      // console.log(media)
      const firstName = photographe.name.substring(photographe.name.lastIndexOf(' '), 0).replace('-', ' ')
      media.photographFirstname = firstName
      media.idx = idx
      const mediaModel = factoryMedias.create(media, sortCriteria, orderUp)
      const mediaCardDOM = mediaModel.getMediasDOM()
      modalLinker.mainZone.appendChild(mediasSection)
      mediasSection.appendChild(mediaCardDOM)
      nbLikes += mediaModel.likes
      eventLike[idx] = document.getElementById(`like_${idx}`)

      nbLike[idx] = document.getElementById(`like_nb_${idx}`)
      eventLike[idx].addEventListener('click', async () => {
        if (media.likes === parseInt(nbLike[idx].textContent)) {
          nbLike[idx].textContent = media.likes + 1
          nbLikes++
        } else {
          nbLike[idx].textContent -= 1
          nbLikes--
        }
        photographe.nbLikes = nbLikes
        await displayTotalLikes(photographe)
      })
      eventLike[idx].parentElement.addEventListener('keyup', async (e) => {
        if (e.key === 'Enter') {
          if (media.likes === parseInt(nbLike[idx].textContent)) {
            nbLike[idx].textContent = media.likes + 1
            nbLikes++
          } else {
            nbLike[idx].textContent -= 1
            nbLikes--
          }
        }
        photographe.nbLikes = nbLikes
        await displayTotalLikes(photographe)
      })
    })
    const firstImage = mediasSection.querySelector('a')
    const sortPop = document.getElementById('sort-pop')
    const sortTitle = document.getElementById('sort-title')
    const sortDate = document.getElementById('sort-date')
    const menuItems = [sortPop, sortTitle, sortDate]
    firstImage.addEventListener('focus', () => { closeSortMenu(menuItems) })

    return nbLikes
  }

  /**
   * Create the drop down menu
   * @param : object 'photographe'
   */
  const createSortMenu = (photographe) => {
    const sortPop = document.getElementById('sort-pop')
    const sortTitle = document.getElementById('sort-title')
    const sortDate = document.getElementById('sort-date')
    const menuItems = [sortPop, sortTitle, sortDate]
    const contactBtn = document.querySelector('.contact_button')
    contactBtn.addEventListener('focus', () => { closeSortMenu(menuItems) })
    menuItems.forEach(menuElement => {
      const aSort = menuElement.querySelector('a')
      menuElement.addEventListener('mouseenter', () => { displaySortMenu(menuItems) })
      aSort.addEventListener('focus', () => { displaySortMenu(menuItems) })
      menuElement.addEventListener('mouseover', () => { displaySortMenu(menuItems) })
      menuElement.addEventListener('mouseout', () => { closeSortMenu(menuItems) })
      menuElement.addEventListener('click', () => { selectSortMenu(photographe, menuItems, menuElement) })
    })
    refreshSortMenu()
  }

  /**
   * Refresh or display the drop down menu according to the previous selection
   */
  const refreshSortMenu = () => {
    const sortPop = document.getElementById('sort-pop')
    const sortTitle = document.getElementById('sort-title')
    const sortDate = document.getElementById('sort-date')
    const menuItems = [sortPop, sortTitle, sortDate]
    sortPop.style.display = 'none'
    sortTitle.style.display = 'none'
    sortDate.style.display = 'none'
    let order = '-up'
    if (!orderUp) {
      order = '-down'
    }
    if (!sortCriteria) {
      sortCriteria = 'likes'
    }
    let selectItem = sortPop
    switch (sortCriteria) {
      case 'likes':
        selectItem = sortPop
        break
      case 'date':
        selectItem = sortDate
        break
      case 'title':
        selectItem = sortTitle
        break
      default:
        selectItem = sortPop
    }

    selectItem.classList.add('checked' + order)
    selectItem.style.display = 'flex'
    if (menuItems.indexOf(selectItem) > 0) {
      menuItems.splice(menuItems.indexOf(selectItem), 1)
      menuItems.unshift(selectItem)
    }

    const selectDOMItem = document.getElementById(selectItem.id)
    const selectDomParent = selectDOMItem.parentElement
    selectDOMItem.remove()
    selectDomParent.prepend(selectDOMItem)
  }

  /**
   * Actions on select of the sort item in the drop down menu
   * @param : object 'photographe'
   * @param : object 'menuItems'
   * @param : object 'selectItem'
   */
  const selectSortMenu = (photographe, menuItems, selectItem) => {
    if (selectItem.classList.contains('checked-up')) {
      orderUp = false
      menuItems.forEach(menuElement => {
        menuElement.classList.remove('checked-up')
        menuElement.classList.remove('checked-down')
      })
      selectItem.classList.add('checked-down')
      if (menuItems.indexOf(selectItem) > 0) {
        menuItems.splice(menuItems.indexOf(selectItem), 1)
        menuItems.unshift(selectItem)
      }
    } else {
      orderUp = true
      menuItems.forEach(menuElement => {
        menuElement.classList.remove('checked-up')
        menuElement.classList.remove('checked-down')
      })
      selectItem.classList.add('checked-up')
      if (menuItems.indexOf(selectItem) > 0) {
        menuItems.splice(menuItems.indexOf(selectItem), 1)
        menuItems.unshift(selectItem)
      }
    }
    const selectDOMItem = document.getElementById(selectItem.id)
    const selectDomParent = selectDOMItem.parentElement
    selectDOMItem.remove()
    selectDomParent.prepend(selectDOMItem)
    closeSortMenu(menuItems)

    switch (selectItem.id) {
      case 'sort-pop':
        sortCriteria = 'likes'
        break
      case 'sort-date':
        sortCriteria = 'date'
        break
      case 'sort-title':
        sortCriteria = 'title'
        break
      default:
        break
    }
    displayMedias(photographe)
  }

  /**
   * Close the drop down menu
   * @param : object 'menuItems'
   */
  const closeSortMenu = (menuItems) => {
    menuItems.forEach(menuElement => {
      if (!(menuElement.classList.contains('checked-up')) && !(menuElement.classList.contains('checked-down'))) {
        menuElement.style.display = 'none'
      }
    })
  }

  /**
   * Display the drop down menu
   * @param : object 'menuItems'
   */
  const displaySortMenu = (menuItems) => {
    menuItems.forEach(menuElement => {
      menuElement.style.display = 'flex'
    })
  }

  /**
   * Display the sticky note with total number of likes and price
   * @param : object 'photograph' generated by 'loadPhotographer'
   */
  const displayTotalLikes = async (photographe) => {
    const totaLikes = document.querySelector('.span-note')
    const nbLikes = photographe.nbLikes
    totaLikes.textContent = nbLikes
  }

  /**
   * Display the lightbox portfolio of the photographer according the datas fetched by loadPhotographer
   * @param : object 'photograph' generated by 'loadPhotographer'
   */
  const displayLightbox = async (photographe, _mediaId) => {
    if (_mediaId) {
      domLinker.header.style.display = 'none'
      domLinker.header.setAttribute('aria-hidden', 'true')
      modalLinker.modal.style.display = 'none'
      modalLinker.modal.setAttribute('aria-hidden', 'true')
      modalLinker.mainZone.style.display = 'none'
      modalLinker.mainZone.setAttribute('aria-hidden', 'true')
      domLinker.footer.style.display = 'none'
      domLinker.footer.setAttribute('aria-hidden', 'true')
      const mediasByPhotographerId = await bdd.getMediasByPhotographerId(photographe.id)
      const byPop = (a, b) => a.likes - b.likes
      const byTitle = (a, b) => a.title.localeCompare(b.title)
      const byDate = (a, b) => new Date(a.date) - new Date(b.date)

      switch (sortCriteria) {
        case 'likes':
          mediasByPhotographerId.sort(byPop)
          break
        case 'date':
          mediasByPhotographerId.sort(byDate)
          break
        case 'title':
          mediasByPhotographerId.sort(byTitle)
          break
        default:
          mediasByPhotographerId.sort(byPop)
      }

      if (!orderUp) {
        mediasByPhotographerId.reverse()
      }
      mediasByPhotographerId.forEach((media, idx) => {
        const firstName = photographe.name.substring(photographe.name.lastIndexOf(' '), 0).replace('-', ' ')
        media.photographFirstname = firstName
        media.idx = idx
        const mediaLbModal = factoryLightbox.create(media)
        const mediaLbCardDOM = mediaLbModal.getLbMediaDOM()
        lightboxLinker.ulWrapper.appendChild(mediaLbCardDOM)
        if (media.id === _mediaId) {
          mediaLbCardDOM.style.display = 'block'
        }
      })

      lightboxLinker.lightbox.style.display = 'block'
      let actualIdx = mediasByPhotographerId.findIndex((f) => f.id === _mediaId)

      lightboxLinker.lightbox.focus()

      document.addEventListener('keyup', eEsc => {
        if ((eEsc.key === 'Escape' || eEsc.key === 'Esc')) {
          closeLightbox()
        }
      })
      lightboxLinker.lbCloseBtn.parentElement.addEventListener('click', () => closeLightbox())
      lightboxLinker.lbLeftArrow.parentElement.addEventListener('click', () => { actualIdx = changeMedia(mediasByPhotographerId, actualIdx, actualIdx - 1) })
      lightboxLinker.lbRightArrow.parentElement.addEventListener('click', () => { actualIdx = changeMedia(mediasByPhotographerId, actualIdx, actualIdx + 1) })
      document.addEventListener('keyup', eLeft => {
        if (eLeft.key === 'ArrowLeft' || eLeft.key === 'ArrowUp') {
          actualIdx = changeMedia(mediasByPhotographerId, actualIdx, actualIdx - 1)
        }
      })
      document.addEventListener('keyup', eRight => {
        if (eRight.key === 'ArrowRight' || eRight.key === 'ArrowDown') {
          actualIdx = changeMedia(mediasByPhotographerId, actualIdx, actualIdx + 1)
        }
      })
    }
  }

  /**
   * Change the media in the lightbox
   * @param : object 'mediasByPhotographerId'
   * @param : index of the actual media
   * @param : index of the media to display
   */
  const changeMedia = (mediasByPhotographerId, actualIdx, nextIdx) => {
    const url = new URL(window.location.href)

    if (nextIdx < 0) {
      nextIdx = mediasByPhotographerId.length - 1
    } else if (nextIdx > mediasByPhotographerId.length - 1) {
      nextIdx = 0
    }

    url.searchParams.set('mediaId', mediasByPhotographerId[nextIdx].id)
    window.history.pushState('', document.title, url)
    const actualMedia = document.getElementById(actualIdx)
    const nextMedia = document.getElementById(nextIdx)
    actualMedia.style.display = ''
    nextMedia.style.display = 'block'

    return nextIdx
  }

  /**
   * Close the lightbox
   */
  const closeLightbox = () => {
    const url = new URL(window.location.href)
    url.searchParams.delete('mediaId')
    window.history.pushState('', document.title, url)
    const modal = modalLinker.modal
    domLinker.header.style.display = ''
    modal.style.display = ''
    modalLinker.mainZone.style.display = ''
    domLinker.footer.style.display = ''
    lightboxLinker.lightbox.style.display = 'none'
  }

  /**
   * set modal events
   * @param : object 'photographe'
   */
  const setModalEvents = (photographe) => {
    // catch and test inputs in the form
    modalLinker.formBtn.addEventListener('click', () => displayModal(photographe.name))
    modalLinker.closeBtn.addEventListener('click', () => closeModal())
    modalLinker.firstName.addEventListener('input', function () {
      checker.firstNameValid = checkTextField(modalLinker.firstName, regExName)
      errorDisplayHandler(modalLinker.firstName, checker.firstNameValid, modalLinker.errorFirstName, errMsg.errorFirstNameTxt)
    })
    modalLinker.lastName.addEventListener('input', function () {
      checker.lastNameValid = checkTextField(modalLinker.lastName, regExName)
      errorDisplayHandler(modalLinker.lastName, checker.lastNameValid, modalLinker.errorLastName, errMsg.errorLastNameTxt)
    })
    modalLinker.email.addEventListener('input', function () {
      checker.emailValid = checkTextField(modalLinker.email, regExEmail)
      errorDisplayHandler(modalLinker.email, checker.emailValid, modalLinker.errorEmail, errMsg.errorEmailTxt)
    })
    modalLinker.message.addEventListener('input', function () {
      checker.messageValid = checkTextField(modalLinker.message, regExMessage)
      errorDisplayHandler(modalLinker.message, checker.messageValid, modalLinker.errorMessage, errMsg.errorMessageTxt)
    })
    // Catch submit button an process last control of the input before submitting the form
    modalLinker.fullForm.addEventListener('submit', (event) => {
      event.preventDefault()
      if (checkFormValid(checker.formValid, checker.firstNameValid, checker.lastNameValid, checker.emailValid, checker.messageValid)) {
        console.log('Soumission du formulaire')
        console.log('Firstname : ' + modalLinker.firstName.value)
        console.log('Lastname : ' + modalLinker.lastName.value)
        console.log('Email : ' + modalLinker.email.value)
        console.log('Message : ' + modalLinker.message.value)
        modalLinker.firstName.value = modalLinker.lastName.value = modalLinker.email.value = modalLinker.message.value = ''
        closeModal()
        // modalLinker.fullForm.submit()
      } else {
        console.log("Formulaire invalide. Abandon et messages d'erreurs")

        if (!checker.firstNameValid) errorDisplayHandler(modalLinker.firstName, checker.firstNameValid, modalLinker.errorFirstName, errMsg.errorFirstNameTxt)
        if (!checker.lastNameValid) errorDisplayHandler(modalLinker.lastName, checker.lastNameValid, modalLinker.errorLastName, errMsg.errorLastNameTxt)
        if (!checker.emailValid) errorDisplayHandler(modalLinker.email, checker.emailValid, modalLinker.errorEmail, errMsg.errorEmailTxt)
        if (!checker.messageValid) errorDisplayHandler(modalLinker.message, checker.messageValid, modalLinker.errorMessage, errMsg.errorMessageTxt)
      }
    })
  }

  /**
   * Initialize the page
   * Loads and displays the datas and set the events catchers
   */
  const init = async () => {
    const photographe = await loadPhotographer()
    createSortMenu(photographe)
    if (_mediaId) {
      await displayLightbox(photographe, _mediaId)
    }
    await displayPhotographer(photographe)
    await displayTotalLikes(photographe)
    setModalEvents(photographe)
  }

  init()
}

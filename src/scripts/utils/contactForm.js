const { modalLinker } = require('../utils/linker')

const checker = {
  lastNameValid: false,
  firstNameValid: false,
  emailValid: false,
  messageValid: false,
  formValid: false
}

/**
   * Display the contact form as a modal window
   * @param : name fo the photographer
   */
const displayModal = (name) => {
  modalLinker.modalHeader.innerHTML = 'Contactez-moi<br>' + name
  modalLinker.modal.style.display = 'block'
  modalLinker.mainZone.setAttribute('aria-hidden', true)
  modalLinker.modal.setAttribute('aria-hidden', false)
  modalLinker.firstName.focus()
  // Catch the escape key to close modal
  document.addEventListener('keydown', e => {
    if (modalLinker.modal.getAttribute('aria-hidden') === 'false' && (e.key === 'Escape' || e.key === 'Esc')) {
      closeModal()
    }
  })
}

/**
   * Close the contact form
   */
const closeModal = () => {
  modalLinker.modal.style.display = 'none'
  modalLinker.mainZone.removeAttribute('aria-hidden')
  modalLinker.modal.setAttribute('aria-hidden', true)
}

/**
 * Check if the input is valid according to the regexp - Returns boolean
 * @param {DOMElement} inputField - the input field to test
 * @param {RegEpx String} regExPattern - wether the input field is valid or not (so, display the error message or not)
 */
const checkTextField = (inputfield, regExPattern) => {
  let fieldTest = false
  if ((inputfield.value !== '')) {
    fieldTest = regExPattern.test(inputfield.value)
  }
  return fieldTest
}

/**
 * Display error message when field completion is invalid and then determine if the entire form is valid or not
 * @param {DOMElement} inputField - the input field related by the error
 * @param {Boolean} inputValid - wether the input field is valid or not (so, display the error message or not)
 * @param {DOMElement} errorField - the DOM element where to display the error message
 * @param {String} textMessage - the error message to display
 */
const errorDisplayHandler = (inputField, inputValid, errorfield, textMessage) => {
  errorfield.innerHTML = ''
  errorfield.className = ''
  if (inputField.classList.contains('invalid')) {
    inputField.classList.remove('invalid')
  }
  inputField.className += ' valid'
  if (!inputValid) {
    errorfield.innerHTML = textMessage
    errorfield.className = 'formData error active'
    inputField.className += ' invalid'
    inputField.classList.remove('valid')
  }
  checkFormValid()
}

const checkFormValid = () => {
  if (checker.firstNameValid && checker.lastNameValid && checker.emailValid && checker.messageValid) {
    checker.formValid = true
  } else {
    checker.formValid = false
  }
  return checker.formValid
}

module.exports = { checkFormValid, errorDisplayHandler, checkTextField, closeModal, displayModal, checker }

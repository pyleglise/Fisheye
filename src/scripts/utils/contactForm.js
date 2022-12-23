const contactForm = module.exports = {
  /**
   * Define the DOM elements we need to handle the contact form
   */
  modalLinker: {
    formBtn: document.querySelector('.contact_button'),
    closeBtn: document.querySelector('.close-btn'),
    modalHeader: document.querySelector('div.modal header h2'),
    modal: document.querySelector('#contact_modal'),
    fullForm: document.getElementById('contactForm'),
    firstName: document.querySelector('#firstname'),
    lastName: document.querySelector('#lastname'),
    email: document.querySelector('#email'),
    message: document.querySelector('#message'),
    errorFirstName: document.getElementById('errorFirstName'),
    errorLastName: document.getElementById('errorLastName'),
    errorEmail: document.getElementById('errorEmail'),
    errorMessage: document.getElementById('errorMessage')
  },

  /**
   * Display the contact form as a modal window
   * @param : name fo the photographer
   */
  displayModal: (name) => {
    contactForm.modalLinker.modalHeader.innerHTML = 'Contactez-moi<br>' + name
    contactForm.modalLinker.modal.style.display = 'block'
  },

  /**
   * Close the contact form
   */
  closeModal: () => {
    contactForm.modalLinker.modal.style.display = 'none'
  },

  /**
 * Check if the input is valid according to the regexp - Returns boolean
 * @param {DOMElement} inputField - the input field to test
 * @param {RegEpx String} regExPattern - wether the input field is valid or not (so, display the error message or not)
 */
  checkTextField: (inputfield, regExPattern) => {
    let fieldTest = false
    if ((inputfield.value !== '')) {
      fieldTest = regExPattern.test(inputfield.value)
    }
    return fieldTest
  },

  /**
 * Display error message when field completion is invalid and then determine if the entire form is valid or not
 * @param {DOMElement} inputField - the input field related by the error
 * @param {Boolean} inputValid - wether the input field is valid or not (so, display the error message or not)
 * @param {DOMElement} errorField - the DOM element where to display the error message
 * @param {String} textMessage - the error message to display
 */
  errorDisplayHandler: (inputField, inputValid, errorfield, textMessage) => {
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
    contactForm.checkFormValid()
  },

  checkFormValid: () => {
    console.log('Contrôle du formulaire')
    if (firstNameValid && lastNameValid && emailValid && messageValid) {
      formValid = true
      console.log('Formulaire OK !')
      // domLinker.submitBtn.classList += ' btn-valid'
    } else {
      formValid = false
      // if (domLinker.submitBtn.classList.contains('btn-valid')) {
      //   domLinker.submitBtn.classList.remove('btn-valid')
      // }
    }
    console.log('formValid : ' + formValid)
    return formValid
  }

}

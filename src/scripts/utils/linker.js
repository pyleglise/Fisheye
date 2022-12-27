/**
 * Define the general DOM elements we need
 */
const domLinker = {
  header: document.querySelector('header'),
  footer: document.querySelector('footer')
}

/**
 * Define the DOM elements we need to handle the contact form
 */
const modalLinker = {
  mainZone: document.getElementById('main'),
  formBtn: document.querySelector('.contact_button'),
  closeBtn: document.querySelector('.close-btn'),
  modalHeader: document.querySelector('div.modal header h2'),
  modal: document.getElementById('contact_modal'),
  fullForm: document.getElementById('contactForm'),
  firstName: document.getElementById('firstname'),
  lastName: document.getElementById('lastname'),
  email: document.getElementById('email'),
  message: document.getElementById('message'),
  errorFirstName: document.getElementById('errorFirstName'),
  errorLastName: document.getElementById('errorLastName'),
  errorEmail: document.getElementById('errorEmail'),
  errorMessage: document.getElementById('errorMessage')
}

module.exports = { modalLinker, domLinker }

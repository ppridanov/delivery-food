const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
  modal.classList.toggle("is-open");
}

//DAY 1

//Переменные
const authButton = document.querySelector('.button-auth');
const authModal = document.querySelector('.modal-auth');
const closeAuthModal = document.querySelector('.close-auth');
const loginForm = document.querySelector('#logInForm')
const loginInput = document.querySelector('#login');
const userName = document.querySelector('.user-name');
const logOutButton = document.querySelector('.button-out');

let login = '';

//Функции
function toggleAuthModal() {
  authModal.classList.toggle('is-open');
}

function authorized() {
  function logOut() {
    login = '';
    authButton.style.display = '';
    logOutButton.style.display = '';
    userName.style.display = '';
    logOutButton.removeEventListener('click', logOut);
    checkAuth();
  }

  console.log('You authorized user');

  userName.textContent = login;

  authButton.style.display = 'none';
  logOutButton.style.display = 'block';
  userName.style.display = 'block';

  logOutButton.addEventListener('click', logOut);
}


function notAuthorized() {
  console.log('You not authorized user');

  function logIn(event) {
    event.preventDefault();
    login = loginInput.value;
    authButton.removeEventListener('click', toggleAuthModal);
    closeAuthModal.removeEventListener('click', toggleAuthModal);
    loginForm.removeEventListener('submit', logIn);
    toggleAuthModal();
    loginForm.reset();
    checkAuth();
  }


  authButton.addEventListener('click', toggleAuthModal);
  closeAuthModal.addEventListener('click', toggleAuthModal);
  loginForm.addEventListener('submit', logIn);
}

function checkAuth() {
  if (login) {
    authorized();
  } else {
    notAuthorized();
  }
}

checkAuth();

//События



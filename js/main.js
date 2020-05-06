'use strict';

//Переменные

//Кнопки и модальные окна
const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
const authButton = document.querySelector('.button-auth');
const authModal = document.querySelector('.modal-auth');
const closeAuthModal = document.querySelector('.close-auth');
const loginForm = document.querySelector('#logInForm')
const loginInput = document.querySelector('#login');
const passInput = document.querySelector('#password');
const userName = document.querySelector('.user-name');
const logOutButton = document.querySelector('.button-out');

//Карточки ресторанов и карточки товаров
const cardsRestaurants = document.querySelector('.cards-restaurants');
const containerPromo = document.querySelector('.container-promo');
const restaurants = document.querySelector('.restaurants');
const menu = document.querySelector('.menu');
const logo = document.querySelector('.logo');
const cardsMenu = document.querySelector('.cards-menu');

let login = localStorage.getItem('deliveryLogin');

//Функции
function toggleModal() {
  modal.classList.toggle("is-open");
}

function toggleAuthModal() {
  authModal.classList.toggle('is-open');
}

function authorized() {
  function logOut() {
    login = null;
    authButton.style.display = '';
    logOutButton.style.display = '';
    userName.style.display = '';
    logOutButton.removeEventListener('click', logOut);
    localStorage.removeItem('deliveryLogin');
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


  function logIn() {
    login = loginInput.value;

    localStorage.setItem('deliveryLogin', login);

    authButton.removeEventListener('click', toggleAuthModal);
    closeAuthModal.removeEventListener('click', toggleAuthModal);
    loginForm.removeEventListener('submit', logIn);
    toggleAuthModal();
    loginForm.reset();
    checkAuth();
  }

  function checkValidity() {
    console.log(loginInput.value.length);
    if (loginInput.value.length < 2 || loginInput.value.length > 30) {
      alert('Введите логин');
    } else if (passInput.value.length < 6) {
      alert('Введите пароль');
    } else {
      logIn();
    }
  }

  authButton.addEventListener('click', toggleAuthModal);
  closeAuthModal.addEventListener('click', toggleAuthModal);
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    checkValidity();
  });
}

function checkAuth() {
  if (login) {
    authorized();
  } else {
    notAuthorized();
  }
}

function createCardsRestaraunt() {
  const cardTemplate = `
    <a href="restaurant.html" class="card card-restaurant">
      <img src="img/pizza-plus/preview.jpg" alt="image" class="card-image"/>
      <div class="card-text">
        <div class="card-heading">
          <h3 class="card-title">Пицца плюс</h3>
          <span class="card-tag tag">50 мин</span>
        </div>
        <div class="card-info">
          <div class="rating">
            4.5
          </div>
          <div class="price">От 900 ₽</div>
          <div class="category">Пицца</div>
        </div>
      </div>
    </a>
  `;

  cardsRestaurants.insertAdjacentHTML('beforeend', cardTemplate);
}

function createCardGood() {
  const card = document.createElement('div');
  card.className = 'card';

  card.insertAdjacentHTML('beforeend', `
  <img src="img/pizza-plus/pizza-vesuvius.jpg" alt="image" class="card-image"/>
  <div class="card-text">
    <div class="card-heading">
      <h3 class="card-title card-title-reg">Пицца Везувий</h3>
    </div>
    <div class="card-info">
      <div class="ingredients">Соус томатный, сыр «Моцарелла», ветчина, пепперони, перец
        «Халапенье», соус «Тобаско», томаты.
      </div>
    </div>
    <div class="card-buttons">
      <button class="button button-primary button-add-cart">
        <span class="button-card-text">В корзину</span>
        <span class="button-cart-svg"></span>
      </button>
      <strong class="card-price-bold">545 ₽</strong>
    </div>
  </div>
  `);
  cardsMenu.insertAdjacentElement('beforeend', card);
}

function openGoods(event) {
  event.preventDefault();
  const target = event.target;
  const restaurant = target.closest('.card-restaurant');

  if (login) {
    if (restaurant) {
      cardsMenu.textContent = '';
      containerPromo.classList.add('hide');
      restaurants.classList.add('hide');
      menu.classList.remove('hide');

      createCardGood();
      createCardGood();
      createCardGood();
    }
  } else {
    toggleAuthModal();
  }


}

checkAuth();
createCardsRestaraunt();

//События
cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

cardsRestaurants.addEventListener('click', openGoods);
logo.addEventListener('click', () => {
  containerPromo.classList.remove('hide');
  restaurants.classList.remove('hide');
  menu.classList.add('hide');
})
//day2





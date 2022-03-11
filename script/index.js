import {init, renderCards, getData} from './card.js';
// Выпадающие списки

const optionBtnOrder = document.querySelector('.option__btn_order');
const optionBtnPeriod = document.querySelector('.option__btn_period');
const optionListOrder = document.querySelector('.option__list_order');
const optionListPeriod = document.querySelector('.option__list_period');

optionBtnOrder.addEventListener('click', () => {
  optionListOrder.classList.toggle('option__list_active');
  optionListPeriod.classList.remove('option__list_active');
});

optionBtnPeriod.addEventListener('click', () => {
  optionListPeriod.classList.toggle('option__list_active');
  optionListOrder.classList.remove('option__list_active');
});

optionListOrder.addEventListener('click', (e) => {
  const target = e.target;

  if (target.classList.contains('option__item')) {
    optionBtnOrder.textContent = target.textContent;
    optionListOrder.classList.remove('option__list_active');
    for (const elem of optionListOrder.querySelectorAll('.option__item')) {
      if (elem === target) {
        elem.classList.add('option__item_active');
      } else {
        elem.classList.remove('option__item_active');
      }
    }
  }
});

optionListPeriod.addEventListener('click', (e) => {
  const target = e.target;

  if (target.classList.contains('option__item')) {
    optionBtnPeriod.textContent = target.textContent;
    optionListPeriod.classList.remove('option__list_active');
    for (const elem of optionListPeriod.querySelectorAll('.option__item')) {
      if (elem === target) {
        elem.classList.add('option__item_active');
      } else {
        elem.classList.remove('option__item_active');
      }
    }
  }
});

// Выбор города

const topCityBtn = document.querySelector('.top__city');
const city = document.querySelector('.city');
const cityClose = document.querySelector('.city__close');
const cityRegionList = document.querySelector('.city__region-list');

city.addEventListener('click', (e) => {
  if (e.target === cityClose) {
    city.classList.remove('city_active');
  }
});

topCityBtn.addEventListener('click', () => {
  city.classList.toggle('city_active');
});

cityRegionList.addEventListener('click', (e) => {
  const target = e.target;

  if (target.classList.contains('city__link')) {
    topCityBtn.textContent = target.textContent;
    city.classList.remove('city_active');
  }
});

// Модальное окно

const overlayVacancy = document.querySelector('.overlay_vacancy');
const resultList = document.querySelector('.result__list');

resultList.addEventListener('click', (e) => {
  const target = e.target;
  if (target.dataset.vacancy) {
    e.preventDefault();
    overlayVacancy.classList.add('overlay_active');
  }
});

overlayVacancy.addEventListener('click', (e) => {
  if (e.target === overlayVacancy || target.classList.contains('modal__close'))
    overlayVacancy.classList.remove('overlay_active');
});

const formSearch = document.querySelector('.bottom__search');

formSearch.addEventListener('submit', async (e) => {
  e.preventDefault();
  const textSearch = formSearch.search.value;

  if (textSearch.length > 2) {
    formSearch.search.style.borderColor = '';

    const data = await getData({search: textSearch});
    renderCards(data);
    formSearch.reset();
  } else {
    formSearch.search.style.borderColor = 'red';
    setTimeout(() => {
      formSearch.search.style.borderColor = '';
    }, 2000);
  }
});

init();

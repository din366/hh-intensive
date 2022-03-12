import {renderCards} from './card.js';
// Выпадающие списки

const optionBtnOrder = document.querySelector('.option__btn_order');
const optionBtnPeriod = document.querySelector('.option__btn_period');
const optionListOrder = document.querySelector('.option__list_order');
const optionListPeriod = document.querySelector('.option__list_period');

const topCityBtn = document.querySelector('.top__city');
const city = document.querySelector('.city');
const cityClose = document.querySelector('.city__close');
const cityRegionList = document.querySelector('.city__region-list');

const overlayVacancy = document.querySelector('.overlay_vacancy');
const resultList = document.querySelector('.result__list');

const formSearch = document.querySelector('.bottom__search');
const found = document.querySelector('.found');

export const orderBy = document.querySelector('#order_by');
export const searchPeriod = document.querySelector('#search_period');

export let data = [];

export const getData = ({search, id, country, city} = {}) => {
  let url = `http://localhost:3000/api/vacancy/${id ? id : ''}`;
  if (search) {
    url = `http://localhost:3000/api/vacancy?search=${search}`;
  }

  if (city) {
    url = `http://localhost:3000/api/vacancy?city=${city}`;
  }

  if (country) {
    url = `http://localhost:3000/api/vacancy?country=${country}`;
  }

  return fetch(url).then(
    (response) => response.json(),
  );
};

const declOfNum = (n, titles) => {
  return (
    n +
    ' ' +
    titles[
      n % 10 === 1 && n % 100 !== 11
        ? 0
        : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
        ? 1
        : 2
    ]
  );
};

export const sortData = () => {
  switch (orderBy.value) {
    case 'down':
      data.sort((a, b) => a.minCompensation > b.minCompensation ? 1 : -1);
      break;
    case 'up':
      data.sort((a, b) => b.minCompensation > a.minCompensation ? 1 : -1);
      break;
    default:
      data.sort((a, b) => new Date(a.date).getTime() > new Date(b.date).getTime() ? 1 : -1)
  }
}

const filterData = () => {
  const date = new Date();
  date.setDate(date.getDate() - searchPeriod.value);
  return data.filter(item => new Date(item.date).getTime() > date);
}

export const optionHandler = () => {
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
      orderBy.value = target.dataset.sort;
      sortData();
      renderCards(data);
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
      searchPeriod.value = target.dataset.date;
      const tempData = filterData();
      renderCards(tempData)
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
};

export const cityHandler = () => {
  // Выбор города
  city.addEventListener('click', (e) => {
    if (e.target === cityClose) {
      city.classList.remove('city_active');
    }
  });

  topCityBtn.addEventListener('click', () => {
    city.classList.toggle('city_active');
  });

  cityRegionList.addEventListener('click', async (e) => {
    const target = e.target;

    if (target.classList.contains('city__link')) {
      const hash = new URL(target.href).hash.substring(1);
      const option = {
        [hash]: target.textContent,
      }
      data = await getData(option);
      sortData();
      renderCards(data);

      topCityBtn.textContent = target.textContent;
      city.classList.remove('city_active');
    }
  });
};

const createModal = (data) => {
  const {
    address,
    compensation,
    description,
    employer,
    employment,
    experiens,
    skills,
    title,
  } = data;

  const modal = document.createElement('div');
  modal.classList.add('modal');

  const closeButtonElem = document.createElement('button');
  closeButtonElem.classList.add('modal__close');
  closeButtonElem.textContent = '✕';

  const titleElem = document.createElement('h2');
  titleElem.classList.add('modal__title');
  titleElem.textContent = title;

  const compensationElem = document.createElement('p');
  compensationElem.classList.add('modal__compensation');
  compensationElem.textContent = compensation;

  const employerElem = document.createElement('p');
  employerElem.classList.add('modal__employer');
  employerElem.textContent = employer;

  const addressElem = document.createElement('p');
  addressElem.classList.add('modal__address');
  addressElem.textContent = address;

  const experienceElem = document.createElement('p');
  experienceElem.classList.add('modal__experience');
  experienceElem.textContent = experiens;

  const employmentElem = document.createElement('p');
  employmentElem.classList.add('modal__employment');
  employerElem.textContent = employer;

  const descriptionElem = document.createElement('p');
  descriptionElem.classList.add('modal__description');
  descriptionElem.textContent = description;

  const skillsElem = document.createElement('div');
  skillsElem.classList.add('modal__skills', 'skills');

  const skillsTitleElem = document.createElement('h3');
  skillsTitleElem.classList.add('skills__title');
  skillsTitleElem.textContent = 'Подробнее:';

  const skillsListElem = document.createElement('ul');
  skillsListElem.classList.add('skills__list');

  for (const skill of skills) {
    const skillsItemElem = document.createElement('li');
    skillsItemElem.classList.add('skills__item');
    skillsItemElem.textContent = skill;
    skillsListElem.append(skillsItemElem);
  }

  skillsElem.append(skillsTitleElem, skillsListElem);

  const submitButtonElem = document.createElement('button');
  submitButtonElem.classList.add('modal__response');
  submitButtonElem.textContent = 'Отправить резюме';

  modal.append(
    closeButtonElem,
    titleElem,
    compensationElem,
    employerElem,
    addressElem,
    experienceElem,
    employmentElem,
    descriptionElem,
    skillsElem,
    submitButtonElem,
  );

  return modal;
};

export const modalHandler = () => {
  let modal = null;
  resultList.addEventListener('click', async (e) => {
    const target = e.target;
    if (target.dataset.vacancy) {
      e.preventDefault();
      overlayVacancy.classList.add('overlay_active');
      const data = await getData({id: target.dataset.vacancy});
      modal = createModal(data);
      overlayVacancy.append(modal);
    }
  });

  overlayVacancy.addEventListener('click', (e) => {
    if (
      e.target === overlayVacancy ||
      target.classList.contains('modal__close')
    )
      overlayVacancy.classList.remove('overlay_active');
    modal.remove();
  });
};

export const searchHandler = () => {
  formSearch.addEventListener('submit', async (e) => {
    e.preventDefault();
    const textSearch = formSearch.search.value;

    if (textSearch.length > 2) {
      formSearch.search.style.borderColor = '';

      data = await getData({search: textSearch});
      sortData();
      renderCards(data);
      found.innerHTML = `${declOfNum(data.length, [
        'вакансия',
        'вакансии',
        'вакансий',
      ])} &laquo;${textSearch}&raquo;`;
      formSearch.reset();
    } else {
      formSearch.search.style.borderColor = 'red';
      setTimeout(() => {
        formSearch.search.style.borderColor = '';
      }, 2000);
    }
  });
};


export const init = async () => {
data = await getData();
sortData();
data = filterData();
renderCards(data);

optionHandler();
cityHandler();
modalHandler();
searchHandler();
};

init();

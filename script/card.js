export const getData = ({search, id} = {}) => {
  if (search) {
    return fetch(`http://localhost:3000/api/vacancy?search=${search}`).then(
      (response) => response.json(),
    );
  }
  return fetch(`http://localhost:3000/api/vacancy/${id ? id : ''}`).then(
    (response) => response.json(),
  );
};

const createCard = (vacancy) => {
  const {
    title,
    id,
    compensation,
    workSchedule,
    employer,
    address,
    description,
    date,
  } = vacancy;

  const card = document.createElement('li');
  card.classList.add('result__item');

  card.insertAdjacentHTML(
    'afterbegin',
    `<article class="vacancy">
        <h2 class="vacancy__title">
          <a class="vacancy__open-modal" href="#" data-vacancy="${id}">${title}</a>
        </h2>
        <p class="vacancy__compensation">${compensation}</p>
        <p class="vacancy__work-schedule">${workSchedule}</p>
        <div class="vacancy__employer">
          <p class="vacancy__employer-title">${employer}</p>
          <p class="vacancy__employer-address">${address}</p>
        </div>
        <p class="vacancy__description">${description}</p>

        <p class="vacancy__date">
          <time datetime="${date}">${date}</time>
        </p>
        <div class="vacancy__wrapper-btn">
          <a class="vacancy__response vacancy__open-modal" href="#" data-vacancy="${id}">Откликнуться</a>
          <button class="vacancy__contacts">Показать контакты</button>
        </div>
      </article>`,
  );
  return card;
};

const resultList = document.querySelector('.result__list');

export const renderCards = (data) => {
  resultList.textContent = '';

  const cards = data.map(createCard);
  resultList.append(...cards);
};

export const init = async () => {
  const data = await getData();
  renderCards(data);
};

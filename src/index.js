import './css/styles.css';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

console.dir('_lodash');

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('input');
console.dir(inputEl);

const listEl = document.querySelector('.country-list');
console.log(listEl);

const infoEl = document.querySelector('.country-info');
console.log(infoEl);

const base_url = 'https://restcountries.com/v2/';

function onInputCountry(event) {
  console.log(event);

  fetch(
    `${base_url}name/${event.target.value.trim()}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .then(
      data => {
        console.log(data);
        if (data.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
          console.log('Mach of country');
        } else if (data.length > 1) {
          const markup = data
            .map(
              item => `<li><img src="${item.flags.png}" alt="${item.name}"/><h2>${item.name}</h2>
          </li>`
            )
            .join('');
          listEl.innerHTML = markup;
          infoEl.innerHTML = '';
          console.log('No1');
        } else if (data.length === 1) {
          const markupAll = data
            .map(
              itemAll => `<div><h2>${itemAll.name}</h2>
          <img src="${itemAll.flags.png}" alt="${itemAll.name}"/>
          <p><b>Capital:</b> ${itemAll.capital}</p>
          <p><b>Population:</b> ${itemAll.population}</p>
          <p><b>Language:</b> ${itemAll.languages[0].name}</p>
          </div>`
            )
            .join('');
          infoEl.innerHTML = markupAll;
          listEl.innerHTML = '';

          console.log(1);
        }
      }
      // console.log(data);
      // renderCountry(data);
    )
    .catch(err =>
      Notiflix.Notify.failure('Oops, there is no country with that name')
    );
}

// function onInputCountry(event) {
//   console.log(inputEl.value);
// }

inputEl.addEventListener('input', onInputCountry);

function renderCountry(data) {
  data.map(item => ``);
}

// fetchCountries(country){
//   fetch("https://restcountries.com/v2/all?fields=name,capital,population,flags,languages"){
//    if(!)
//   }
// };

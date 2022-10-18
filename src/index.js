import './css/styles.css';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
var _ = require('lodash');
import * as myModule from './fetchCountries';

console.dir('_lodash');

const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('input');
const listEl = document.querySelector('.country-list');
const infoEl = document.querySelector('.country-info');

export function createList(data) {
  const markup = data
    .map(
      item => `<li><img src="${item.flags.png}" alt="${item.name}"/><h2>${item.name}</h2>
          </li>`
    )
    .join('');
  listEl.innerHTML = markup;
  infoEl.innerHTML = '';
}

export function createInfo(data) {
  const markupAll = data
    .map(
      itemAll =>
        `<div><h2>${itemAll.name}</h2>            
          <img src="${itemAll.flags.png}" alt="${itemAll.name}"/>
          <p><b>Capital:</b> ${itemAll.capital}</p>
          <p><b>Population:</b> ${itemAll.population}</p>
          <p><b>Language:</b> ${itemAll.languages}</p>
          </div>`
    )
    .join('');
  infoEl.innerHTML = markupAll;
  listEl.innerHTML = '';
}

const debounceInput = _.debounce(myModule.onInputCountry, DEBOUNCE_DELAY);

inputEl.addEventListener('input', debounceInput);

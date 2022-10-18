import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
var _ = require('lodash');
import * as myModules from './index';

console.dir('_lodash');

const inputEl = document.querySelector('input');
const listEl = document.querySelector('.country-list');
const infoEl = document.querySelector('.country-info');

const base_url = 'https://restcountries.com/v2/';

export function onInputCountry(event) {
  if (event.data === ' ' || event.data === null) {
    event.target.value = '';
    infoEl.innerHTML = '';
    listEl.innerHTML = '';
  } else
    fetch(
      `${base_url}name/${event.target.value.trim()}?fields=name,capital,population,flags,languages`
    )
      .then(response => {
        if (!response.ok) {
          throw new Error();
        }
        return response.json();
      })
      .then(data => {
        if (data.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (data.length > 1) {
          myModules.createList(data);
        } else if (data.length === 1) {
          myModules.createInfo(data);
        }
      })
      .catch(err =>
        Notiflix.Notify.failure('Oops, there is no country with that name')
      );
}

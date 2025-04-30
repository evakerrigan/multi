import { counterStateSettings } from '../state/stateSettings';
import {
  // getLanguageFromLocalStorage,
  setLanguageInLocalStorage
} from './localStorage';

export function languageSwitcher(lang) {
  // const currentLanguage = getLanguageFromLocalStorage();
  // console.log('currentLanguage: ', currentLanguage);



  console.log('ИЗМЕНЕНИЕ ЯЗЫКА');
  const languageSelect = document.getElementById('language-select');
  // if (currentLanguage == 'ru') {
  //   setLanguageInLocalStorage('en');
  //   updateTranslations('en');
  // } else {
  //   setLanguageInLocalStorage('ru');
  //   updateTranslations('ru');
  // }
  if (lang == 'ru') {
    setLanguageInLocalStorage('en');
    counterStateSettings.setLanguage('en');
    updateTranslations('en');
  } else {
    setLanguageInLocalStorage('ru');
    counterStateSettings.setLanguage('ru');
    updateTranslations('ru');
  }
}

function updateTranslations(newCurrentLanguage) {
  // const title = document.title;
  // const description = document.querySelector(
  //   'meta[name="description"]'
  // ).content;
  // // Обновите переводы для title и description
  // title.textContent = languages[currentLanguage].title;
  // description.textContent = languages[currentLanguage].description;
}

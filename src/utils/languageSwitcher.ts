import {counterStateSettings} from '../state/stateSettings';
import {setLanguageInLocalStorage} from './localStorage';

export function languageSwitcher(lang) {
  console.log('ИЗМЕНЕНИЕ ЯЗЫКА');
  const languageSelect = document.getElementById('language-select');

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

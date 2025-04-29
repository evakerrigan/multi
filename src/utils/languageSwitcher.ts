import {
  getLanguageFromLocalStorage,
  setLanguageInLocalStorage
} from './localStorage';

export function languageSwitcher() {
  const currentLanguage = getLanguageFromLocalStorage();
  console.log('currentLanguage: ', currentLanguage);

  

  console.log('ИЗМЕНЕНИЕ ЯЗЫКА');
  const languageSelect = document.getElementById('language-select');
  if (currentLanguage == 'ru') {
    setLanguageInLocalStorage('en');
    updateTranslations('en');
  } else {
    setLanguageInLocalStorage('ru');
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

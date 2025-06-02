import { languages } from '../language';
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

// const


function updateTranslations(newCurrentLanguage: string) {
  // Обновляем заголовок страницы
  document.title = languages[newCurrentLanguage].title;

  // Обновляем описание страницы
  const descriptionMeta = document.querySelector('meta[name="description"]') as HTMLMetaElement;
  if (descriptionMeta) {
    descriptionMeta.content = languages[newCurrentLanguage].description;
  }
}

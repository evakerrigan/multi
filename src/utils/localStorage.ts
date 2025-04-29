export function setLanguageInLocalStorage(language) {
  localStorage.setItem('currentLanguage', language);
}

export function getLanguageFromLocalStorage() {
  const language = localStorage.getItem('currentLanguage');
  return language ? language : 'ru'; // по умолчанию русский язык
}

export function setLanguageInLocalStorage(language) {
  localStorage.setItem('currentLanguage', language);
}

export function getLanguageFromLocalStorage() {
  const language = localStorage.getItem('currentLanguage');
  return language ? language : 'ru';
}

export function setLevelInLocalStorage(level) {
  localStorage.setItem('currentLevel', level);
}

export function getLevelFromLocalStorage() {
  const level = localStorage.getItem('currentLevel');
  return level ? level : 'soft';
}

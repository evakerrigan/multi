export function setLanguageInLocalStorage(language) {
  localStorage.setItem('currentLanguage', language);
  console.log('в локалсторадж устанавливаем язык: ', language);
}

export function getLanguageFromLocalStorage() {
  const language = localStorage.getItem('currentLanguage');
  return language ? language : 'нету';
}

export function setLevelInLocalStorage(level) {
  localStorage.setItem('currentLevel', level);
}

export function getLevelFromLocalStorage() {
  const level = localStorage.getItem('currentLevel');
  return level ? level : 'soft';
}

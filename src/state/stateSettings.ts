type State = {
  langState: string;
  levelState: string;
};

const stateSettings = new Proxy<State>(
  {
    langState: 'ru',
    levelState: 'soft'
  },
  {
    set(target, property, value) {
      target[property] = value;
      updateUISettings();
      return true;
    }
  }
);

function updateUISettings() {
  const language = document.getElementById('languageButton');
  const level = document.getElementById('levelButton');

  if (language) language.textContent = stateSettings.langState.toString();
  if (level) level.textContent = stateSettings.levelState.toString();
}

export const counterStateSettings = {
  getLanguage: () => stateSettings.langState,
  getLevel: () => stateSettings.levelState,

  setLanguage: (value: string) => {
    console.log('вызываем сетлэнгвич');
    stateSettings.langState = value;
    console.log('смотрим что в стейте: ', counterStateSettings.getLanguage());
  },

  setLevel: (value: string) => {
    stateSettings.levelState = value;
  }
};

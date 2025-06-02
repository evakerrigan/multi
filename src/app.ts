import {selectedNumbersState} from './state/stateControls';
import {answerInput} from './utils/ui';
import {
  checkAnswer as checkAnswerUtil,
  startGame,
  setFirstInputValue
} from './utils/game';
import {
  closeModalSuccess,
  openInstructionModal,
  closeInstructionModal
} from './utils/modal';
import {CustomWindow} from './types';
import {languageSwitcher} from './utils/languageSwitcher';
import {levelSwitcher} from './utils/levelSwitcher';
import {
  getLanguageFromLocalStorage,
  getLevelFromLocalStorage
} from './utils/localStorage';
import {counterStateSettings} from './state/stateSettings';

// Обработчики событий
export function handleListClick(event: MouseEvent): void {
  const target = event.target as HTMLElement;

  const value = parseInt(target.innerText || '0');

  if (target.classList.contains('list-item-selected')) {
    target.classList.remove('list-item-selected');
    selectedNumbersState.removeSelectedNumber(value);
  } else {
    target.classList.add('list-item-selected');
    selectedNumbersState.addSelectedNumber(value);
  }

  // Генерируем новый пример после выбора числа
  setFirstInputValue();
}

// Реэкспорт функции checkAnswer для импорта в HTML
export const checkAnswer = checkAnswerUtil;

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
  // Настройка модальных окон
  const instructionButton = document.getElementById('instructionButton');
  if (instructionButton) {
    instructionButton.addEventListener('click', openInstructionModal);
  }

  const languageButton = document.getElementById('languageButton');
  if (languageButton) {
    const lang = getLanguageFromLocalStorage();
    console.log('lang app: ', lang);
    counterStateSettings.setLanguage(lang);
    languageButton.textContent = counterStateSettings.getLanguage().toString();
    languageButton.addEventListener('click', () =>
      languageSwitcher(counterStateSettings.getLanguage())
    );
  }

  const levelButton = document.getElementById('levelButton');
  if (levelButton) {
    const level = getLevelFromLocalStorage();
    counterStateSettings.setLevel(level);
    levelButton.addEventListener('click', levelSwitcher);
    levelButton.textContent = counterStateSettings.getLevel().toString();
  }

  document.addEventListener('click', (event) => {
    if (event.target instanceof Element) {
      const closeBtn = event.target.closest('.close-instruction');
      if (closeBtn) {
        closeInstructionModal();
      }
    }
  });

  // Обработчик кнопки закрытия модального окна
  const closeModalButton = document.getElementById('closeModalSuccess');
  if (closeModalButton) {
    closeModalButton.addEventListener('click', closeModalSuccess);
  }

  // Обработчик нажатия Enter в поле ответа
  answerInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      checkAnswer();
    }
  });

  // Добавление обработчиков в глобальный объект window для доступа из HTML
  (window as unknown as CustomWindow).checkAnswer = checkAnswer;
  (window as unknown as CustomWindow).handleListClick = handleListClick;

  // Настройка обработчиков для кнопки Старт
  const startButton = document.getElementById('start');
  if (startButton) {
    startButton.addEventListener('click', startGame);
  }
});
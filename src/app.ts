import {addSelectedNumber, removeSelectedNumber} from './utils/state';
// import {answerInput, setupInputAnimation} from './utils/ui';
import {answerInput} from './utils/ui';
import {checkAnswer as checkAnswerUtil, startGame, setFirstInputValue} from './utils/game';
import {
  closeModalSuccess,
  openInstructionModal,
  closeInstructionModal
} from './utils/modal';
import {CustomWindow} from './types';

// Обработчики событий
export function handleListClick(event: MouseEvent): void {
  const target = event.target as HTMLElement;

  const value = parseInt(target.innerText || '0');

  if (target.classList.contains('list-item-selected')) {
    target.classList.remove('list-item-selected');
    removeSelectedNumber(value);
  } else {
    target.classList.add('list-item-selected');
    addSelectedNumber(value);
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

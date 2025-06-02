import {selectedNumbersState} from './utils/state';
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

// Обработчики событий
export function handleListClick(event: MouseEvent): void {
  const target = event.target as HTMLElement;

  const value = parseInt(target.innerText || '0');

  if (target.classList.contains('list-item-selected')) {
    target.classList.remove('list-item-selected');
    selectedNumbersState.removeSelectedNumber(value);
    console.log(
      `Удален номер ${value}. Текущие выбранные:`,
      selectedNumbersState.getSelectedNumbers()
    );
  } else {
    target.classList.add('list-item-selected');
    selectedNumbersState.addSelectedNumber(value);
    console.log(
      `Добавлен номер ${value}. Текущие выбранные:`,
      selectedNumbersState.getSelectedNumbers()
    );
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

  // Подключаем обработчики кликов для элементов списка чисел
  document.querySelectorAll('.footer-list li').forEach((li) => {
    li.addEventListener('click', (event) => {
      handleListClick(event as MouseEvent);
    });
  });

  // Инициализируем состояние текста инструкции (должен мигать в начале)
  // const instructionText = document.getElementById('instruction-text');
  // if (instructionText) {
  //   instructionText.classList.add('instruction-text-blinking');
  // }
});

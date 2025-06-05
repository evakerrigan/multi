import {selectedNumbersState, counterState} from './utils/state';
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

  // Обработчик отправки формы для мобильных устройств
  const answerForm = document.getElementById('answer-form') as HTMLFormElement;
  if (answerForm) {
    answerForm.addEventListener('submit', (event) => {
      event.preventDefault(); 
      event.stopPropagation(); 
      checkAnswer();
    });
  }

  // Обработчик нажатия Enter в поле ответа
  answerInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); 
      event.stopPropagation(); 

      // Небольшая задержка чтобы убедиться что значение стабильно
      setTimeout(() => {
        checkAnswer();
      }, 1);
    }
  });

  // Обработчик изменения поля количества попыток
  const attemptsInput = document.getElementById(
    'attempts-input'
  ) as HTMLInputElement;
  if (attemptsInput) {
    // Обработчик фокуса - очищает поле при клике
    attemptsInput.addEventListener('focus', () => {
      if (attemptsInput.value === '0') {
        attemptsInput.value = '';
      }
    });

    // Обработчик потери фокуса - если поле пустое, возвращаем 0
    attemptsInput.addEventListener('blur', () => {
      if (attemptsInput.value === '') {
        attemptsInput.value = '0';
      }
    });

    attemptsInput.addEventListener('input', () => {
      const value = parseInt(attemptsInput.value) || 0;
      counterState.setAttemptsCount(value);
    });
  }

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
});

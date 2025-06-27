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

// Импортируем функцию для обновления мигания
import {updateInstructionTextState} from './utils/state';

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

// Функция для переключения на мобильный экран игры
function switchToMobileGameScreen(): void {
  const mobileSetupScreen = document.getElementById('mobile-setup-screen');
  const mainGameScreen = document.getElementById('main-game-screen');

  if (mobileSetupScreen && mainGameScreen) {
    mobileSetupScreen.style.display = 'none';
    mainGameScreen.classList.add('mobile-active');
  }
}

// Функция для синхронизации мобильного инпута с основным
function syncMobileAttemptsInput(): void {
  const mobileAttemptsInput = document.getElementById(
    'mobile-attempts-input'
  ) as HTMLInputElement;
  const desktopAttemptsInput = document.getElementById(
    'attempts-input'
  ) as HTMLInputElement;

  if (mobileAttemptsInput && desktopAttemptsInput) {
    const value = parseInt(mobileAttemptsInput.value) || 0;
    desktopAttemptsInput.value = value.toString();
    counterState.setAttemptsCount(value);
  }
}

// Реэкспорт функции checkAnswer для импорта в HTML
export const checkAnswer = checkAnswerUtil;

// Функция для управления атрибутом readonly в зависимости от ширины экрана
function updateReadonlyState(): void {
  const answerInputEl = document.getElementById('answer') as HTMLInputElement;
  if (answerInputEl) {
    if (window.innerWidth < 640) {
      answerInputEl.setAttribute('readonly', 'readonly');
    } else {
      answerInputEl.removeAttribute('readonly');
    }
  }
}

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
  // Настройка модальных окон
  const instructionButton = document.getElementById('instructionButton');
  if (instructionButton) {
    instructionButton.addEventListener('click', openInstructionModal);
  }

  const restartButton = document.getElementById('restartButton');
  if (restartButton) {
    restartButton.addEventListener('click', closeModalSuccess);
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

  // Обработчик изменения поля количества попыток (десктоп)
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

  // Обработчик изменения поля количества попыток (мобильный)
  const mobileAttemptsInput = document.getElementById(
    'mobile-attempts-input'
  ) as HTMLInputElement;
  if (mobileAttemptsInput) {
    // Обработчик фокуса - очищает поле при клике
    mobileAttemptsInput.addEventListener('focus', () => {
      if (mobileAttemptsInput.value === '0') {
        mobileAttemptsInput.value = '';
      }
    });

    // Обработчик потери фокуса - если поле пустое, возвращаем 0
    mobileAttemptsInput.addEventListener('blur', () => {
      if (mobileAttemptsInput.value === '') {
        mobileAttemptsInput.value = '0';
      }
    });

    mobileAttemptsInput.addEventListener('input', () => {
      const value = parseInt(mobileAttemptsInput.value) || 0;
      counterState.setAttemptsCount(value);
    });
  }

  // Добавление обработчиков в глобальный объект window для доступа из HTML
  (window as unknown as CustomWindow).checkAnswer = checkAnswer;
  (window as unknown as CustomWindow).handleListClick = handleListClick;

  // Настройка обработчиков для кнопки Старт (десктоп)
  const startButton = document.getElementById('start');
  if (startButton) {
    startButton.addEventListener('click', startGame);
  }

  // Настройка обработчиков для кнопки Старт (мобильный)
  const mobileStartButton = document.getElementById('mobile-start');
  if (mobileStartButton) {
    mobileStartButton.addEventListener('click', () => {
      // Синхронизируем значения перед стартом
      syncMobileAttemptsInput();

      // Проверяем валидность данных перед стартом
      const selectedNumbers = selectedNumbersState.getSelectedNumbers();
      const attemptsCount = counterState.getAttemptsCount();

      // Если не выбраны числа или не установлено количество попыток - не стартуем игру
      if (selectedNumbers.length === 0) {
        alert('Выберите хотя бы одно число для изучения');
        return;
      }

      if (attemptsCount <= 0) {
        alert('Введите количество успешных попыток (больше 0)');
        return;
      }

      // Переключаемся на экран игры
      switchToMobileGameScreen();

      // Запускаем игру
      startGame();
    });
  }

  // Подключаем обработчики кликов для элементов списка чисел (десктоп)
  document.querySelectorAll('.footer-list li').forEach((li) => {
    li.addEventListener('click', (event) => {
      handleListClick(event as MouseEvent);
    });
  });

  // Подключаем обработчики кликов для элементов списка чисел (мобильный)
  document.querySelectorAll('.mobile-footer-list li').forEach((li) => {
    li.addEventListener('click', (event) => {
      handleListClick(event as MouseEvent);
    });
  });

  // Инициализируем правильное мигание при загрузке страницы
  updateInstructionTextState();

  // --- Обработка мобильной экранной клавиатуры ---
  const mobileKeyboard = document.getElementById('mobile-keyboard');
  const answerInputEl = document.getElementById('answer') as HTMLInputElement;

  // Инициализируем состояние readonly при загрузке
  updateReadonlyState();

  // Добавляем слушатель изменения размера окна
  window.addEventListener('resize', updateReadonlyState);

  if (mobileKeyboard && answerInputEl) {
    mobileKeyboard.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (!target.classList.contains('mobile-key')) return;
      const key = target.getAttribute('data-key');
      if (!key) return;
      if (key === 'del') {
        answerInputEl.value = answerInputEl.value.slice(0, -1);
      } else if (key === 'ok') {
        checkAnswer();
      } else if (/^\d$/.test(key)) {
        // Ограничим длину ответа 3 символами (например, 100)
        if (answerInputEl.value.length < 3) {
          answerInputEl.value += key;
        }
      }
      // Фокусируем поле, чтобы курсор был виден
      answerInputEl.focus();
    });
  }
});

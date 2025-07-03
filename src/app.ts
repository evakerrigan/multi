import {
  selectedNumbersState,
  counterState,
  gameStartedState
} from './utils/state';
import {answerInput, firstInput, secondInput} from './utils/ui';
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

// Функция валидации поля ответа
function validateAnswerInput(input: HTMLInputElement): void {
  let value = input.value;

  // Убираем все нецифровые символы (кроме цифр)
  value = value.replace(/[^\d]/g, '');

  // Убираем ведущие нули (но оставляем один ноль если это единственная цифра)
  if (value.length > 1 && value.startsWith('0')) {
    value = value.replace(/^0+/, '');
  }

  // Ограничиваем длину до 3 символов
  if (value.length > 3) {
    value = value.slice(0, 3);
  }

  // Обновляем значение поля
  input.value = value;
}

// Обработчики событий
export function handleListClick(event: MouseEvent): void {
  // Проверяем, не началась ли уже игра
  if (gameStartedState.getGameStartedState()) {
    return; // Блокируем выбор чисел если игра уже началась
  }

  const target = event.target as HTMLElement;

  // Проверяем, является ли кликнутый элемент кнопкой "Все"
  if (target.innerText === 'Все') {
    // Очищаем текущий выбор
    selectedNumbersState.clearSelectedNumbers();

    // Убираем выделение со всех элементов списка
    document
      .querySelectorAll('.footer-list li, .mobile-footer-list li')
      .forEach((li) => {
        li.classList.remove('list-item-selected');
      });

    // Добавляем все числа от 0 до 10
    for (let i = 0; i <= 10; i++) {
      selectedNumbersState.addSelectedNumber(i);
    }

    // Добавляем выделение ко всем элементам списка (кроме "Все")
    document
      .querySelectorAll('.footer-list li, .mobile-footer-list li')
      .forEach((li) => {
        if (li.textContent !== 'Все') {
          li.classList.add('list-item-selected');
        }
      });

    // Устанавливаем количество попыток в 50
    counterState.setAttemptsCount(50);

    // Генерируем новый пример после выбора числа
    setFirstInputValue();
    return;
  }

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

// Функция для обработки ресайза окна и переключения экранов
export function handleWindowResize(): void {
  const mobileSetupScreen = document.getElementById('mobile-setup-screen');
  const mainGameScreen = document.getElementById('main-game-screen');

  if (mobileSetupScreen && mainGameScreen) {
    if (window.innerWidth >= 640) {
      // Если окно стало шире 640px, скрываем мобильный экран настройки
      mobileSetupScreen.style.display = 'none';
      mainGameScreen.classList.remove('mobile-active');
    } else {
      // Если окно стало уже 640px
      if (!gameStartedState.getGameStartedState()) {
        // Если игра не началась, показываем мобильный экран настройки
        mobileSetupScreen.style.display = 'flex';
        mainGameScreen.classList.remove('mobile-active');
      } else {
        // Если игра уже началась, показываем основной экран с мобильным классом
        mobileSetupScreen.style.display = 'none';
        mainGameScreen.classList.add('mobile-active');
      }
    }
  }

  // Обновляем состояние readonly для поля ответа
  updateReadonlyState();
}

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
  // Очищаем инпуты для умножения при инициализации
  firstInput.value = '';
  secondInput.value = '';

  // Инициализируем значения инпутов из состояния
  const initialAttemptsInput = document.getElementById(
    'attempts-input'
  ) as HTMLInputElement;
  const initialMobileAttemptsInput = document.getElementById(
    'mobile-attempts-input'
  ) as HTMLInputElement;

  if (initialAttemptsInput) {
    initialAttemptsInput.value = counterState.getAttemptsCount().toString();
  }
  if (initialMobileAttemptsInput) {
    initialMobileAttemptsInput.value = counterState
      .getAttemptsCount()
      .toString();
  }

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

    // Предотвращаем ввод нежелательных символов
    const allowedKeys = [
      'Backspace',
      'Delete',
      'Tab',
      'Enter',
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown'
    ];
    const isNumber = /^\d$/.test(event.key);

    if (!allowedKeys.includes(event.key) && !isNumber) {
      event.preventDefault();
    }
  });

  // Добавляем валидацию для поля ответа
  answerInput.addEventListener('input', () => {
    validateAnswerInput(answerInput);
  });

  // Валидация при вставке текста
  answerInput.addEventListener('paste', (event) => {
    event.preventDefault();
    const pastedText = event.clipboardData?.getData('text') || '';
    const tempValue = answerInput.value + pastedText;
    answerInput.value = tempValue;
    validateAnswerInput(answerInput);
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

      // Запускаем игру (все проверки валидности внутри startGame)
      const gameStarted = startGame();

      // Переключаемся на экран игры только если игра успешно началась
      if (gameStarted) {
        switchToMobileGameScreen();
      }
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

  // Инициализируем валидацию поля ответа
  validateAnswerInput(answerInput);

  // --- Обработка мобильной экранной клавиатуры ---
  const mobileKeyboard = document.getElementById('mobile-keyboard');
  const answerInputEl = document.getElementById('answer') as HTMLInputElement;

  // Инициализируем состояние readonly при загрузке
  updateReadonlyState();

  // Добавляем слушатель изменения размера окна
  window.addEventListener('resize', handleWindowResize);

  // Инициализируем правильное состояние экранов при загрузке
  handleWindowResize();

  if (mobileKeyboard && answerInputEl) {
    // Функция для обработки нажатий на клавиши
    const handleKeyPress = (event: Event) => {
      const target = event.target as HTMLElement;

      // Ищем ближайший элемент с классом mobile-key (кнопка)
      const mobileKey = target.closest('.mobile-key');
      if (!mobileKey) return;

      const key = mobileKey.getAttribute('data-key');
      if (!key) return;

      if (key === 'del') {
        answerInputEl.value = answerInputEl.value.slice(0, -1);
      } else if (key === 'ok') {
        checkAnswer();
      } else if (/^\d$/.test(key)) {
        // Добавляем цифру и применяем валидацию
        answerInputEl.value += key;
        validateAnswerInput(answerInputEl);
      }
      // Фокусируем поле, чтобы курсор был виден
      answerInputEl.focus();
    };

    // Обработчик кликов
    mobileKeyboard.addEventListener('click', handleKeyPress);

    // Обработчик touch событий для лучшей отзывчивости на мобильных
    mobileKeyboard.addEventListener(
      'touchstart',
      (event) => {
        // Предотвращаем двойное срабатывание
        event.preventDefault();
      },
      {passive: false}
    );

    mobileKeyboard.addEventListener('touchend', handleKeyPress);
  }
});

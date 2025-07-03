import {getRandomGifNumber} from './getRandomGif';
import {
  counterState,
  gameStartedState,
  selectedNumbersState,
  updateInstructionTextState
} from './state';
import {resetInputs, removeListItemSelectedClasses, updateCounters} from './ui';
import {handleWindowResize} from '../app';

// Массив с случайными поздравлениями
const congratulations = [
  {
    title: 'Отличная работа!',
    message: 'Вы успешно справились с заданием! 🌟'
  },
  {
    title: 'Ура!',
    message: 'Ты справился на отлично! 🌟'
  },
  {
    title: 'Молодец!',
    message: 'Таблица умножения тебе покорилась! 🎉'
  },
  {
    title: 'Вот это да!',
    message: 'Ты просто умножительный гений! ✨'
  },
  {
    title: 'Отличная работа!',
    message: 'Так держать! 💪'
  },
  {
    title: 'Ты – супер!',
    message: 'Столько примеров решено верно! 🚀'
  },
  {
    title: 'Браво!',
    message: 'Ты отлично потрудился! 👏'
  },
  {
    title: 'Вау!',
    message: 'Ты щёлкаешь примеры как орешки! 😊'
  },
  {
    title: 'Поздравляю!',
    message: 'Ты сегодня на высоте! 🌈'
  },
  {
    title: 'Ты решил всё!',
    message: 'Теперь можно идти покорять Эверест! 🏔'
  },
  {
    title: 'Готово!',
    message: 'Да ты — человеческий калькулятор! 🤖'
  },
  {
    title: 'Вот это да!',
    message: "Даже учительница сказала бы: 'Вау!' 👩‍🏫✨"
  },
  {
    title: 'Поздравляю!',
    message: 'Ты только что умножил свои навыки на 100! 💯'
  },
  {
    title: 'Шёпотом:',
    message: 'Он/она знает таблицу умножения..." 😱"'
  },
  {
    title: '5 из 5!',
    message: 'Где твоя корона, король/королева математики? 👑'
  },
  {
    title: 'Тыыыыщь!',
    message: 'Ты набрал комбо! 🎮'
  },
  {
    title: 'Ого!',
    message: 'Если бы таблица умножения была тортом, ты бы её уже съел! 🍰'
  },
  {
    title: 'Теперь можно отдохнуть... ',
    message: 'Шутка! Давай ещё! 😈'
  },
  {
    title: 'Поздравляем!',
    message: 'Ты только что спас планету от нашествия примеров! 🚀👾'
  },
  {
    title: 'Всё верно!',
    message: 'А теперь беги — твой кот украл пиццу! 🍕'
  }
];

// Функция для получения случайного поздравления
function getRandomCongratulations() {
  const randomIndex = Math.floor(Math.random() * congratulations.length);
  return congratulations[randomIndex];
}

export function openModal(): void {
  const randomGifNumber = getRandomGifNumber();
  const gifPath = `/gifs/${randomGifNumber}.gif`;

  const modalImage =
    document.querySelector<HTMLImageElement>('.modal-image-success') || null;
  if (modalImage) {
    modalImage.src = gifPath;
  }

  // Получаем случайное поздравление
  const randomCongrats = getRandomCongratulations();

  // Обновляем заголовок и сообщение в модальном окне
  const modalTitle = document.querySelector('#modal .modal-content h2');
  const modalMessage = document.querySelector('#modal .modal-content p');

  if (modalTitle) {
    modalTitle.textContent = randomCongrats.title;
  }

  if (modalMessage) {
    modalMessage.textContent = randomCongrats.message;
  }

  // Закрываем мобильную клавиатуру перед показом модального окна
  const activeElement = document.activeElement as HTMLElement;
  if (activeElement && typeof activeElement.blur === 'function') {
    activeElement.blur();
  }

  const modal = document.getElementById('modal');
  if (modal) {
    modal.style.display = 'flex';
  }
}

export function closeModalSuccess(): void {
  const modal = document.getElementById('modal');
  if (modal) {
    modal.style.display = 'none';
    gameStartedState.setGameStartedState(false);
    counterState.resetCounts();
    selectedNumbersState.clearSelectedNumbers();
    resetInputs();
    removeListItemSelectedClasses();
    updateCounters();

    // Разблокировать инпуты и кнопку Старт
    const startButton = document.getElementById('start') as HTMLButtonElement;
    const attemptsInput = document.getElementById(
      'attempts-input'
    ) as HTMLInputElement;
    const mobileStartButton = document.getElementById(
      'mobile-start'
    ) as HTMLButtonElement;
    const mobileAttemptsInput = document.getElementById(
      'mobile-attempts-input'
    ) as HTMLInputElement;

    if (startButton) startButton.removeAttribute('disabled');
    if (attemptsInput) attemptsInput.removeAttribute('disabled');
    if (mobileStartButton) mobileStartButton.removeAttribute('disabled');
    if (mobileAttemptsInput) mobileAttemptsInput.removeAttribute('disabled');

    // Скрываем галочки и крестики под ответом
    const successCheckmark = document.getElementById(
      'success-checkmark'
    ) as HTMLElement;
    const failureCheckmark = document.getElementById(
      'failure-checkmark'
    ) as HTMLElement;
    failureCheckmark.style.display = 'none';
    successCheckmark.style.display = 'none';

    // Возврат к экрану настройки на мобильных устройствах
    // Вызываем handleWindowResize для правильного переключения экранов
    handleWindowResize();

    // Обновляем UI для синхронизации всех элементов с состоянием
    updateInstructionTextState();
  }
}

export function openInstructionModal(): void {
  const modalInstruction = document.getElementById('instructionModal');
  if (modalInstruction) {
    modalInstruction.style.display = 'block';
  }
}

export function closeInstructionModal(): void {
  const modal = document.getElementById('instructionModal');
  if (modal) {
    modal.style.display = 'none';
  }
}

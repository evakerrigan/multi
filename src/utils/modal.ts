import {getRandomGifNumber} from './getRandomGif';
import {
  counterState,
  gameStartedState,
  selectedNumbersState,
  updateInstructionTextState
} from './state';
import {resetInputs, removeListItemSelectedClasses, updateCounters} from './ui';
import {handleWindowResize} from '../app';

export function openModal(): void {
  const randomGifNumber = getRandomGifNumber();
  const gifPath = `/gifs/${randomGifNumber}.gif`;

  const modalImage =
    document.querySelector<HTMLImageElement>('.modal-image-success') || null;
  if (modalImage) {
    modalImage.src = gifPath;
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

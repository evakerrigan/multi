import {getRandomGifNumber} from './getRandomGif';
import {counterState, selectedNumbersState} from './state';
import {resetInputs, removeListItemSelectedClasses, updateCounters} from './ui';

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
    counterState.resetCounts();
    selectedNumbersState.clearSelectedNumbers();
    resetInputs();
    removeListItemSelectedClasses();
    updateCounters();

    // Разблокировать инпуты и кнопку Старт
    // const firstInput = document.getElementById(
    //   'firstNumber'
    // ) as HTMLInputElement;
    // const secondInput = document.getElementById(
    //   'secondNumber'
    // ) as HTMLInputElement;
    const startButton = document.getElementById('start') as HTMLButtonElement;
    const attemptsInput = document.getElementById(
      'attempts-input'
    ) as HTMLInputElement;

    // if (firstInput) firstInput.removeAttribute('disabled');
    // if (secondInput) secondInput.removeAttribute('disabled');
    if (startButton) startButton.removeAttribute('disabled');
    if (attemptsInput) attemptsInput.removeAttribute('disabled');
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

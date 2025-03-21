import {
  firstInput,
  secondInput,
  answerInput,
  messageBlock,
  attemptsElement,
  showSuccessEffect,
  showFailureEffect,
  updateCounters
} from './ui';
import {
  getSelectedNumbers,
  incrementCount,
  incrementGoodCount,
  incrementBadCount,
  getGoodCount
} from './state';
import {openModal} from './modal';

export function generateRandomNumberAndSetToSecondInput(): void {
  const randomNumber = Math.floor(Math.random() * 8) + 2;

  answerInput.value = '';
  secondInput.value = randomNumber.toString();
}

export function chooseRandomNumberAndSetToFirstInput(array: number[]): string {
  if (array.length === 0) return '0';

  const randomIndex = Math.floor(Math.random() * array.length);
  const randomNumber = array[randomIndex];
  firstInput.value = randomNumber.toString();
  return randomNumber.toString();
}

export function setFirstInputValue(): void {
  const selectedNumbers = getSelectedNumbers();
  chooseRandomNumberAndSetToFirstInput(selectedNumbers);
  generateRandomNumberAndSetToSecondInput();
}

export function checkAnswer(): void {
  const expectedResult =
    parseInt(firstInput.value) * parseInt(secondInput.value);
  const answer = parseInt(answerInput.value);
  const selectedNumbers = getSelectedNumbers();

  incrementCount();
  updateCounters();

  if (isNaN(answer)) {
    messageBlock.textContent = 'Ответ не может быть пустым';
    return;
  }

  if (expectedResult === answer) {
    incrementGoodCount();
    updateCounters();
    showSuccessEffect();
    messageBlock.textContent = `${firstInput.value} x ${secondInput.value} = ${answer}. Ответ верный. ${expectedResult}`;
  } else {
    incrementBadCount();
    updateCounters();
    showFailureEffect();
    messageBlock.textContent = `${firstInput.value} x ${secondInput.value} = ${answer}. Ответ неверный. Правильный ответ: ${expectedResult}`;
  }

  if (getGoodCount() < parseInt(attemptsElement.value) || isNaN(parseInt(attemptsElement.value))) {
    chooseRandomNumberAndSetToFirstInput(selectedNumbers);
    generateRandomNumberAndSetToSecondInput();
  } else {
    openModal();
  }
}

export function startGame(): void {
  // Логика начала игры
  const firstInput = document.getElementById('firstNumber') as HTMLInputElement;
  const secondInput = document.getElementById('secondNumber') as HTMLInputElement;
  const startButton = document.getElementById('start') as HTMLButtonElement;
  
  if (firstInput) firstInput.setAttribute('disabled', 'true');
  if (secondInput) secondInput.setAttribute('disabled', 'true');
  if (startButton) startButton.setAttribute('disabled', 'true');
  
  setFirstInputValue();
}

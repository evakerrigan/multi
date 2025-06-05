import {
  firstInput,
  secondInput,
  answerInput,
  messageBlock,
  // attemptsInput,
  showSuccessEffect,
  showFailureEffect,
  updateCounters
} from './ui';
import {counterState, selectedNumbersState} from './state';
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
  const selectedNumbers = selectedNumbersState.getSelectedNumbers();
  chooseRandomNumberAndSetToFirstInput(selectedNumbers);
  generateRandomNumberAndSetToSecondInput();
}

export function checkAnswer(): void {
  const expectedResult =
    parseInt(firstInput.value) * parseInt(secondInput.value);
  const answer = parseInt(answerInput.value);
  const selectedNumbers = selectedNumbersState.getSelectedNumbers();

  // Проверяем пустой ответ ДО увеличения счетчика
  if (isNaN(answer)) {
    messageBlock.textContent = 'Ответ не может быть пустым';
    return;
  }

  // Увеличиваем счетчик только при непустом ответе
  counterState.incrementCount();
  updateCounters();

  if (expectedResult === answer) {
    counterState.incrementGoodCount();
    updateCounters();
    showSuccessEffect();
    messageBlock.textContent = `${firstInput.value} x ${secondInput.value} = ${answer}. Ответ верный. ${expectedResult}`;
  } else {
    counterState.incrementBadCount();
    updateCounters();
    showFailureEffect();
    messageBlock.textContent = `${firstInput.value} x ${secondInput.value} = ${answer}. Ответ неверный. Правильный ответ: ${expectedResult}`;
  }

  const attemptsTarget = counterState.getAttemptsCount();
  if (counterState.getGoodCount() < attemptsTarget || attemptsTarget === 0) {
    chooseRandomNumberAndSetToFirstInput(selectedNumbers);
    generateRandomNumberAndSetToSecondInput();
  } else {
    openModal();
  }
}

export function startGame(): void {
  // Проверяем валидность данных перед стартом
  const selectedNumbers = selectedNumbersState.getSelectedNumbers();
  const attemptsCount = counterState.getAttemptsCount();

  // Если не выбраны числа или не установлено количество попыток - не стартуем игру
  if (selectedNumbers.length === 0) {
    messageBlock.textContent = 'Выберите хотя бы одно число для изучения';
    return;
  }

  if (attemptsCount <= 0) {
    messageBlock.textContent = 'Введите количество успешных попыток (больше 0)';
    return;
  }

  // Логика начала игры
  const firstInput = document.getElementById('firstNumber') as HTMLInputElement;
  const secondInput = document.getElementById(
    'secondNumber'
  ) as HTMLInputElement;
  const startButton = document.getElementById('start') as HTMLButtonElement;
  const attemptsInput = document.getElementById(
    'attempts-input'
  ) as HTMLInputElement;

  if (firstInput) firstInput.setAttribute('disabled', 'true');
  if (secondInput) secondInput.setAttribute('disabled', 'true');
  if (startButton) {
    // Сначала убираем мигание кнопки
    startButton.classList.remove('button-start-blinking');
    // Затем отключаем кнопку
    startButton.setAttribute('disabled', 'true');
  }

  // Дизейблим инпут с количеством попыток чтобы избежать фокуса на мобилке
  if (attemptsInput) {
    attemptsInput.setAttribute('disabled', 'true');
  }

  // Очищаем сообщение об ошибке и начинаем игру
  messageBlock.textContent = '';
  setFirstInputValue();
  counterState.resetCounts();
}

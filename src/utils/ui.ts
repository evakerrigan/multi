import {counterState} from './state';

// Элементы DOM
export const firstInput = document.getElementById(
  'firstNumber'
) as HTMLInputElement;
export const secondInput = document.getElementById(
  'secondNumber'
) as HTMLInputElement;
export const answerInput = document.getElementById(
  'answer'
) as HTMLInputElement;
export const messageBlock = document.getElementById('message') as HTMLElement;
export const attemptsCountTemp = document.getElementById(
  'attempts-count-temp'
) as HTMLElement;
export const attemptsCountYes = document.getElementById(
  'attempts-count-yes'
) as HTMLElement;
export const attemptsCountNot = document.getElementById(
  'attempts-count-not'
) as HTMLElement;
export const attemptsInput = document.getElementById(
  'attempts-input'
) as HTMLInputElement;

export function updateCounters(): void {
  attemptsCountTemp.textContent = counterState.getCount().toString();
  attemptsCountYes.textContent = counterState.getGoodCount().toString();
  attemptsCountNot.textContent = counterState.getBadCount().toString();
}

export function resetInputs(): void {
  firstInput.value = '';
  secondInput.value = '';
  answerInput.value = '';
  messageBlock.textContent = '';

  // Сброс десктопного инпута попыток
  const attemptsInput = document.getElementById(
    'attempts-input'
  ) as HTMLInputElement;
  if (attemptsInput) {
    attemptsInput.value = '0';
  }

  // Сброс мобильного инпута попыток
  const mobileAttemptsInput = document.getElementById(
    'mobile-attempts-input'
  ) as HTMLInputElement;
  if (mobileAttemptsInput) {
    mobileAttemptsInput.value = '0';
  }

  counterState.setAttemptsCount(0);
}

export function removeListItemSelectedClasses(): void {
  const elementsWithClass = document.querySelectorAll(
    '[class*="list-item-selected"]'
  );
  elementsWithClass.forEach((element) => {
    element.classList.remove('list-item-selected');
  });
}

export function showSuccessEffect(): void {
  document.body.style.backgroundColor = 'green';
  setTimeout(() => (document.body.style.backgroundColor = ''), 1000);
}

export function showFailureEffect(): void {
  document.body.style.backgroundColor = 'red';
  setTimeout(() => (document.body.style.backgroundColor = ''), 1000);
}

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
  // Обновляем мобильные элементы
  attemptsCountTemp.textContent = counterState.getCount().toString();
  attemptsCountYes.textContent = counterState.getGoodCount().toString();
  attemptsCountNot.textContent = counterState.getBadCount().toString();

  // Обновляем десктопные элементы
  const desktopAttemptsCountTemp = document.getElementById(
    'desktop-attempts-count-temp'
  );
  const desktopAttemptsCountYes = document.getElementById(
    'desktop-attempts-count-yes'
  );
  const desktopAttemptsCountNot = document.getElementById(
    'desktop-attempts-count-not'
  );

  if (desktopAttemptsCountTemp)
    desktopAttemptsCountTemp.textContent = counterState.getCount().toString();
  if (desktopAttemptsCountYes)
    desktopAttemptsCountYes.textContent = counterState
      .getGoodCount()
      .toString();
  if (desktopAttemptsCountNot)
    desktopAttemptsCountNot.textContent = counterState.getBadCount().toString();
}

export function resetInputs(): void {
  firstInput.value = '';
  secondInput.value = '';
  answerInput.value = '';
  messageBlock.textContent = '';
}

export function removeListItemSelectedClasses(): void {
  const elementsWithClass = document.querySelectorAll(
    '[class*="list-item-selected"]'
  );
  elementsWithClass.forEach((element) => {
    element.classList.remove('list-item-selected');
  });
}

const successCheckmark = document.getElementById(
  'success-checkmark'
) as HTMLElement;
const failureCheckmark = document.getElementById(
  'failure-checkmark'
) as HTMLElement;

export function showSuccessEffect(): void {
  failureCheckmark.style.display = 'none';
  successCheckmark.style.display = 'flex';
}

export function showFailureEffect(): void {
  successCheckmark.style.display = 'none';
  failureCheckmark.style.display = 'flex';
  document.body.style.backgroundColor = 'red';
  setTimeout(() => (document.body.style.backgroundColor = ''), 1000);
}

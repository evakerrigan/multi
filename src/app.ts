const firstInput = document.getElementById('firstNumber') as HTMLInputElement;
const secondInput = document.getElementById('secondNumber') as HTMLInputElement;
const answerInput = document.getElementById('answer') as HTMLInputElement;
const messageBlock = document.getElementById('message') as HTMLElement;
const attemptsCountTemp = document.getElementById(
  'attempts-count-temp'
) as HTMLElement;
const attemptsCountYes = document.getElementById(
  'attempts-count-yes'
) as HTMLElement;
const attemptsCountNot = document.getElementById(
  'attempts-count-not'
) as HTMLElement;
const attemptsElement = document.getElementById('attempts') as HTMLInputElement;

let count = 0;
let badCount = 0;
let goodCount = 0;

let selectedNumbers: number[] = [];

function setFirstInputValue(values: number[]): void {
  chooseRandomNumberAndSetToFirstInput(selectedNumbers);

  generateRandomNumberAndSetToSecondInput();
}

function chooseRandomNumberAndSetToFirstInput(array): string {
  const randomIndex = Math.floor(Math.random() * array.length);
  const randomNumber = array[randomIndex];
  firstInput.value = randomNumber.toString();
  return randomNumber.toString();
}

export function handleListClick(event: MouseEvent): void {
  const target = event.target as HTMLElement;

  const value = parseInt(target.innerText || '0');

  const index = selectedNumbers.indexOf(value);
  if (index > -1) {
    target.classList.remove('list-item-selected');
    selectedNumbers.splice(index, 1);
  } else {
    target.classList.add('list-item-selected');
    selectedNumbers.push(value);
  }

  setFirstInputValue(selectedNumbers);
}

function generateRandomNumberAndSetToSecondInput(): void {
  const randomNumber = Math.floor(Math.random() * 8) + 2;

  answerInput.value = '';
  secondInput.value = randomNumber.toString();
}

function setupInputAnimation(input: Element) {
  if (input instanceof HTMLInputElement) {
    // Создаем элемент для мигающего курсора
    const blinker = document.createElement('span');
    blinker.className = 'value-blinker';
    blinker.textContent = '0';

    // Добавляем элемент после инпута
    input.parentNode?.insertBefore(blinker, input.nextSibling);

    // Обработчик изменения значения
    input.addEventListener('input', () => {
      blinker.style.display = input.value ? 'none' : 'block';
    });
  }
}

export function checkAnswer(): void {
  const expectedResult =
    parseInt(firstInput.value) * parseInt(secondInput.value);
  const answer = parseInt(answerInput.value);

  count = count + 1;
  attemptsCountTemp.textContent = count.toString();

  if (isNaN(answer)) {
    messageBlock.textContent = 'Ответ не может быть пустым';
    return;
  }

  if (expectedResult === answer) {
    goodCount = goodCount + 1;
    attemptsCountYes.textContent = goodCount.toString();
    document.body.style.backgroundColor = 'green';
    messageBlock.textContent = `${firstInput.value} x ${secondInput.value} = ${answer}. Ответ верный. ${expectedResult}`;
    setTimeout(() => (document.body.style.backgroundColor = ''), 1000);
  } else {
    badCount = badCount + 1;
    attemptsCountNot.textContent = badCount.toString();
    document.body.style.backgroundColor = 'red';
    messageBlock.textContent = `${firstInput.value} x ${secondInput.value} = ${answer}. Ответ неверный. Правильный ответ: ${expectedResult}`;
    setTimeout(() => (document.body.style.backgroundColor = ''), 1000);
  }

  if (goodCount < parseInt(attemptsElement.value)) {
    chooseRandomNumberAndSetToFirstInput(selectedNumbers);
    generateRandomNumberAndSetToSecondInput();
  } else {
    openModal();
  }
}

function openModal() {
  const modal = document.getElementById('modal');
  if (modal) {
    modal.style.display = 'flex';
  }
}

function removeListItemSelectedClasses() {
  const elementsWithClass = document.querySelectorAll(
    '[class*="list-item-selected"]'
  );

  elementsWithClass.forEach((element) => {
    element.classList.remove('list-item-selected');
  });
}

function closeModalSuccess() {
  const modal = document.getElementById('modal');
  if (modal) {
    modal.style.display = 'none';
    count = 0;
    badCount = 0;
    goodCount = 0;
    selectedNumbers = [];
    attemptsElement.value = '';
    attemptsCountTemp.textContent = '0';
    attemptsCountYes.textContent = '0';
    attemptsCountNot.textContent = '0';
    firstInput.value = '';
    secondInput.value = '';
    answerInput.value = '';
    messageBlock.textContent = '';
    removeListItemSelectedClasses();
    firstInput.removeAttribute('disabled');
    secondInput.removeAttribute('disabled');
  }
}

const closeModalButton = document.getElementById('closeModalSuccess');
if (closeModalButton !== null) {
  closeModalButton.addEventListener('click', closeModalSuccess);
}

answerInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    checkAnswer();
  }
});

interface CustomWindow extends Window {
  checkAnswer: () => void;
  handleListClick: (event: MouseEvent) => void;
}

declare let window: CustomWindow;

window.checkAnswer = checkAnswer;
window.handleListClick = handleListClick;

// модалка с инструкцией
document.addEventListener('DOMContentLoaded', () => {
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

  document.querySelectorAll('.footer-input').forEach(setupInputAnimation);

  const start = document.getElementById('start');
  if (start) {
    start.addEventListener('click', startGame);
  }
});

function openInstructionModal() {
  const modalInstruction = document.getElementById('instructionModal');
  if (modalInstruction) {
    modalInstruction.style.display = 'flex';
  }
}

function closeInstructionModal() {
  const modal = document.getElementById('instructionModal');
  if (modal) {
    modal.style.display = 'none';
  }
}

function startGame() {
  console.log('start');
  firstInput.setAttribute('disabled', '');
  secondInput.setAttribute('disabled', '');
}

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
  // if (!isNaN(parseInt(firstInput.value))) {
    const randomNumber = Math.floor(Math.random() * 8) + 2;

    answerInput.value = '';
    secondInput.value = randomNumber.toString();
  // } else {
  //   console.error('Первое число должно быть числом для выполнения операции.');
  // }
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
    modal.style.display = 'block';
  }
}

function closeModal() {
  const modal = document.getElementById('modal');
  if (modal) {
    modal.style.display = 'none';
  }
}

const closeModalButton = document.getElementById('closeModal');
if (closeModalButton !== null) {
  closeModalButton.addEventListener('click', closeModal);
}

answerInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    checkAnswer();
  }
});

window.checkAnswer = checkAnswer;
window.handleListClick = handleListClick;

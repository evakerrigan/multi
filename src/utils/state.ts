type State = {
  count: number;
  badCount: number;
  goodCount: number;
  selectedNumbers: number[];
  attemptsCount: number;
};

const state = new Proxy<State>(
  {
    count: 0,
    badCount: 0,
    goodCount: 0,
    selectedNumbers: [],
    attemptsCount: 0
  },
  {
    set(target, property, value) {
      target[property] = value;
      updateUI();
      return true;
    }
  }
);

function updateUI() {
  const attemptsElement = document.getElementById('attempts-count-temp');
  const yesElement = document.getElementById('attempts-count-yes');
  const notElement = document.getElementById('attempts-count-not');
  const selectedNumbersList = document.getElementById('selected-numbers-list');
  const attemptsInput = document.getElementById(
    'attempts-input'
  ) as HTMLInputElement;

  if (attemptsElement) attemptsElement.textContent = state.count.toString();
  if (yesElement) yesElement.textContent = state.goodCount.toString();
  if (notElement) notElement.textContent = state.badCount.toString();

  // Синхронизируем поле ввода количества попыток с состоянием
  if (attemptsInput) {
    // Обновляем только если значение отличается, чтобы избежать циклических обновлений
    const currentValue = parseInt(attemptsInput.value) || 0;
    if (currentValue !== state.attemptsCount) {
      attemptsInput.value = state.attemptsCount.toString();
    }
  }

  if (selectedNumbersList) {
    while (selectedNumbersList.firstChild) {
      selectedNumbersList.removeChild(selectedNumbersList.firstChild);
    }

    state.selectedNumbers.forEach((num: number) => {
      const li = document.createElement('li');
      li.textContent = num.toString();
      selectedNumbersList.appendChild(li);
    });
  }

  // Обновляем состояние текста инструкции
  updateInstructionTextState();
}

function updateInstructionTextState() {
  const instructionText = document.getElementById('instruction-text');
  const attemptsText = document.getElementById('attempts-text');

  if (instructionText && attemptsText) {
    const isAttemptsEntered = state.attemptsCount > 0;

    if (state.selectedNumbers.length === 0) {
      // Числа не выбраны - мигает первый текст
      instructionText.classList.add('instruction-text-blinking');
      attemptsText.classList.remove('attempts-text-blinking');
      console.log('Мигание первого текста - числа не выбраны');
    } else if (!isAttemptsEntered) {
      // Числа выбраны, но количество попыток не введено - мигает второй текст
      instructionText.classList.remove('instruction-text-blinking');
      attemptsText.classList.add('attempts-text-blinking');
      console.log('Мигание второго текста - количество попыток не введено');
    } else {
      // Всё заполнено - ничего не мигает
      instructionText.classList.remove('instruction-text-blinking');
      attemptsText.classList.remove('attempts-text-blinking');
      console.log('Всё заполнено - мигание выключено');
    }
  }
}

export const counterState = {
  getCount: () => state.count,
  getBadCount: () => state.badCount,
  getGoodCount: () => state.goodCount,
  getAttemptsCount: () => state.attemptsCount,

  setCount: (value: number) => {
    state.count = value;
  },
  setBadCount: (value: number) => {
    state.badCount = value;
  },
  setGoodCount: (value: number) => {
    state.goodCount = value;
  },
  setAttemptsCount: (value: number) => {
    state.attemptsCount = value;
  },
  resetCounts: () => {
    state.count = 0;
    state.badCount = 0;
    state.goodCount = 0;
  },
  incrementCount: () => {
    state.count += 1;
  },
  incrementBadCount: () => {
    state.badCount += 1;
  },
  incrementGoodCount: () => {
    state.goodCount += 1;
  }
};

export const selectedNumbersState = {
  getSelectedNumbers: () => state.selectedNumbers,
  addSelectedNumber: (num: number) => {
    if (!state.selectedNumbers.includes(num)) {
      console.log(`Добавляю число ${num} в состояние`);
      state.selectedNumbers = [...state.selectedNumbers, num];
    }
  },
  removeSelectedNumber: (num: number) => {
    const index = state.selectedNumbers.indexOf(num);
    if (index > -1) {
      console.log(`Удаляю число ${num} из состояния`);
      state.selectedNumbers = state.selectedNumbers.filter(
        (_, i) => i !== index
      );
    }
  },
  clearSelectedNumbers: () => {
    console.log('Очищаю все выбранные числа');
    state.selectedNumbers = [];
  }
};

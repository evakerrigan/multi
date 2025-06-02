type State = {
  count: number;
  badCount: number;
  goodCount: number;
  selectedNumbers: number[];
};

const state = new Proxy<State>(
  {
    count: 0,
    badCount: 0,
    goodCount: 0,
    selectedNumbers: []
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

  if (attemptsElement) attemptsElement.textContent = state.count.toString();
  if (yesElement) yesElement.textContent = state.goodCount.toString();
  if (notElement) notElement.textContent = state.badCount.toString();

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
  if (instructionText) {
    if (state.selectedNumbers.length === 0) {
      instructionText.classList.add('instruction-text-blinking');
      console.log('Мигание включено - числа не выбраны');
    } else {
      instructionText.classList.remove('instruction-text-blinking');
      console.log('Мигание выключено - выбраны числа:', state.selectedNumbers);
    }
  }
}

export const counterState = {
  getCount: () => state.count,
  getBadCount: () => state.badCount,
  getGoodCount: () => state.goodCount,

  setCount: (value: number) => {
    state.count = value;
  },
  setBadCount: (value: number) => {
    state.badCount = value;
  },
  setGoodCount: (value: number) => {
    state.goodCount = value;
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

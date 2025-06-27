type State = {
  isGameStarted: boolean;
  count: number;
  badCount: number;
  goodCount: number;
  selectedNumbers: number[];
  attemptsCount: number;
};

const state = new Proxy<State>(
  {
    isGameStarted: false,
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

export const gameStartedState = {
  getGameStartedState: () => state.isGameStarted,

  setGameStartedState: (value: boolean) => {
    state.isGameStarted = value;
  }
};

function updateUI() {
  // Мобильные элементы статистики
  const attemptsElement = document.getElementById('attempts-count-temp');
  const yesElement = document.getElementById('attempts-count-yes');
  const notElement = document.getElementById('attempts-count-not');

  // Десктопные элементы статистики
  const desktopAttemptsElement = document.getElementById(
    'desktop-attempts-count-temp'
  );
  const desktopYesElement = document.getElementById(
    'desktop-attempts-count-yes'
  );
  const desktopNotElement = document.getElementById(
    'desktop-attempts-count-not'
  );

  const selectedNumbersList = document.getElementById('selected-numbers-list');
  const attemptsInput = document.getElementById(
    'attempts-input'
  ) as HTMLInputElement;
  const mobileAttemptsInput = document.getElementById(
    'mobile-attempts-input'
  ) as HTMLInputElement;

  // Обновляем мобильные элементы
  if (attemptsElement) attemptsElement.textContent = state.count.toString();
  if (yesElement) yesElement.textContent = state.goodCount.toString();
  if (notElement) notElement.textContent = state.badCount.toString();

  // Обновляем десктопные элементы
  if (desktopAttemptsElement)
    desktopAttemptsElement.textContent = state.count.toString();
  if (desktopYesElement)
    desktopYesElement.textContent = state.goodCount.toString();
  if (desktopNotElement)
    desktopNotElement.textContent = state.badCount.toString();

  // Синхронизируем поле ввода количества попыток с состоянием (десктоп)
  if (attemptsInput) {
    // Обновляем только если значение отличается, чтобы избежать циклических обновлений
    const currentValue = parseInt(attemptsInput.value) || 0;
    if (currentValue !== state.attemptsCount) {
      attemptsInput.value = state.attemptsCount.toString();
    }
  }

  // Синхронизируем поле ввода количества попыток с состоянием (мобильный)
  if (mobileAttemptsInput) {
    // Обновляем только если значение отличается, чтобы избежать циклических обновлений
    const currentValue = parseInt(mobileAttemptsInput.value) || 0;
    if (currentValue !== state.attemptsCount) {
      mobileAttemptsInput.value = state.attemptsCount.toString();
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

export function updateInstructionTextState() {
  // Десктопные элементы
  const instructionText = document.getElementById('instruction-text');
  const attemptsText = document.getElementById('attempts-text');
  const startButton = document.getElementById('start');

  // Мобильные элементы
  const mobileInstructionText = document.querySelector(
    '.mobile-instruction-text'
  );
  const mobileAttemptsText = document.querySelector('.mobile-attempts-text');
  const mobileStartButton = document.getElementById('mobile-start');

  const isAttemptsEntered = state.attemptsCount > 0;

  // Обновляем десктопные элементы
  if (instructionText && attemptsText && startButton) {
    if (state.selectedNumbers.length === 0) {
      // Числа не выбраны - мигает первый текст
      instructionText.classList.add('instruction-text-blinking');
      attemptsText.classList.remove('attempts-text-blinking');
      startButton.classList.remove('button-start-blinking');
    } else if (!isAttemptsEntered) {
      // Числа выбраны, но количество попыток не введено - мигает второй текст
      instructionText.classList.remove('instruction-text-blinking');
      attemptsText.classList.add('attempts-text-blinking');
      startButton.classList.remove('button-start-blinking');
    } else {
      // Всё заполнено - мигает кнопка Старт
      instructionText.classList.remove('instruction-text-blinking');
      attemptsText.classList.remove('attempts-text-blinking');
      startButton.classList.add('button-start-blinking');
    }
  }

  // Обновляем мобильные элементы
  if (mobileInstructionText && mobileAttemptsText && mobileStartButton) {
    if (state.selectedNumbers.length === 0) {
      // Числа не выбраны - мигает первый текст
      mobileInstructionText.classList.add('instruction-text-blinking');
      mobileAttemptsText.classList.remove('attempts-text-blinking');
      mobileStartButton.classList.remove('button-start-blinking');
    } else if (!isAttemptsEntered) {
      // Числа выбраны, но количество попыток не введено - мигает второй текст
      mobileInstructionText.classList.remove('instruction-text-blinking');
      mobileAttemptsText.classList.add('attempts-text-blinking');
      mobileStartButton.classList.remove('button-start-blinking');
    } else {
      // Всё заполнено - мигает кнопка Старт
      mobileInstructionText.classList.remove('instruction-text-blinking');
      mobileAttemptsText.classList.remove('attempts-text-blinking');
      mobileStartButton.classList.add('button-start-blinking');
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
      state.selectedNumbers = [...state.selectedNumbers, num];
    }
  },
  removeSelectedNumber: (num: number) => {
    const index = state.selectedNumbers.indexOf(num);
    if (index > -1) {
      state.selectedNumbers = state.selectedNumbers.filter(
        (_, i) => i !== index
      );
    }
  },
  clearSelectedNumbers: () => {
    state.selectedNumbers = [];
  }
};

// Глобальное состояние приложения
// let count = 0;
// let badCount = 0;
// let goodCount = 0;
// let selectedNumbers: number[] = [];

// export function getCount(): number {
//   return count;
// }

// export function getBadCount(): number {
//   return badCount;
// }

// export function getGoodCount(): number {
//   return goodCount;
// }
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
}

export function getCount(): number {
  return state.count;
}

export function getBadCount(): number {
  return state.badCount;
}

export function getGoodCount(): number {
  return state.goodCount;
}

export function setCount(value: number) {
  state.count = value;
}

export function setBadCount(value: number) {
  state.badCount = value;
}

export function setGoodCount(value: number) {
  state.goodCount = value;
}

updateUI();

export function incrementCount(): void {
  state.count += 1;
}

export function incrementBadCount(): void {
  state.badCount += 1;
}

export function incrementGoodCount(): void {
  state.goodCount += 1;
}

export function resetCounts(): void {
  state.count = 0;
  state.badCount = 0;
  state.goodCount = 0;
}

export function getSelectedNumbers(): number[] {
  return state.selectedNumbers;
}

export function addSelectedNumber(num: number): void {
  if (!state.selectedNumbers.includes(num)) {
    state.selectedNumbers.push(num);
  }
}

export function removeSelectedNumber(num: number): void {
  const index = state.selectedNumbers.indexOf(num);
  if (index > -1) {
    state.selectedNumbers.splice(index, 1);
  }
}

export function clearSelectedNumbers(): void {
  state.selectedNumbers = [];
}

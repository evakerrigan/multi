// Глобальное состояние приложения
let count = 0;
let badCount = 0;
let goodCount = 0;
let selectedNumbers: number[] = [];

export function getCount(): number {
  return count;
}

export function getBadCount(): number {
  return badCount;
}

export function getGoodCount(): number {
  return goodCount;
}

export function incrementCount(): void {
  count += 1;
}

export function incrementBadCount(): void {
  badCount += 1;
}

export function incrementGoodCount(): void {
  goodCount += 1;
}

export function resetCounts(): void {
  count = 0;
  badCount = 0;
  goodCount = 0;
}

export function getSelectedNumbers(): number[] {
  return selectedNumbers;
}

export function addSelectedNumber(num: number): void {
  if (!selectedNumbers.includes(num)) {
    selectedNumbers.push(num);
  }
}

export function removeSelectedNumber(num: number): void {
  const index = selectedNumbers.indexOf(num);
  if (index > -1) {
    selectedNumbers.splice(index, 1);
  }
}

export function clearSelectedNumbers(): void {
  selectedNumbers = [];
}

export interface CustomWindow extends Window {
  checkAnswer: () => void;
  handleListClick: (event: MouseEvent) => void;
}

declare global {
  interface Window {
    checkAnswer: () => void;
    handleListClick: (event: MouseEvent) => void;
  }
}

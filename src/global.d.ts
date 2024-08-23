declare global {
  interface Window {
    checkAnswer: () => void;
    handleListClick: (event: MouseEvent) => void;
  }
}

export {};

import Game from "./game/game";

document.addEventListener("DOMContentLoaded", () => {
  const game = new Game(4, 5, 1000);
  window.game = game;
});

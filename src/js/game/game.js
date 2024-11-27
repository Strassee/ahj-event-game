import pic from "../../img/goblin.png";

export default class Game {
  constructor(size, countGameEnd, speed) {
    this.app = document.querySelector(".app");
    this.size = size;
    this.countGameEnd = countGameEnd;
    this.speed = speed;
    this.onUserClick = this.onUserClick.bind(this);
    this.onBtnClick = this.onBtnClick.bind(this);
    this.createGame();
  }

  createGame() {
    this.img = document.createElement("img");
    this.img.src = pic;
    this.img.alt = "goblin";
    this.img.classList.add("picture");
    this.tableGame = document.createElement("table");
    this.tr = document.createElement("tr");
    for (let i = 0; i < this.size; i++) {
      this.tr.appendChild(document.createElement("td"));
    }
    for (let i = 0; i < this.size; i++) {
      this.tableGame.appendChild(this.tr.cloneNode(true));
    }
    this.app.appendChild(this.tableGame);
    this.tds = this.tableGame.querySelectorAll("td");
    this.button = document.querySelector(".btn");
    this.count = document.querySelector(".count");
    this.loss = document.querySelector(".loss");
    this.result = document.querySelector(".result");
    this.timer = null;
    this.lastposition = this.randomInteger(0, 3);
    this.tableGame.addEventListener("click", this.onUserClick);
    this.button.addEventListener("click", this.onBtnClick);
  }

  randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

  deletePicture() {
    if (this.img.parentNode) {
      this.img.parentNode.classList.remove("tdpicture");
      this.img.remove();
    }
  }

  addPicture() {
    let position = "";
    do {
      position = this.randomInteger(0, Math.pow(this.size, 2) - 1);
    } while (position === this.lastposition);
    this.tds[position].appendChild(this.img);
    this.tds[position].classList.add("tdpicture");
    this.lastposition = position;
  }

  onUserClick(e) {
    if (this.timer !== null) {
      this.stopTimer();
      if (this.img === e.target) {
        this.count.textContent = Number(this.count.textContent) + 1;
      } else {
        this.loss.textContent = Number(this.loss.textContent) + 1;
      }
      this.testResult() === 2 ? this.startTimer(this.speed) : this.stopGame();
    }
  }

  onBtnClick() {
    this.button.dataset.flag === "0" ? this.startGame() : this.stopGame();
  }

  testResult() {
    if (Number(this.count.textContent) === this.countGameEnd) {
      this.result.textContent = "Вы выиграли!";
      return 1;
    } else if (Number(this.loss.textContent) === this.countGameEnd) {
      this.result.textContent = "Вы проиграли!";
      return 0;
    } else {
      return 2;
    }
  }

  startGame() {
    this.button.dataset.flag = 1;
    this.button.innerText = "Stop";
    this.count.textContent = 0;
    this.loss.textContent = 0;
    this.result.textContent = "";
    this.startTimer(this.speed);
  }

  stopGame() {
    this.button.dataset.flag = 0;
    this.button.innerText = "Start";
    this.stopTimer();
  }

  startTimer(speed) {
    this.addPicture();
    this.timer = setInterval(() => {
      this.loss.textContent = Number(this.loss.textContent) + 1;
      if (this.testResult() === 2) {
        this.deletePicture();
        this.addPicture();
      } else {
        this.stopGame();
      }
    }, speed);
  }

  stopTimer() {
    this.deletePicture();
    clearInterval(this.timer);
    this.timer = null;
  }
}

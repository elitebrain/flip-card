const container = document.querySelector(".container");
const minDiv = document.querySelector(".min");
const secDiv = document.querySelector(".sec");
const startBtn = document.querySelector(".start_btn");
const stopBtn = document.querySelector(".stop_btn");
const resetBtn = document.querySelector(".reset_btn");
const noti = document.querySelector(".noti");
const cover = document.querySelector(".cover");

let timeout;
let activeCard = [];
let activeList = [];
let count = 15;
let interval;
let status = "stop";

const resetCard = () => {
  for (let i = 0; i < activeCard.length; i++) {
    // document.getElementById(activeCard[i]).style.transform = "";
    document.getElementById(activeCard[i]).classList.remove("active");
  }
  activeCard = [];
  clearTimeout(timeout);
  timeout = null;
};
const handleClickCard = e => {
  if (timeout || status !== "start") {
    return;
  }
  const el = e.target.parentElement;
  if (activeCard.length < 2) {
    if (activeCard[0] === el.id) {
      resetCard();
    } else {
      activeCard.push(el.id);
      el.classList.add("active");
    }
  }
  if (activeCard.length === 2) {
    if (
      document.getElementById(activeCard[0]).lastChild.style.backgroundColor !==
      document.getElementById(activeCard[1]).lastChild.style.backgroundColor
    ) {
      timeout = setTimeout(() => resetCard(), 500);
    } else {
      activeList.push(
        document.getElementById(activeCard[0]).id,
        document.getElementById(activeCard[1]).id
      );
      if (activeList.length === count * 2) {
        // setTimeout(() => alert("Finished"), 1000);
        status = "finish";
        resetBtn.disabled = false;
        resetBtn.classList.remove("disabled");
        noti.classList.add("active");
        cover.classList.add("active");
        clearInterval(interval);
      }
      activeCard = [];
    }
  }
};

const handleStart = () => {
  status = "start";
  startBtn.disabled = true;
  startBtn.classList.add("disabled");
  stopBtn.disabled = false;
  stopBtn.classList.remove("disabled");
  interval = setInterval(() => {
    const secStr = secDiv.innerText;
    const minStr = minDiv.innerText;
    const nextTime = parseInt(secStr, 10) + 1;
    if (nextTime < 60) {
      secDiv.innerText = setDigitNumber(nextTime);
    } else {
      secDiv.innerText = setDigitNumber(nextTime - 60);
      minDiv.innerText = setDigitNumber(parseInt(minStr, 10) + 1);
    }
  }, 1000);
  cover.classList.remove("active");
};

const handleStop = () => {
  status = "stop";
  stopBtn.disabled = true;
  stopBtn.classList.add("disabled");
  startBtn.disabled = false;
  startBtn.classList.remove("disabled");
  resetBtn.disabled = false;
  resetBtn.classList.remove("disabled");
  cover.classList.add("active");
  clearInterval(interval);
};

const resetGame = () => {
  status = "stop";
  const cardList = document.querySelectorAll(".card");
  for (let i = 0; i < cardList.length; i++) {
    cardList[i].classList.remove("active");
  }
  minDiv.innerText = "00";
  secDiv.innerText = "00";
  resetBtn.disabled = true;
  resetBtn.classList.add("disabled");
  noti.classList.remove("active");
  cover.classList.add("active");
  activeList = [];
};

const setDigitNumber = number => {
  if (number < 10) {
    return `0${number}`;
  } else {
    return `${number}`;
  }
};

const init = () => {
  let colors = [
    "#f00",
    "#800",
    "#0f0",
    "#080",
    "#00f",
    "#008",
    "#ff0",
    "#880",
    "#0ff",
    "#088",
    "#f0f",
    "#808",
    "#529",
    "#abc",
    "#47f"
  ];
  colors = colors
    .filter((e, i) => i < count)
    .concat(colors.filter((e, i) => i < count));
  const suffledColors = [];
  const colorsLength = colors.length;
  for (let i = 0; i < colorsLength; i++) {
    const rndIdx = parseInt(Math.random() * (colorsLength - i), 10);
    console.log(colorsLength, rndIdx);
    suffledColors.push(colors[rndIdx]);
    colors.splice(rndIdx, 1);
  }
  suffledColors.forEach((color, i) => {
    const cardFrame = document.createElement("div");
    cardFrame.classList.add("card_frame");
    const card = document.createElement("div");
    card.classList.add("card");
    card.id = `card_${i}`;
    const front = document.createElement("div");
    front.classList.add("front");
    front.innerText = "?";
    const back = document.createElement("div");
    back.classList.add("back");
    back.style.backgroundColor = color;
    card.appendChild(front);
    card.appendChild(back);
    card.addEventListener("click", handleClickCard);
    cardFrame.appendChild(card);
    container.appendChild(cardFrame);
  });
  startBtn.addEventListener("click", handleStart);
  stopBtn.addEventListener("click", handleStop);
  resetBtn.addEventListener("click", resetGame);
};

init();

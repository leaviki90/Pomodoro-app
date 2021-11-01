const iconSettings = document.getElementById("iconSettings");
const settings = document.getElementById("settings");
const form = document.getElementById("form");
const body = document.querySelector("body");
const displayTime = document.querySelector("span.display-time");
const displayPause = document.getElementById("displayPause");
const closeBtn = document.getElementById("closeBtn");
const circleClass = document.querySelector(".cls-1");
const controls = document.querySelector(".controls");
const btnSubmit = document.getElementById("btnSubmit");
const fontsContainer = document.getElementById("fontsContainer");
const btnColorDefault = document.querySelector("button.color-default");
const btnColorBlue = document.querySelector("button.color-blue");
const btnColorPurple = document.querySelector("button.color-purple");

let pomTime = 25 * 60000;
let shortTime = 5 * 60000;
let longTime = 15 * 60000;

//TIMER
let initialValue = pomTime;
let initialSeconds = initialValue / 1000;
let pauseIt = false;
let start = Date.now();
let circlePercent = 100;
let onPauseValue;

const timerInit = () => {
  let diff = Date.now() - start;
  let currentSeconds = Math.floor((initialValue - diff) / 1000);
  // console.log(Math.floor((initialValue - diff) / 1000));
  let minutes = (currentSeconds / 60) >> 0;
  let seconds = currentSeconds - minutes * 60;
  onPauseValue = currentSeconds * 1000;

  // console.log(currentSeconds);

  if (diff > initialValue) {
    console.log("ended");
    displayPause.innerText = "RESTART";
  } else if (pauseIt) {
    console.log("paused");
    displayPause.innerText = "START";
  } else {
    circlePercent = currentSeconds / (initialSeconds / 100);
    console.log(circlePercent);
    circleClass.style.strokeDashoffset = `calc(1030 - 10.3 * ${circlePercent})`;

    displayTime.innerText =
      (minutes > 9 ? minutes : "0" + minutes) +
      ":" +
      (("" + seconds).length > 1 ? "" : "0") +
      seconds;
    setTimeout(timerInit, 100);
  }
};

const pauseTimer = () => {
  console.log("pause function");
  displayPause.innerText = "RESUME";
  pauseIt = true;
  initialValue = onPauseValue;
};

const stopTimer = () => {
  console.log("stop function");
  circleClass.style.strokeDashoffset = `calc(1030 - 10.3 * 100)`;
  displayPause.innerText = "START";
  pauseIt = true;
};

const startTimer = () => {
  console.log("start function");
  displayPause.innerText = "PAUSE";
  pauseIt = false;
  start = Date.now();
  timerInit();
};

const resumeTimer = () => {
  console.log("resume function");
  displayPause.innerText = "START";
  pauseIt = false;
  start = Date.now();
  timerInit();
};

// startTimer();

//EVENT LISTENERS
iconSettings.addEventListener("click", () => {
  settings.classList.add("active");
});

body.addEventListener("click", (e) => {
  if (e.target === e.currentTarget) {
    settings.classList.remove("active");
  }
});

closeBtn.addEventListener("click", () => {
  settings.classList.remove("active");
});

form.addEventListener("click", (e) => {
  const clicked = e.target;
  const clickedParent = clicked.closest(".form-group");

  if (clicked.closest(".icon-arrow-up")) {
    ++clickedParent.querySelector("input").value;
  } else if (clicked.closest(".icon-arrow-down")) {
    --clickedParent.querySelector("input").value;
  }
});

displayPause.addEventListener(
  "click",
  (e) => {
    if (e.target.innerText === "RESTART") {
      resumeTimer();
      return;
    } else if (e.target.innerText === "PAUSE") {
      pauseTimer();
      return;
    } else if (e.target.innerText === "START") {
      startTimer();
      return;
    }
  },
  false
);

controls.addEventListener("click", (e) => {
  const clicked = e.target;
  const clickedParent = clicked.closest("label");

  if (clickedParent) {
    stopTimer();
    circlePercent = 100;

    if (clickedParent.getAttribute("for") === "control1") {
      displayTime.innerText = formatMsToMMSS(pomTime);
      initialValue = pomTime;
      initialSeconds = initialValue / 1000;
    } else if (clickedParent.getAttribute("for") === "control2") {
      displayTime.innerText = formatMsToMMSS(shortTime);
      initialValue = shortTime;
      initialSeconds = initialValue / 1000;
    } else if (clickedParent.getAttribute("for") === "control3") {
      displayTime.innerText = formatMsToMMSS(longTime);
      initialValue = longTime;
      initialSeconds = initialValue / 1000;
    }
  }
});

formatMsToMMSS = (milis) => {
  return new Date(milis).toISOString().substr(14, 5);
};

// document.documentElement.style.setProperty('--main-color', 'blue');
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const fontKumbh = document.querySelector("button.font-kumbh");
  const fontRoboto = document.querySelector("button.font-roboto");
  const fontSpace = document.querySelector("button.font-space");

  pomTime = document.getElementById("pomodoro").value * 60000;
  console.log(pomTime);
  shortTime = document.getElementById("short-break").value * 60000;
  console.log(shortTime);
  longTime = document.getElementById("long-break").value * 60000;
  console.log(longTime);

  stopTimer();
  displayTime.innerText = formatMsToMMSS(pomTime);
  initialValue = pomTime;
  initialSeconds = initialValue / 1000;
  document.getElementById("control1").click();

  if (fontKumbh.classList.contains("active")) {
    document.documentElement.style.setProperty(
      "--main-font",
      '"Kumbh Sans", sans-serif'
    );
  } else if (fontRoboto.classList.contains("active")) {
    document.documentElement.style.setProperty(
      "--main-font",
      '"Roboto Slab", serif'
    );
  } else {
    document.documentElement.style.setProperty(
      "--main-font",
      '"Space Mono", monospace;'
    );
  }

  if (btnColorDefault.classList.contains("active")) {
    document.documentElement.style.setProperty("--main-color", "#f87070");
  } else if (btnColorBlue.classList.contains("active")) {
    document.documentElement.style.setProperty("--main-color", "#70F3F8");
  } else {
    document.documentElement.style.setProperty("--main-color", "#D881F8");
  }

  settings.classList.remove("active");
});

fontsContainer.addEventListener("click", (e) => {
  const clicked = e.target;

  const clickedParent = clicked.closest("button");

  if (clickedParent) {
    e.currentTarget.querySelectorAll("button").forEach((item) => {
      item.classList.remove("active");
    });
    clickedParent.classList.add("active");
  }
});

colorsContainer.addEventListener("click", (e) => {
  const clicked = e.target;

  const clickedParent = clicked.closest("button");

  if (clickedParent) {
    e.currentTarget.querySelectorAll("button").forEach((item) => {
      item.classList.remove("active");
    });
    clickedParent.classList.add("active");
  }
});

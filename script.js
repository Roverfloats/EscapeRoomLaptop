let currentGeduld;
async function getGeduld() {
  const response = await fetch(`https://api.rutgerpronk.com/geduld`);
  const json = await response.json();
  const geduld = json.geduld;
  return geduld;
}
setInterval(async () => {
  currentGeduld = await getGeduld();
  document.getElementById("Contentness-meter").style.width =
    currentGeduld + "%";
  const intervalTiming = 500 + currentGeduld * 10;
  clearInterval(currentInterval)
  currentInterval = setInterval(timerTick, intervalTiming)
}, 1000);

let currentInterval;

function timerTick() {
  minutes = parseInt(timer / 60, 10);
  seconds = parseInt(timer % 60, 10);

  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  display.textContent = minutes + ":" + seconds;

  if (--timer < -1) {
    display.textContent = "DONE";
  }
}


let countdown = 45 * 60;
let timerDisplay = document.querySelector("#time");
var timer = duration,
    minutes,
    seconds;

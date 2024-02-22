let currentGeduld = 50;
let countdown = 45 * 60;
let timerDisplay = document.querySelector("#time");
let intro = document.querySelector("#Intro");
let startMusic = document.querySelector("#StartMusic");
let transition = document.querySelector("#Transition");
let LoopMusic = document.querySelector("#LoopMusic");
let knock1 = document.querySelector("#knock1");
let knock2 = document.querySelector("#Knock2");
let hallo = document.querySelector("#Hallo");
let WTHIE = document.querySelector("#WTHIE");
let car = document.querySelector("#car");
let opacityAmmount;

async function getGeduld() {
  const response = await fetch(`https://api.rutgerpronk.com/geduld`);
  const json = await response.json();
  return json.geduld;
}

function timerTick() {
  // TODO: logic to remove 1 second from countdown

  minutes = parseInt(countdown / 60, 10);
  seconds = parseInt(countdown % 60, 10);

  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  timerDisplay.textContent = minutes + ":" + seconds;

  if (--countdown < -1) {
    timerDisplay.textContent = "00:00";
  }

  if (countdown == 300 || countdown == 130 || countdown == 90 || countdown == 10){
    knock1.play();
  }
  if (countdown == 270 || countdown == 230 || countdown == 195 || countdown == 63 || countdown == 47){
    knock2.play();
  }
  if (countdown == 220 || countdown == 100){
    hallo.play();
  }
  if (countdown == 330){
    car.play();
  }

  if (countdown == -1){
    WTHIE.play();
    LoopMusic.pause();
  }
 
  // Recursively call timerTick based on interval
  // calculate a number between 2/3 and 1 1/3 based on currentGeduld
  const interval = 1000 * (2 / 3) + currentGeduld * 10 * (2 / 3);
  setTimeout(timerTick, interval);
}

function introAndMusic() {
    intro.play();
    intro.onended = function(){
        startMusic.play();
        startMusic.onended = function(){
            transition.play();
            transition.onended = function(){
                LoopMusic.loop = true
                LoopMusic.play()
            }
        }
    }
}

async function driver() {
  currentGeduld = await getGeduld();
  document.getElementById("Contentness-meter").style.width =
    currentGeduld + "%";
    
    if (currentGeduld < 50){
      opacityAmmount = ((-currentGeduld * 2) / 100) + 1;
    }
    else{
      opacityAmmount = 0;
    }

  document.getElementById("eyes").style.opacity = opacityAmmount;

  console.log(currentGeduld);
}

// This is the "main" function
(async () => {
  introAndMusic();

  // These two happen in parallel. timerTick is a recursive function. driver is called every second.
  timerTick();
  setInterval(driver, 1000);
})();

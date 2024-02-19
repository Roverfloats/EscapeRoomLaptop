let currentGeduld;
// let countdown = 45 * 60;
// let timerDisplay = document.querySelector("#time");
// let timer = duration,
//     minutes,
//     seconds;

async function setDefaultGeduld() {
    await fetch("https://api.rutgerpronk.com/geduld", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            newGeduld: 50
        }),
    });
}
async function getGeduld() {
    const response = await fetch(`https://api.rutgerpronk.com/geduld`);
    const json = await response.json();
    return json.geduld;
}

// function timerTick() {
//   minutes = parseInt(timer / 60, 10);
//   seconds = parseInt(timer % 60, 10);
//
//   minutes = minutes < 10 ? "0" + minutes : minutes;
//   seconds = seconds < 10 ? "0" + seconds : seconds;
//
//   timerDisplay.textContent = minutes + ":" + seconds;
//
//   if (--timer < -1) {
//     timerDisplay.textContent = "DONE";
//   }
// }

function timerTick() {
    // TODO: logic to remove 1 second from countdown

    // Recursively call timerTick based on interval
    // calculate a number between 2/3 and 1 1/3 based on currentGeduld
    const interval = 1000 * (2 / 3) + currentGeduld * 10 * (2 / 3)
    setTimeout(timerTick, interval);
}

async function driver() {
    currentGeduld = await getGeduld();
    document.getElementById("Contentness-meter").style.width =
        currentGeduld + "%";
}

// This is the "main" function
(async () => {
    await setDefaultGeduld();
    await driver();

    // These two happen in parallel. timerTick is a recursive function. driver is called every second.
    timerTick();
    setInterval(driver, 1000)
})();

const getS = (selector) => document.querySelector(selector);
//   Верхній блок
let clock = () => {
    let d = new Date();
    let dd = d.getDate();
    let mm = +d.getMonth() + 1;
    if (mm < 10) mm = "0" + mm;
    let yy = d.getFullYear();

    getS(".top-date").textContent = dd;
    getS(".top-month").textContent = mm;
    getS(".top-year").textContent = yy;

    let hh = d.getHours();
    if (hh < 10) hh = "0" + hh;
    let mn = d.getMinutes();
    if (mn < 10) mn = "0" + mn;
    let ss = d.getSeconds();
    if (ss < 10) ss = "0" + ss;

    getS(".top-hour").textContent = hh;
    getS(".top-minutes").textContent = mn;
    getS(".top-seconds").textContent = ss;
};
setInterval(clock, 1000);

// -------------Середній блок------------

let startMoment;
let interval;
let t;
let pause = 0;
let loopElem = 0;
let goTime = () => {
    let currentTime = new Date().getTime();
    t = currentTime - startMoment + pause;

    let ms = t % 1000;
    let ss = ((t - ms) % 60000) / 1000;
    let mn = ((t - ms - ss * 1000) % 3600000) / 60000;
    let hh = ((t - ms - ss * 1000 - mn * 60000) % 86400000) / 3600000;

    if (ms === 0) {
        getS(".stopwatch-miliseconds").textContent = "000";
    }
    if (ms > 0 && ms < 10) {
        getS(".stopwatch-miliseconds").textContent = "00" + ms;
    }
    if (ms > 99) {
        getS(".stopwatch-miliseconds").textContent = ms;
    }

    if (ss > 0 && ss < 10) {
        getS(".stopwatch-seconds").textContent = "0" + ss;
    }
    if (ss > 9) {
        getS(".stopwatch-seconds").textContent = ss;
    }
    if (mn > 0 && mn < 10) {
        getS(".stopwatch-minutes").textContent = "0" + mn;
    }
    if (mn > 9) {
        getS(".stopwatch-minutes").textContent = mn;
    }
    if (hh > 0 && hh < 9) {
        getS(".stopwatch-hours").textContent = "0" + hh;
    }
    if (hh > 9) {
        getS(".stopwatch-hours").textContent = hh;
    }
};

function start() {
    startMoment = new Date().getTime();
    interval = setInterval(goTime, 1);
    getS(".stopwatch-start").disabled = true;
    getS(".stopwatch-stop").disabled = false;

    getS(".stopwatch-loop").disabled = false;
    getS(".stopwatch-reset").disabled = false;
}
function stop() {
    clearInterval(interval);
    getS(".stopwatch-stop").disabled = true;
    getS(".stopwatch-start").disabled = false;
    pause = t;
}

function loop() {
    let ms = t % 1000;
    let ss = ((t - ms) % 60000) / 1000;
    let mn = ((t - ms - ss * 1000) % 3600000) / 60000;
    let hh = ((t - ms - ss * 1000 - mn * 60000) % 86400000) / 3600000;
    if (ms === 0) {
        ms = "000";
    }
    if (ms > 0 && ms < 10) {
        ms = "00" + ms;
    }
    if (ms > 99) {
        ms = ms;
    }
    if (ss > 0 && ss < 10) {
        ss = "0" + ss;
    }
    if (mn === 0) {
        mn = "00";
    }
    if (mn > 0 && mn < 10) {
        mn = "0" + mn;
    }
    if (mn > 9) {
        mn = mn;
    }
    if (hh === 0) {
        hh = "00";
    }
    if (hh > 0 && hh < 9) {
        hh = "0" + hh;
    }
    loopElem = `${hh}:${mn}:${ss}:${ms}`;
    let li = document.createElement("li");
    li.innerHTML = loopElem;
    getS(".loops").append(li);

    // обмеження кількості лупів у блоці
    if (getS(".loops").children.length === 4) {
        getS(".stopwatch-loop").disabled = true;
    }
}

function reset() {
    clearInterval(interval);
    getS(".stopwatch-stop").disabled = true;
    getS(".stopwatch-start").disabled = false;
    getS(".stopwatch-miliseconds").textContent = "000";
    getS(".stopwatch-seconds").textContent = "00";
    getS(".stopwatch-minutes").textContent = "00";
    getS(".stopwatch-hours").textContent = "00";
    getS(".loops").textContent = "";
    getS(".stopwatch-reset").disabled = true;
    getS(".stopwatch-loop").disabled = true;
}
// -----нижній блок------------------
let numOfMinutes = getS(".num-of-minutes");

getS(".plus").addEventListener("click", () => {
    getS(".num-of-minutes").innerHTML++;
    countMinutes = +getS(".num-of-minutes").textContent;
});
getS(".minus").addEventListener("click", () => {
    getS(".num-of-minutes").innerHTML--;
    countMinutes = +getS(".num-of-minutes").textContent;
});
let startTimerButton = getS(".start-timer");
let stopTimerButton = getS(".stop-timer");
let resetTimerButton = getS(".reset-timer");

//  ------------нижній правий----------------------
let countSeconds = 59;
countMinutes = +getS(".num-of-minutes").textContent;

function startTimer() {
    getS(".start-timer").disabled = true;
    getS(".stop-timer").disabled = false;
    getS(".reset-timer").disabled = false;

    if (countMinutes > 9) {
        getS(".timer-minutes").textContent = countMinutes;
    }
    if (countMinutes > -1 && countMinutes < 10) {
        getS(".timer-minutes").textContent = "0" + countMinutes;
    }
    startStopTimer = setInterval(goTimer, 1000);
}

function goTimer() {
    if (countMinutes === 0 && countSeconds === 0) {
        clearInterval(startStopTimer);
    }
    if (countSeconds === 59) {
        countMinutes--;
    }
    if (countSeconds > 9) {
        getS(".timer-seconds").textContent = countSeconds;
    }
    if (countSeconds <= 9 && countSeconds > -1) {
        getS(".timer-seconds").textContent = "0" + countSeconds;
    }
    if (countSeconds === -1) {
        countSeconds = 59;
    }
    getS(".timer-minutes").textContent = countMinutes;
    if (countMinutes < 10 && countMinutes > -1) {
        getS(".timer-minutes").textContent = "0" + countMinutes;
    }
    countSeconds--;
}

function stopTimer() {
    getS(".start-timer").disabled = false;
    getS(".start-timer").classList.add("active");
    getS(".stop-timer").disabled = true;
    clearInterval(startStopTimer);
}

function resetTimer() {
    getS(".stop-timer").disabled = true;
    getS(".start-timer").disabled = false;
    getS(".timer-seconds").textContent = "00";
    countMinutes = +getS(".num-of-minutes").textContent;
    getS(".timer-minutes").textContent = countMinutes;
    countSeconds = 59;
    clearInterval(startStopTimer);
}

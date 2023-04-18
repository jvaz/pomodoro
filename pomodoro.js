$(document).ready(function () {
  let interval;
  let timeLeft = 0; // initialize timeLeft variable
  let currentCycle = 1;
  let cycles = [
    { duration: 25, type: "Work" },
    { duration: 5, type: "Short Break" },
    { duration: 25, type: "Work" },
    { duration: 5, type: "Short Break" },
    { duration: 25, type: "Work" },
    { duration: 5, type: "Short Break" },
    { duration: 25, type: "Work" },
    { duration: 15, type: "Long Break" },
  ];

  let progressBar = document.getElementById("progress-bar");

  function startTimer(duration, display) {
    let timer = duration || timeLeft, minutes, seconds;
    //let progressBar = document.getElementById("progress-bar");
    //let progress = 0;
    //let progressStep = (100 / (duration * 60)) * 1000;

    interval = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.querySelector(".minutes").textContent = minutes;
      display.querySelector(".seconds").textContent = seconds;

      if (--timer < 0) {
        clearInterval(interval);
        if (currentCycle === cycles.length) {
          currentCycle = 1;
        } else {
          currentCycle++;
        }
        let nextCycle = cycles[currentCycle - 1];
        display.querySelector(".cycle").textContent =
          "Cycle " + currentCycle + " - " + nextCycle.type;
        startTimer(nextCycle.duration * 60, display);
      } else {
        timeLeft = timer; // update timeLeft variable
        //progress += progressStep;
        //progressBar.value = progress;
        updateBar();
      }
    }, 1000);
  }

  function updateBar() {
    let progress = ((currentCycle - 1) / (cycles.length - 1)) * 100;
    //progressBar.value = progress
    $(".progress-bar").css("width", progress + "%");
  }

  $("#start-btn").click(function () {
    let display = document.querySelector(".timer");
    let cycle = cycles[currentCycle - 1];
    display.querySelector(".cycle").textContent =
      "Cycle " + currentCycle + " - " + cycle.type;

    if (interval) {
      // timer already running, so pause it
      clearInterval(interval);
      interval = null;
    } else {
      // timer not running, so start it
      startTimer(timeLeft || cycle.duration * 60, display);
    }

    // toggle button text
    $(this).toggleClass("btn-primary btn-danger");
    $(this).text(interval ? "Stop" : "Start");
  });

  $("#reset-btn").click(function () {
    clearInterval(interval);
    let display = document.querySelector(".timer");
    display.querySelector(".cycle").textContent = "Cycle 1 - Work";
    display.querySelector(".minutes").textContent = "25";
    display.querySelector(".seconds").textContent = "00";
    currentCycle = 1;
    timeLeft = 0; // reset timeLeft variable
    $("#start-btn").removeClass("btn-danger").addClass("btn-primary").text("Start"); // reset start button
    document.getElementById("progress-bar").value = 0; // reset progress bar
    updateBar();
  });

  $("#dark-mode-btn").click(function () {
    $("body").toggleClass("dark-mode");
    $(this).toggleClass("btn-outline-warning btn-warning");
  });
});

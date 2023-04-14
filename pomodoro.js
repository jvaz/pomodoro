var minutes = 25;
var seconds = 0;
var timer;
var isTimerRunning = false;

function startTimer() {
    // check if timer is not already running
    if (!isTimerRunning) {
        // set isTimerRunning to true
        isTimerRunning = true;
        // change text of start button to 'Stop'
        $("#start-btn").text("Stop");
        // set interval to run every second
        timer = setInterval(function() {
        // check if seconds have reached 0
            if (seconds === 0) {
                // check if minutes have reached 0
                if (minutes === 0) {
                    // if both minutes and seconds are 0, stop the timer and show alert message
                    clearInterval(timer);
                    alert("Time's up!");
                    // set isTimerRunning to false
                    isTimerRunning = false;
                    // change text of start button to 'Start'
                    $("#start-btn").text("Start");
                    return;
                }
                // if seconds have reached 0 but minutes are not 0, decrease minutes by 1 and set seconds to 59
                minutes--;
                seconds = 59;
            } else {
                // if seconds are not 0, decrease seconds by 1
                seconds--;
            }
            // update minutes and seconds in HTML
            $(".minutes").text(minutes < 10 ? "0" + minutes : minutes);
            $(".seconds").text(seconds < 10 ? "0" + seconds : seconds);
      }, 1000); // set interval to run every 1000 milliseconds (1 second)
    } else {
        // if timer is already running, stop the timer, set isTimerRunning to false, and change text of start button to 'Start'
        isTimerRunning = false;
        $("#start-btn").text("Start");
        clearInterval(timer);
    }
}
  
function resetTimer() {
    clearInterval(timer);
    isTimerRunning = false;
    minutes = 25;
    seconds = 0;
    $(".minutes").text("25");
    $(".seconds").text("00");
    $("#start-btn").text("Start");
}

$(document).ready(function() {
  $("#start-btn").click(function() {
    startTimer();
  });
  $("#reset-btn").click(function() {
    resetTimer();
  });
  $("#dark-mode-btn").click(function() {
    $("body").toggleClass("dark-mode");
  });
});

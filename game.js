var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];

var started = false;
var level = 0;

$(document).keydown(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userPattern[currentLevel]) {
    if (gamePattern.length === userPattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    $("#level-title").text("Game Over, Press Any Key to Restart");

    $("body").addClass("game-over");
    var audio = new Audio("./sounds/wrong.mp3");
    audio.play();
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);

    level = 0;
    started = false;
    gamePattern = [];
  }
}

$(".btn").on("click", function (event) {
  userPattern.push(event.target.id);
  console.log(userPattern);

  buttonAnimation(event.target.id);
  buttonSound(event.target.id);

  checkAnswer(userPattern.length - 1);
});

function nextSequence() {
  userPattern = [];

  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  buttonAnimation(randomChosenColour);
  buttonSound(randomChosenColour);

  level++;
  $("#level-title").text("Level " + level);
}

function buttonAnimation(currentButton) {
  activeButton = $("#" + currentButton);
  activeButton.fadeOut(100).fadeIn(100);
  activeButton.addClass("pressed");
  setTimeout(() => {
    activeButton.removeClass("pressed");
  }, 100);
}

function buttonSound(currentButton) {
  var audio;
  audio = new Audio("./sounds/" + currentButton + ".mp3");
  audio.play();
}
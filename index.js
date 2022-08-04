buttonColors = ["red", "green", "blue", "yellow"];
gamePattern = [];
userSelectedColors = [];
level = 0;
isStarted = false;
currentSequence = 0;

$(document).keydown(function (e) {
  if (isStarted === false) {
    nextSequence();
    isStarted = true;
  }
});

$(".btn").click(function () {
  var userChosenColor = this.getAttribute("id");
  userSelectedColors.push(userChosenColor);
  playAudio(userChosenColor);
  clickAnimation(userChosenColor);
  checkSequence();
});

function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);
  randomNumber = Math.floor(Math.random() * 4);
  randomButton = buttonColors[randomNumber];
  gamePattern.push(randomButton);
  playAudio(randomButton);
  buttonAnimate(randomButton);
}

function checkSequence() {
  currentCorrectColor = gamePattern[currentSequence];
  if (currentCorrectColor === userSelectedColors.pop()) {
    currentSequence++;
    checkIsSequenceDone();
  } else {
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    playAudio("wrong");
    isStarted = false;
    level = 0;
    currentSequence = 0;
    userSelectedColors = [];
    gamePattern = [];
    $("#level-title").text("Game over. Press any key to restart");
  }
}

function checkIsSequenceDone() {
  if (currentSequence === level) {
    currentSequence = 0;
    userSelectedColors = [];
    setTimeout(function () {
      nextSequence();
    }, 1000);
  }
}

function playAudio(key) {
  switch (key) {
    case "red":
      var redAudio = new Audio("sounds/red.mp3");
      redAudio.play();
      break;

    case "green":
      var greenAudio = new Audio("sounds/green.mp3");
      greenAudio.play();
      break;

    case "blue":
      var blueAudio = new Audio("sounds/blue.mp3");
      blueAudio.play();
      break;

    case "yellow":
      var yellowAudio = new Audio("sounds/yellow.mp3");
      yellowAudio.play();
      break;

    case "wrong":
      var wrongAudio = new Audio("sounds/wrong.mp3");
      wrongAudio.play();

    default:
      break;
  }
}

function buttonAnimate(key) {
  switch (key) {
    case "red":
      $("#red").fadeOut(100).fadeIn(100);
      break;

    case "green":
      $("#green").fadeOut(100).fadeIn(100);
      break;

    case "blue":
      $("#blue").fadeOut(100).fadeIn(100);
      break;

    case "yellow":
      $("#yellow").fadeOut(100).fadeIn(100);
      break;

    default:
      break;
  }
}

function clickAnimation(key) {
  $("#" + key).addClass("pressed");
  setTimeout(function () {
    $("#" + key).removeClass("pressed");
  }, 100);
}

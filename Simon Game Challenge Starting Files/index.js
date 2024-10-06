var colorArray = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userChosenPattern = [];

var started = false;
var level = 0;

$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");

    userChosenPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    // Check the user's answer after they have clicked.
    checkAnswer(userChosenPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userChosenPattern[currentLevel]) {
        console.log("success");

        if (userChosenPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");
        // Optionally, you could add a reset function here
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200)
        $("#level-title").text("Game Over..Press any key to restart");

        startOver();
    }
}

function nextSequence() {
    userChosenPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = colorArray[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(400).fadeOut(400).fadeIn(100);
    playSound(randomChosenColor);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}


function startOver()
{
    level = 0;
    gamePattern = [];
    started = false;
}

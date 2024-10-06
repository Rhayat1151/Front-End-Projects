var numberofbtn = document.querySelectorAll(".drum").length;

for (let i = 0; i < numberofbtn; i++) {
    document.querySelectorAll(".drum")[i].addEventListener("click", function() {

        var btninnerhtm = this.innerHTML;

        makesound(btninnerhtm) // Debugging line to check button
        addinganimation(btninnerhtm)


    });
}




document.addEventListener("keypress",function (event) {
    makesound(event.key);
    addinganimation(event.key)
    
})



function makesound(key) {
    switch (key) {
        case "w":  
            var crash = new Audio("sounds/crash.mp3");
            crash.play();
            break;

        case "a":      
            var kickbass = new Audio("sounds/kick-bass.mp3");
            kickbass.play();
            break;

        case "s":
            var snare = new Audio("sounds/snare.mp3");
            snare.play();
            break;

        case "d": 
            var tom1 = new Audio("sounds/tom-1.mp3");
            tom1.play();
            break;

        case "j":
            var tom2 = new Audio("sounds/tom-2.mp3");
            tom2.play();
            break;

        case "k":
            var tom3 = new Audio("sounds/tom-3.mp3");
            tom3.play();
            break;

        case "l":
            var tom4 = new Audio("sounds/tom-4.mp3");
            tom4.play();
            break;

        default:
            console.log("No match found for:", btninnerhtm);  // Debugging line for default case
            break;
    }
}




function addinganimation(value)
{
    var buttonbynow = document.querySelector("."+value);
    buttonbynow.classList.add("pressed");

    setTimeout(function (params) {
        buttonbynow.classList.remove("pressed");
        
    },100);
}
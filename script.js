/* randomize cursor to dude pic*/
function setCursor() {
    const gangsAllHere = [ 
        'alex.png', 
        'amir.png', 
        'beardo.png', 
        'jake.png',
        'jeff.png',
        'juicy.png',
    ];

    var i = Math.floor(Math.random() * gangsAllHere.length);
    document.documentElement.style.setProperty('--cursor-url', "url(assets/" + gangsAllHere[i] + ")");
}

/* turn robot into an absolute creeper */
function aimEyes() {
    var eye = document.querySelectorAll(".eye");
    eye.forEach((eye) => {
        let x = eye.getBoundingClientRect().left + eye.clientWidth / 2;
        let y = eye.getBoundingClientRect().top + eye.clientHeight / 2;
        let radian = Math.atan2(event.pageX - x, event.pageY - y);
        let rot = radian * (180 / Math.PI) * -1 + 270;
        eye.style.transform = "rotate(" + rot + "deg)";
    });
}

/* make robot jiggle when hovering over a link */
function robotDance() {
    links = document.querySelectorAll("a");
    
    for (i = 0; i < links.length; ++i) {
        links[i].addEventListener("mouseover", addJiggle);
        links[i].addEventListener("mouseout", remJiggle);
    }
}

/* turn on robot jiggle animation */
function addJiggle() {
    document.querySelector("#robot-body").classList.add("jiggle");
    document.querySelector(".eyes").classList.add("jiggle");
}

/* turn off robot jiggle animation */
function remJiggle() {
    document.querySelector("#robot-body").classList.remove("jiggle");
    document.querySelector(".eyes").classList.remove("jiggle");
}

/* redirect laser to face/aim at cursor */
function aimLaser(id) {
    var laser = document.getElementById(id);
    var x = laser.getBoundingClientRect().left + laser.clientWidth / 2;
    var y = laser.getBoundingClientRect().top + laser.clientHeight / 2;
    var radian = Math.atan2(event.pageX - x, event.pageY - y);
    var rot = radian * (180 / Math.PI) * -1 + 265;
    laser.style.transform = "rotate(" + rot + "deg)";
}

/* reset laser to start position and make invisible */
function resetLasers() {
    var leftLaser = document.getElementById("left-laser");
    var rightLaser = document.getElementById("right-laser");
    leftLaser.style.top = "75px";
    leftLaser.style.left = "30px";
    rightLaser.style.top = "80px";
    rightLaser.style.left = "60px";
    leftLaser.style.backgroundColor = "rgba(255, 0, 0, 0)";
    rightLaser.style.backgroundColor = "rgba(255, 0, 0, 0)";
}

/* shoot given laser from given starting position */
function shootLaser(id, startX, startY) {
    aimLaser(id);
    let fr = null;
    let laser = document.getElementById(id);
    laser.style.backgroundColor = "rgba(255, 0, 0, .8)";
    let laserX = startX;
    let laserY = startY; // starting laser pos
    let mouseX = event.pageX;
    let mouseY = event.pageY;
    let slopeX = (mouseX - laserX - 20) / 50;
    let slopeY = (mouseY - laserY) / 50;
    clearInterval(fr);
    fr = setInterval(frame, 5);
    function frame() {
        if ((laserX >= mouseX - 35) && (laserY >= mouseY - 50)) {
            clearInterval(fr);
            resetLasers();
        } else {
            laserY += slopeY;
            laserX += slopeX;
            laser.style.top = laserY + 'px';
            laser.style.left = laserX + 'px';
        }
    }
}

/* add fire gif at cursor position */
let timeoutID;
function addFire() {
    let fireGif = document.createElement('img');
    fireGif.id = "fire-gif";
    let fireDiv = document.getElementById('fire');
    fireGif.src = "assets/fire.gif";
    fireDiv.style.top = (event.pageY - 75) + "px";
    fireDiv.style.left = (event.pageX - 75) + "px";
    setTimeout(() => {
        fireDiv.appendChild(fireGif)
    }, 350);
    timeoutID = setTimeout(remFire, 1500);
}

/* remove fire gif */
function remFire() {
    document.getElementById('fire-gif').remove();
}

/* shoot left and right lasers to cursor position */
function shootLasers() {
    shootLaser("left-laser", 30, 75);
    shootLaser("right-laser", 60, 80);
    if(!(document.getElementById("fire-gif"))) {
        addFire()
    }
}

robotDance();
setCursor();
document.querySelector("body").addEventListener("mousemove", () => {
    aimEyes();
});
document.querySelector("body").addEventListener("click", shootLasers);
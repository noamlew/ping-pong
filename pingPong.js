const screen = document.getElementById('gameScreen');
const ctx = screen.getContext('2d');

const backgroundMusic = new Audio();
backgroundMusic.src = "audio/Cinema Sins Background Song (Clowning Around) - Background Music (HD).mp3";
const pingPongAudio = new Audio();
pingPongAudio.src = "audio/Ping pong ball bouncing sound-[AudioTrimmer.com].mp3";
const loserAudio = new Audio();
loserAudio.src = "audio/The Price is Right Ding - Gaming Sound Effect (HD)-[AudioTrimmer.com].mp3";


const surfaceWidth = 7;
const surfaceHeight = 40;

const score = {
    left : 0,
    right : 0,
}


const ballColors = ['yellow', 'violet', 'teal', 'springgreen', 'purple', 'orange', 'mediumspringgreen'];
let color = 0;


window.onload = drawStart()


function drawStart () {
    
    // draw line
    ctx.beginPath()
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'white';
    ctx.moveTo(screen.width/2, 0);
    ctx.lineTo(screen.width/2, screen.height);
    ctx.stroke();

    // draw surface
    ctx.fillStyle = 'blue';
    ctx.fillRect(5, screen.height/2 - surfaceHeight/2, surfaceWidth, surfaceHeight);
    ctx.fillStyle = 'red';
    ctx.fillRect(screen.width - (5 + surfaceWidth), screen.height/2 - surfaceHeight/2, surfaceWidth, surfaceHeight);

    // draw the ball
    ctx.fillStyle = ballColors[color];
    ctx.beginPath();
    ctx.arc(screen.width/2, screen.height/2, 4, 0, Math.PI*2, false);
    ctx.fill();

    // draw circle
    ctx.strokeStyle = 'white';
    ctx.beginPath()
    ctx.arc(screen.width/2, screen.height/2, 30, 0, Math.PI*2, false);
    ctx.stroke();

    // draw the text points
    ctx.font = '30px Arial'
    ctx.fillStyle = 'red';
    ctx.fillText(`${score.right}`, screen.width - screen.width/4, 25);
    ctx.fillStyle = 'blue';
    ctx.fillText(`${score.left}`, screen.width/4 - 10, 25);

    // call function
    surfaceRightMove();
    surfaceLeftMove();
}



let canEnter = true;

document.addEventListener('keydown', (event) => {

    // start the game
    if (canEnter === true && event.keyCode === 32) {
        backgroundMusic.volume = 0.05;
        pingPongAudio.volume = 0.25;
        backgroundMusic.play();
        ballMove();
    }
})

const ballLocation = {
    x : screen.width/2,
    y : screen.height/2
}

const ballMoves = {
    x : 1,
    y : 1,
}

const surfaceY = {
    left : screen.height/2 - surfaceHeight/2,
    right : screen.height/2 - surfaceHeight/2,
}



let ballContinue = true;
let speed = 21;

function ballMove () {

    // Checks if the ball has collided and move the ball
    if (ballLocation.x <= surfaceWidth + 5 && ballLocation.y <= surfaceY.left + surfaceHeight && ballLocation.y >= surfaceY.left) {
        pingPongAudio.play();
        color++;
        speed -= 3;
        if (ballLocation.y > surfaceY.left + (surfaceHeight - 10)) {
            ballMoves.x = 1;
            ballMoves.y = 1;
        } else if (ballLocation.y < surfaceY.left + 10) {
            ballMoves.y = -1;
            ballMoves.x = 1;
        } else {
            ballMoves.x = -(ballMoves.x)
        }
    } else if (ballLocation.x >= screen.width - (surfaceWidth + 5) && ballLocation.y <= surfaceY.right + surfaceHeight && ballLocation.y >= surfaceY.right) {
        color++;
        pingPongAudio.play();
        speed -= 3;
        if (ballLocation.y > surfaceY.right + (surfaceHeight - 10)) {
            ballMoves.x = -1;
            ballMoves.y = 1;
        } else if (ballLocation.y < surfaceY.right + 10) {
            ballMoves.y = -1;
            ballMoves.x = -1;
        } else {
            ballMoves.x = -(ballMoves.x)
        }
    } else if (ballLocation.y >= screen.height || ballLocation.y <= 0) {
        ballMoves.y = -(ballMoves.y);
        pingPongAudio.play();
        color++;
    } else if (ballLocation.x < 0 || ballLocation.x > screen.width){
        ballContinue = false;
        endGame();
    }
    if (ballContinue) {
        if (color === ballColors.length - 1) {
            color = 0;
        }
        ballLocation.x = ballLocation.x + ballMoves.x;
        ballLocation.y = ballLocation.y + ballMoves.y;
        setTimeout(ballMove, speed);
        backgroundMusic.play();
        drawAgain();
    }
}


function endGame () {

    loserAudio.volume = 0.3;
    loserAudio.play();

    // updare score
    if (ballLocation.x < surfaceWidth + 5) {
        score.right++;
    } else {
        score.left++;
    }

    // reset all
    ctx.clearRect(0, 0, screen.width, screen.height);
    drawStart();
    ballContinue = true;

    ballLocation.x = screen.width/2;
    ballLocation.y = screen.height/2
    
    ballMoves.x = 1;
    ballMoves.y = 1;

    surfaceY.left = screen.height/2 - surfaceHeight/2;
    surfaceY.right = screen.height/2 - surfaceHeight/2;

    speed = 21;
}




function surfaceRightMove () {

    // right surface move
    document.addEventListener('keydown', (event) => {
        if (ballLocation.x >= screen.width/2) {
            switch (event.keyCode) {
                case 38:
                    if (surfaceY.right > 0) {
                        surfaceY.right -= 2;
                    }
                    break;
                case 40:
                    if (surfaceY.right < screen.height - surfaceHeight) {     
                        surfaceY.right += 2;
                    }
                    break;
            }
            drawAgain()
        }
    })
}


function surfaceLeftMove () {

    // left surface move
    document.addEventListener('keydown', (event) => {
        if (ballLocation.x <= screen.width/2) {
            switch (event.keyCode) {
                case 87:
                    if (surfaceY.left > 0) {
                        surfaceY.left -= 2;
                    }
                    break;
                case 83:
                    if (surfaceY.left < screen.height - surfaceHeight) { 
                        surfaceY.left += 2;
                    }
                    break;
            }
            drawAgain();
        }
    })
}



function drawAgain () {

    // draw all again
    ctx.clearRect(0, 0, screen.width, screen.height);

    ctx.beginPath()
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'white';
    ctx.moveTo(screen.width/2, 0);
    ctx.lineTo(screen.width/2, screen.height);
    ctx.stroke();

    ctx.beginPath()
    ctx.arc(screen.width/2, screen.height/2, 30, 0, Math.PI*2, false);
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = ballColors[color];
    ctx.arc(ballLocation.x, ballLocation.y, 4, 0, Math.PI*2, false);
    ctx.fill();

    ctx.fillStyle = 'blue';
    ctx.fillText(`${score.left}`, screen.width/4 - 10, 25);
    ctx.fillRect(5, surfaceY.left, surfaceWidth, surfaceHeight);

    ctx.fillStyle = 'red';
    ctx.fillRect(screen.width - (5 + surfaceWidth), surfaceY.right, surfaceWidth, surfaceHeight);
    ctx.fillText(`${score.right}`, screen.width - screen.width/4, 25);

    backgroundMusic.play();
}



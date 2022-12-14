const bird = document.getElementById("bird");
const gameDisplay = document.getElementById("gameContainer");
const scoreText = document.getElementById("scoreText");
const sky = document.getElementById("sky");
const ground = document.getElementById("ground");
const diedAnnounce = document.getElementById("gameEndText");
const playAgain = document.getElementById("res");
const jumpSound = new Audio();
const hitSound = new Audio();
const pointSound = new Audio();
jumpSound.src = "Everything/sfx_wing.wav";
hitSound.src = "Everything/sfx_hit.wav";
pointSound.src = "Everything/sfx_point.wav";

let score = 0;

const gravity = 3;
let birdLeft = 220;
let birdBottom = 250;
let running = false;
let gap = 440;
startGame();
generatePipe();
let scoreTime = setInterval(()=>{
  score+=1;
  scoreText.textContent = score;
  pointSound.play();
},1900);

playAgain.addEventListener("click",restart);
window.addEventListener("click",jump);

let GametimeId = setInterval(startGame,20);

function startGame(){
  running = true;
  bird.style.bottom = birdBottom + "px";
  bird.style.left = birdLeft + "px"; 
  birdBottom -= gravity
  bird.style.bottom = birdBottom + "px";
}

function jump(){
  if (birdBottom<690&&running){
    birdBottom += 55;
    jumpSound.play();
  }
  bird.style.bottom = birdBottom + 'px';
    
}

function generatePipe(){
  let pipeLeft = 450;
  let randomHeight = Math.random()*100;
  let pipeBottom = randomHeight;
  const pipe = document.createElement('div');
  const topPipe = document.createElement('div');
  if(running) {
    pipe.classList.add('pipe');
    topPipe.classList.add('topPipe');
  }
  gameDisplay.appendChild(pipe);
  gameDisplay.appendChild(topPipe);
  pipe.style.left = pipeLeft + 'px';
  topPipe.style.left = pipeLeft + 'px';
  pipe.style.bottom = pipeBottom + 'px';
  topPipe.style.bottom = pipeBottom + gap + 'px';
  //pipe moving
  function movePipe(){
    if(running){
      pipeLeft -= 2;
      pipe.style.left = pipeLeft + 'px';
      topPipe.style.left = pipeLeft + 'px';
      //remove pipe
      if(pipeLeft === -60){
        clearInterval(timeId);
        gameDisplay.removeChild(pipe);
        gameDisplay.removeChild(topPipe);
    }
    }  
    //game over
    if((pipeLeft > 200&& pipeLeft <273 &&birdLeft===220 && (birdBottom<pipeBottom + 300 || birdBottom>pipeBottom+gap-45 ) ||(birdBottom === 130))){
      gameOver();      
      clearInterval(scoreTime);
    }
  }

  let timeId = setInterval(movePipe,20);
  if(running) setTimeout(generatePipe, 1900);//generate pipes
}

function gameOver(){
  clearInterval(GametimeId);
  running = false;
  diedAnnounce.style.display = "block";
  playAgain.style.display = "block";
  hitSound.play();
  setTimeout(()=>{
    hitSound.src="";
  },500);
}

function restart(){
  location.reload();
}
const bird = document.getElementById("bird");
const gameDisplay = document.getElementById("gameContainer");
const scoreText = document.getElementById("scoreText");
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
},1900);


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
  }
    bird.style.bottom = birdBottom + 'px';
   console.log(birdBottom);  
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
}


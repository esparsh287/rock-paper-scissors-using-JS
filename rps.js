let score=JSON.parse(localStorage.getItem('score'));
    if (!score){
      score={
        wins: 0,
        losses:0 ,
        ties: 0
      }
    }
    updateScore(); 
    
    document.querySelector('.js-rock-button').addEventListener('click', ()=>{
      playGame('rock');
    });
    document.querySelector('.js-paper-button').addEventListener('click', ()=>{
      playGame('paper');
    });
    document.querySelector('.js-scissors-button').addEventListener('click', ()=>{
      playGame('scissors');
    });


    document.body.addEventListener('keydown', (event)=>{
      if(event.key==='r'){
        playGame('rock');
      }else if(event.key==='p'){
        playGame('paper');
      }else if(event.key==='s'){
        playGame('scissors');
      }else{
        alert('Enter valid keys');
      }
    });
     function playGame(playerMove){
      const computerMove=pickComputerMove();
  let result='';
        if (playerMove==='Scissors'){
          if(computerMove=== 'rock'){
            result='You lose.';
          }else if(computerMove==='paper'){
            result='You win.';
          }
          else if(computerMove==='Scissors'){
            result='Tie.';
          }
        }
        else if(playerMove==='paper'){
            if(computerMove=== 'rock'){
              result='You win.';
            }else if(computerMove==='paper'){
              result='Tie.';
            }
            else if(computerMove==='Scissors'){
              result='You lose.';
            }
        }
        else if(playerMove==='rock'){
          if(computerMove==='rock'){
            result='Tie.';
          }else if(computerMove==='paper'){
            result='You lose.';
          }
          else if(computerMove==='Scissors'){
            result='You win.';
          }
        }

      if(result==='You win.'){
        score.wins++;
      }else if( result==='You lose.'){
        score.losses++;
      }else if(result==='Tie.'){
        score.ties++;
      }
      localStorage.setItem('score', JSON.stringify(score));
      updateScore();
      document.querySelector('.js-result').innerHTML=result;
      document.querySelector('.js-moves').innerHTML= `You <img src="images/${playerMove}-emoji.png" 
      class="move-icon"><img src="images/${computerMove}-emoji.png" class="move-icon">
       Computer`;
      
  }  
  function updateScore(){
    document.querySelector('.js-score').innerHTML=`Wins: ${score.wins} Loses: ${score.losses} Ties: ${score.ties}`;
  }
    function pickComputerMove(){
        const randomNumeber=Math.random();
        let computerMove='';
      if(randomNumeber>=0 && randomNumeber< 1/3){
        computerMove='rock';
      } else if(randomNumeber>=1/3 && randomNumeber< 2/3){
        computerMove='paper';
      }else if(randomNumeber>=2/3 && randomNumeber< 1){
        computerMove='Scissors';
      }
      return computerMove;
    }

    let isAutoPlaying=false;
    let intervalId;

  

    function autoPlay(){
      if(!isAutoPlaying){
        intervalId=setInterval(()=>{
          const playerMove= pickComputerMove();
          playGame(playerMove);
        }, 1000);
        isAutoPlaying=true;
    }else{
      clearInterval(intervalId);
      isAutoPlaying=false;
    }
    }
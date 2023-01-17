import { DateTime, Interval } from "luxon";
import './style.css'
let homeCount = 0;
let awayCount = 0;
let homeFouls = [false, false,false, false, false];
let awayFouls = [false, false,false, false, false];
let isRunning = false;
let nInterId;
let currPause = {
  min:0,
  sec:0
}

function handleChange(e){
  let side = e.slice(0,4)
  let i = convertToIndex(e);
  if(side === "home"){
    homeFouls[i] = !homeFouls[i]
  } else {
    awayFouls[i] = !awayFouls[i]
  }
  if(side === 'home' && fouledOut(side)){
    document.querySelectorAll('.btn').forEach(x => x.setAttribute('disabled', true))
  } else if(side === 'away' && fouledOut(side)){
    document.querySelectorAll('.btn').forEach(x => x.setAttribute('disabled', true))
  } else {
    console.log('no one has fouled out')
  }
}

function fouledOut(side){
  if(side === 'home'){
    return homeFouls.every((val)=> val === true)
  } else {
    return awayFouls.every((val)=> val === true)
  }
}
function convertToIndex(str){
  return Number(str.slice(-1))
}

function handleTimer(){
  let minute = Number(document.getElementById('time-min').textContent)
  let second = Number(document.getElementById('time-sec').textContent)
  if(minute === 0 && second === 0){
    resetTimer()
  }

  if(isRunning){
    clearInterval(nInterId)
    nInterId = null;
    currPause.min = Number(document.getElementById('time-min').textContent)
    currPause.sec = Number(document.getElementById('time-sec').textContent)
    isRunning = false;
  } else {
    updateTimer(minute, second)
    nInterId = setInterval(removeOneSec,1000)  
    isRunning = true;
  }
}

function removeOneSec(){
  let minute = Number(document.getElementById('time-min').textContent)
  let second = Number(document.getElementById('time-sec').textContent);
  if(minute > 0 && second === 0){
    minute-= 1;
    second = 59;
    updateTimer(minute, second);
  } else if(second > 0){
    second-= 1;
    updateTimer(minute, second);
  } else {
    console.log('times up')
    clearInterval(nInterId);
    updateTimer(minute, second)
    nInterId = null;
    isRunning = false;
    resetTimer()
  }  
}

function updateTimer(min, sec){
  document.getElementById('time-min').textContent = `0${min}`;
  if(sec < 10){
    document.getElementById('time-sec').textContent = `0${sec}`;
  } else {
    document.getElementById('time-sec').textContent = sec;
  }
}

function resetTimer(){
  document.getElementById('time-min').textContent = `05`;
  document.getElementById('time-sec').textContent = `00`;
}

function addPoints(team, num, element){
  if(team === "home"){
    homeCount+=num;
    document.getElementById(element).textContent = homeCount;
    checkLead()
  } else {
    awayCount+=num;
    document.getElementById(element).textContent = awayCount;
    checkLead()
  }
}

function checkLead(){
  if(homeCount > awayCount){
    document.getElementById('home-score-div').classList.remove('losing')
    document.getElementById('home-score-div').classList.add('winning')
    document.getElementById('away-score-div').classList.remove('winning');
    document.getElementById('away-score-div').classList.add('losing');
  } else if( homeCount < awayCount){
    document.getElementById('home-score-div').classList.remove('winning')
    document.getElementById('home-score-div').classList.add('losing')
    document.getElementById('away-score-div').classList.remove('losing');
    document.getElementById('away-score-div').classList.add('winning');
  } else {
    document.getElementById('home-score-div').classList.remove('winning', 'losing')
    document.getElementById('away-score-div').classList.remove('winning', 'losing')
  }
}

function startNewGame(){
  homeCount = 0;
  awayCount = 0;
  homeFouls = [false, false,false, false, false];
  awayFouls = [false, false,false, false, false];
  document.getElementById('home-score-text').textContent = homeCount;
  document.getElementById('away-score-text').textContent = awayCount;
  document.querySelectorAll('.btn').forEach(x => x.removeAttribute('disabled'))
  document.querySelectorAll('.fouls').forEach(x=>x.checked = false)
  document.getElementById('home-score-div').classList.remove('winning', 'losing')
  document.getElementById('away-score-div').classList.remove('winning', 'losing')
}


document.querySelector('#app').innerHTML = `
  <div id="wrapper">
    <div id="stretch-goals-container">
      <div id="home-fouls-container" class="fouls-flexed">
        <div id="home-text-container">
          <span class="foul-text">👩 Fouls</span>
        </div>
        <div id="home-checkbox-container">
          <input name='home-0' class="fouls" type="checkbox">
          <input name='home-1' class="fouls" type="checkbox">
          <input name='home-2' class="fouls" type="checkbox">
          <input name='home-3' class="fouls" type="checkbox">
          <input name='home-4' class="fouls" type="checkbox">
        </div> 
      </div>
      <div id="timer-container">
        <p id="time-text"><span id="time-min">05</span>:<span id="time-sec">00<span></p>
        <button id='time-btn'>⏯️</button>
      </div>
      <div id="away-fouls-container" class="fouls-flexed">
        <div id="away-checkbox-container">
          <input name='away-0' class="fouls" type="checkbox">
          <input name='away-1' class="fouls" type="checkbox">
          <input name='away-2' class="fouls" type="checkbox">
          <input name='away-3' class="fouls" type="checkbox">
          <input name='away-4' class="fouls" type="checkbox">
        </div>
        <div id="away-text-container">
          <span class="foul-text">👨 Fouls</span>
        </div>
      </div>
    </div>
    <div id="scoreboard-title-container">
      <h1 class="scoreboard-title">HOME</h1>
      <h1 class="scoreboard-title">AWAY</h1>
    </div>
    <div id="scoreboard-score-container">
      <div id="home-score-div" class="scores">
        <p id="home-score-text" class="score-text">0</p>
      </div>
      <div id="away-score-div" class="scores">
        <p id="away-score-text" class="score-text">0</p>
      </div>
    </div>
    <div id="scoreboard-btns-container">
      <div id="home-btns">
        <button id="home-plus-one" class="btn">+1</button>
        <button id="home-plus-two" class="btn">+2</button>
        <button id="home-plus-three" class="btn">+3</button>
      </div>
      <div id="away-btns">
        <button id="away-plus-one" class="btn">+1</button>
        <button id="away-plus-two" class="btn">+2</button>
        <button id="away-plus-three" class="btn">+3</button>
      </div>
    </div>
    <div id="new-game-container">
      <button id="new-game-btn">New Game</button>
    </div>
  </div>
`
//fouls
document.querySelector("input[name='home-0']").addEventListener('change',(event)=> handleChange(event.target.name))
document.querySelector("input[name='home-1']").addEventListener('change',(event)=> handleChange(event.target.name))
document.querySelector("input[name='home-2']").addEventListener('change',(event)=> handleChange(event.target.name))
document.querySelector("input[name='home-3']").addEventListener('change',(event)=> handleChange(event.target.name))
document.querySelector("input[name='home-4']").addEventListener('change',(event)=> handleChange(event.target.name))
document.querySelector("input[name='away-0']").addEventListener('change',(event)=> handleChange(event.target.name))
document.querySelector("input[name='away-1']").addEventListener('change',(event)=> handleChange(event.target.name))
document.querySelector("input[name='away-2']").addEventListener('change',(event)=> handleChange(event.target.name))
document.querySelector("input[name='away-3']").addEventListener('change',(event)=> handleChange(event.target.name))
document.querySelector("input[name='away-4']").addEventListener('change',(event)=> handleChange(event.target.name))

//Scoring Btns
document.getElementById('home-plus-one').addEventListener("click",()=> addPoints("home", 1, 'home-score-text'))
document.getElementById('home-plus-two').addEventListener("click",()=> addPoints("home", 2, 'home-score-text'))
document.getElementById('home-plus-three').addEventListener("click",()=> addPoints("home", 3, 'home-score-text'))
document.getElementById('away-plus-one').addEventListener("click",()=> addPoints("away", 1, 'away-score-text'))
document.getElementById('away-plus-two').addEventListener("click",()=> addPoints("away", 2, 'away-score-text'))
document.getElementById('away-plus-three').addEventListener("click",()=> addPoints("away", 3, 'away-score-text'))

//new game
document.getElementById('new-game-btn').addEventListener('click', ()=> startNewGame())

//timer
document.getElementById('time-btn').addEventListener('click',()=> handleTimer())
(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))c(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const h of o.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&c(h)}).observe(document,{childList:!0,subtree:!0});function a(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerpolicy&&(o.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?o.credentials="include":n.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function c(n){if(n.ep)return;n.ep=!0;const o=a(n);fetch(n.href,o)}})();let d=0,l=0,y=[!1,!1,!1,!1,!1],f=[!1,!1,!1,!1,!1],m=!1,i;function s(e){let t=e.slice(0,4),a=b(e);t==="home"?y[a]=!y[a]:f[a]=!f[a],t==="home"&&v(t)?document.querySelectorAll(".btn").forEach(c=>c.setAttribute("disabled",!0)):t==="away"&&v(t)?document.querySelectorAll(".btn").forEach(c=>c.setAttribute("disabled",!0)):console.log("no one has fouled out")}function v(e){return e==="home"?y.every(t=>t===!0):f.every(t=>t===!0)}function b(e){return Number(e.slice(-1))}function w(){let e=Number(document.getElementById("time-min").textContent),t=Number(document.getElementById("time-sec").textContent);e===0&&t===0&&g(),m?(clearInterval(i),i=null,Number(document.getElementById("time-min").textContent),Number(document.getElementById("time-sec").textContent),m=!1):(u(e,t),i=setInterval(E,1e3),m=!0)}function E(){let e=Number(document.getElementById("time-min").textContent),t=Number(document.getElementById("time-sec").textContent);e>0&&t===0?(e-=1,t=59,u(e,t)):t>0?(t-=1,u(e,t)):(console.log("times up"),clearInterval(i),u(e,t),i=null,m=!1,g())}function u(e,t){document.getElementById("time-min").textContent=`0${e}`,t<10?document.getElementById("time-sec").textContent=`0${t}`:document.getElementById("time-sec").textContent=t}function g(){document.getElementById("time-min").textContent="05",document.getElementById("time-sec").textContent="00"}function r(e,t,a){e==="home"?(d+=t,document.getElementById(a).textContent=d,p()):(l+=t,document.getElementById(a).textContent=l,p())}function p(){d>l?(document.getElementById("home-score-div").classList.remove("losing"),document.getElementById("home-score-div").classList.add("winning"),document.getElementById("away-score-div").classList.remove("winning"),document.getElementById("away-score-div").classList.add("losing")):d<l?(document.getElementById("home-score-div").classList.remove("winning"),document.getElementById("home-score-div").classList.add("losing"),document.getElementById("away-score-div").classList.remove("losing"),document.getElementById("away-score-div").classList.add("winning")):(document.getElementById("home-score-div").classList.remove("winning","losing"),document.getElementById("away-score-div").classList.remove("winning","losing"))}function x(){d=0,l=0,y=[!1,!1,!1,!1,!1],f=[!1,!1,!1,!1,!1],document.getElementById("home-score-text").textContent=d,document.getElementById("away-score-text").textContent=l,document.querySelectorAll(".btn").forEach(e=>e.removeAttribute("disabled")),document.querySelectorAll(".fouls").forEach(e=>e.checked=!1),document.getElementById("home-score-div").classList.remove("winning","losing"),document.getElementById("away-score-div").classList.remove("winning","losing"),clearInterval(i),u(5,0),i=null,m=!1,g()}document.querySelector("#app").innerHTML=`
  <div id="wrapper">
    <div id="app-title-container">
      <h1>Couples "Debate"</h1>
      <p>Who will win this arguement, you decide!</p>
    </div>
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
`;document.querySelector("input[name='home-0']").addEventListener("change",e=>s(e.target.name));document.querySelector("input[name='home-1']").addEventListener("change",e=>s(e.target.name));document.querySelector("input[name='home-2']").addEventListener("change",e=>s(e.target.name));document.querySelector("input[name='home-3']").addEventListener("change",e=>s(e.target.name));document.querySelector("input[name='home-4']").addEventListener("change",e=>s(e.target.name));document.querySelector("input[name='away-0']").addEventListener("change",e=>s(e.target.name));document.querySelector("input[name='away-1']").addEventListener("change",e=>s(e.target.name));document.querySelector("input[name='away-2']").addEventListener("change",e=>s(e.target.name));document.querySelector("input[name='away-3']").addEventListener("change",e=>s(e.target.name));document.querySelector("input[name='away-4']").addEventListener("change",e=>s(e.target.name));document.getElementById("home-plus-one").addEventListener("click",()=>r("home",1,"home-score-text"));document.getElementById("home-plus-two").addEventListener("click",()=>r("home",2,"home-score-text"));document.getElementById("home-plus-three").addEventListener("click",()=>r("home",3,"home-score-text"));document.getElementById("away-plus-one").addEventListener("click",()=>r("away",1,"away-score-text"));document.getElementById("away-plus-two").addEventListener("click",()=>r("away",2,"away-score-text"));document.getElementById("away-plus-three").addEventListener("click",()=>r("away",3,"away-score-text"));document.getElementById("new-game-btn").addEventListener("click",()=>x());document.getElementById("time-btn").addEventListener("click",()=>w());

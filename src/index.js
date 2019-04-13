// It might be a good idea to add event listener to make sure this file
// only runs after the DOM has finshed loading.
document.addEventListener('DOMContentLoaded', () => {

let mainContainer = document.querySelector('.parent-container')
let startButton = document.querySelector('#start-btn')
let drawButton = document.querySelector('#draw-btn')
let stopButton = document.querySelector('#stop-btn')
let finishCell = document.querySelector('#finish')
let body = document.querySelector('body')
let statBox = document.querySelector('#stat')
let timerBox = document.querySelector('#timer')
let resetBtn = document.querySelector('#reset-btn')
let saveBtn = document.querySelector('#save-btn')
let submitBtn = document.querySelector('#submit-btn')
let userDiv = document.querySelector('#users')
let nameInput = document.querySelector('#name-input')
let mapList = document.querySelector('#map-list')
let startCell = document.querySelector('#start')
let newMapBtn = document.querySelector('#newMap-btn')
let saveScoreBtn = document.querySelector('#save-score')
let mapNum = document.querySelector('#map-num')
let newUserDiv = document.querySelector('#new-user')
let topScoreDiv = document.querySelector('#top-score')

let startVal = 0
let drawVal = 0

let userId = 0;
let mapId =0;

var gotEm = new Audio('gotemcoach.mp3');
var lose = new Audio('losee.mp3');
var cheer = new Audio('cheeer.mp3');

let coordinateAr = []

  mainContainer.addEventListener('mouseover', function (event) {
    if (startVal == 0 && drawVal == 1) {
      if (event.target.className == "grid-item") {
          event.target.style.backgroundColor = "green"
          coordinateAr.push(event.target.id.split("-")[1])
      }

      if(event.target.id == "finish"){
        console.log("DONE DRAWING");
        drawVal = 0
        drawButton.remove()
        console.log(coordinateAr);
        saveBtn.style.display = "block"
      }
    }
  })

  mainContainer.addEventListener('mouseover', function (event) {
    if (event.target.className == "grid-item"){
    if (startVal == 1) {
      if (event.target.style.backgroundColor !== "green") {
          console.log("LOSEEE");
          statBox.style.backgroundColor = "red"
          statBox.innerHTML = `<font size="36">YOU LOSE :(</font>`
            myStopFunction()
            startVal = 0
            resetBtn.style.display = "block"
            lose.play();
      }////end lose
      if(event.target.id == "finish"){
        statBox.style.backgroundColor = "green"
        statBox.innerHTML = `<font size="36">YOU WIN!!!!</font>`
        let timeVal = timerBox.innerHTML
        console.log(timeVal);
        statBox.innerHTML += `<br><font size="36">You completed the task in ${timeVal} miliseconds</font>`
        resetBtn.style.display = "block"
        startVal = 0;
        myStopFunction()
        saveScoreBtn.style.display = "block"

        if (timeVal < topScoreDiv.innerHTML.split(" ")[6]) {
          statBox.innerHTML = `<h1>You Set a New Highscore!!!!</h1><br><h1>Time: ${timeVal}</h1>`
          statBox.style.backgroundColor = "orange"
          cheer.play();
        } else{gotEm.play();}

      }
    }///end if startVal
  }
  })//// end mouseover

startButton.addEventListener("click", function (event) {
  saveScoreBtn.style.display = "none"
  statBox.innerHTML = ""
  statBox.style.backgroundColor = "#ffe6e6"
  if (startVal == 0){startVal = 1}else {
    startVal = 0
  }
})

drawButton.addEventListener("click", function (event) {

  if (drawVal == 0){drawVal = 1}else {
    drawVal = 0
  }
})

var myVar;

startButton.addEventListener("click", function (event) {

      let counter = 0
      let x = 0;
    myVar = setInterval(myTimer ,100);
    function myTimer() {
     timerBox.innerHTML = x
     x += 1
    }
})

resetBtn.addEventListener('click', function (event) {
  statBox.innerHTML = ""
  statBox.style.backgroundColor = "#ffe6e6"
  resetBtn.style.display = "none"
  timerBox.innerHTML = ""
    saveScoreBtn.style.display = "none"
})


function myStopFunction() {
  clearInterval(myVar);
}

submitBtn.addEventListener('click', function (event) {
  // event.preventDefault()
  console.log(nameInput.value);
  fetch('http://localhost:3000/api/v1/users',{
    method: 'POST',
    headers: {'Accept': 'application/json',
              'Content-Type': 'application/json'},
    body:  JSON.stringify({
      name: `${nameInput.value}`
    })
})///end fetch post user
  userDiv.innerHTML += `<li>${nameInput.value}</li>`
  nameInput.value = ""
})

fetch('http://localhost:3000/api/v1/users')
.then(res => res.json())
.then(res => { return addUserLi(res)
})//// END NAME FETCH

function addUserLi(array) {
  array.forEach(function (user) {
    userDiv.innerHTML += `<li id="user-${user.id}">${user.name} </li><button id="select-${user.id}" class="select" type="button">Select</button>`
  })
}

function addUserMaps(userObj) {
  userObj.maps.forEach(function (map) {
        mapList.innerHTML += `<li id="map-${map.id}" >Map ${map.id}</li>`
  })
}

function colorCells(stringAr) {
  let cellAr = [];
  cellAr = stringAr.split(",")
  // console.log(cellAr);
  finishCell.style.backgroundColor = "green"
  startCell.style.backgroundColor = "green"

  cellAr.forEach(function (num) {
    // console.log(parseInt(num));
    let element = document.getElementById(`grid-${num}`)
    element.style.backgroundColor = "green"
  })
}

function colorlessCells() {
  mainContainer.innerHTML =`<div class="grid-container-1">
    <div id="grid-1" class="grid-item"></div>
    <div id="grid-2" class="grid-item"></div>
    <div id="grid-3" class="grid-item"></div>
    <div id="grid-4" class="grid-item"></div>
    <div id="grid-5" class="grid-item"></div>
    <div id="grid-6" class="grid-item"></div>
    <div id="grid-7" class="grid-item"></div>
    <div style="background-color: green;" id="finish" class="grid-item">FIN</div>
  </div>
  <div class="grid-container-2">
    <div style="background-color: green;" id="start" class="grid-item">START</div>
    <div id="grid-8" class="grid-item"></div>
    <div id="grid-9" class="grid-item"></div>
    <div id="grid-10" class="grid-item"></div>
    <div id="grid-11" class="grid-item"></div>
    <div id="grid-12" class="grid-item"></div>
    <div id="grid-13" class="grid-item"></div>
    <div id="grid-14" class="grid-item"></div>
  </div>
  <div class="grid-container-3">
    <div id="grid-15" class="grid-item"></div>
    <div id="grid-16" class="grid-item"></div>
    <div id="grid-17" class="grid-item"></div>
    <div id="grid-18" class="grid-item"></div>
    <div id="grid-19" class="grid-item"></div>
    <div id="grid-20" class="grid-item"></div>
    <div id="grid-21" class="grid-item"></div>
    <div id="grid-22" class="grid-item"></div>
  </div>
  <div class="grid-container-4">
    <div id="grid-23" class="grid-item"></div>
    <div id="grid-24" class="grid-item"></div>
    <div id="grid-25" class="grid-item"></div>
    <div id="grid-26" class="grid-item"></div>
    <div id="grid-27" class="grid-item"></div>
    <div id="grid-28" class="grid-item"></div>
    <div id="grid-29" class="grid-item"></div>
    <div id="grid-30" class="grid-item"></div>
  </div>
  <div class="grid-container-5">
    <div id="grid-31" class="grid-item"></div>
    <div id="grid-32" class="grid-item"></div>
    <div id="grid-33" class="grid-item"></div>
    <div id="grid-34" class="grid-item"></div>
    <div id="grid-35" class="grid-item"></div>
    <div id="grid-36" class="grid-item"></div>
    <div id="grid-37" class="grid-item"></div>
    <div id="grid-38" class="grid-item"></div>
  </div>
  <div class="grid-container-6">
    <div id="grid-39" class="grid-item"></div>
    <div id="grid-40" class="grid-item"></div>
    <div id="grid-41" class="grid-item"></div>
    <div id="grid-42" class="grid-item"></div>
    <div id="grid-43" class="grid-item"></div>
    <div id="grid-44" class="grid-item"></div>
    <div id="grid-45" class="grid-item"></div>
    <div id="grid-46" class="grid-item"></div>
  </div>
  <div class="grid-container-7">
    <div id="grid-47" class="grid-item"></div>
    <div id="grid-48" class="grid-item"></div>
    <div id="grid-49" class="grid-item"></div>
    <div id="grid-50" class="grid-item"></div>
    <div id="grid-51" class="grid-item"></div>
    <div id="grid-52" class="grid-item"></div>
    <div id="grid-53" class="grid-item"></div>
    <div id="grid-54" class="grid-item"></div>
  </div>
  <div class="grid-container-8">
    <div id="grid-55" class="grid-item"></div>
    <div id="grid-56" class="grid-item"></div>
    <div id="grid-57" class="grid-item"></div>
    <div id="grid-58" class="grid-item"></div>
    <div id="grid-59" class="grid-item"></div>
    <div id="grid-60" class="grid-item"></div>
    <div id="grid-61" class="grid-item"></div>
    <div id="grid-62" class="grid-item"></div>
  </div>`
  finishCell.style.backgroundColor = "green"
  startCell.style.backgroundColor = "green"
}

function giveTopScore(mapId) {
  fetch(`http://localhost:3000/api/v1/maps/${mapId}`)
  .then(res => res.json())
  .then(res => {return topScore(res.scores)})


} ///// DO THIS

function topScore(array) {
  newAr = []
  array.forEach(function (scoreObj) {
    newAr.push(scoreObj.wins)
  })
  console.log(Math.min(...newAr));
  let highScore = Math.min(...newAr)
  if (highScore> 1000) {
    highScore = 0
  }
  topScoreDiv.innerHTML = `<h2>Fastest Time For This Map is ${highScore} miliseconds <h2>`
  console.log(topScoreDiv.innerHTML.split(" ")[6]);
}

  userDiv.addEventListener('click', function (event) {

    if (event.target.className == "select") {
      // console.log(event.target.id.split("-")[1]);
      mapList.innerHTML = `<h1>${event.target.previousSibling.innerHTML}'s Map List</h1>`
      fetch(`http://localhost:3000/api/v1/users/${event.target.id.split("-")[1]}`)
      .then(res => res.json())
      .then(res => {  addUserMaps(res)})
      // mapList.innerHTML += `<button id="newMap-btn" type="button">Create New Map</button>`
      newMapBtn.style.display = "block"
      userDiv.style.display = "none"
      newUserDiv.style.display = "none"
    }

  }) /// MAP LIST END

  newMapBtn.addEventListener('click', function (event) {
    console.log(mapId);

      // console.log(event.target);
      mainContainer.style.display = "block"
      colorlessCells()
      mapNum.innerHTML = `<h1>New Map</h1>`
      timerBox.innerHTML = ""
      drawVal = 0
      topScoreDiv.innerHTML = ""
      drawButton.style.display = "block"
      statBox.innerHTML = ""
      statBox.style.backgroundColor = "white"
  })

saveBtn.addEventListener('click', function (event) {
  console.log(coordinateAr);

  coordinateAr.pop()
  coordinateAr.shift()

  console.log(coordinateAr);

  fetch('http://localhost:3000/api/v1/maps',{
    method: 'POST',
    headers: {'Accept': 'application/json',
              'Content-Type': 'application/json'},
    body:  JSON.stringify({
      name: `${coordinateAr}`,
      user_id: 1
    })
})///end fetch post user

})

mapList.addEventListener('click', function (event) {
  colorlessCells()
  if (event.target.tagName == "LI") {
    mainContainer.style.display = "block"
    // console.log(event.target.id.split("-")[1]);
    let mapId = event.target.id.split("-")[1];
    // console.log(mapId);
    giveTopScore(mapId)
    mapNum.innerHTML = `<h1>Map Number ${mapId}</h1>`
    statBox.innerHTML =""
    statBox.style.backgroundColor = "#ffe6e6"
    timerBox.style.display = "block"
    statBox.style.display = "block"
    startButton.style.display = "block"
    drawButton.style.display = "block"
    timerBox.innerHTML = ""
    topScoreDiv.style.display = "block"
  }
  // console.log(event.target.id);
  fetch(`http://localhost:3000/api/v1/maps/${event.target.id.split("-")[1]}`)
  .then(res => res.json())
  .then(res => {return colorCells(res.name)})


})

saveScoreBtn.addEventListener('click', function (event) {

    mapNumber = mapNum.children[0].innerHTML.split(" ")[2]
    // console.log(mapNumber);
    console.log(timerBox.innerHTML);
    fetch('http://localhost:3000/api/v1/scores',{
      method: 'POST',
      headers: {'Accept': 'application/json',
                'Content-Type': 'application/json'},
      body:  JSON.stringify({
        wins: `${timerBox.innerHTML}`,
        map_id: `${mapNumber}`
      })
  })
})


})/////END DOM COntent

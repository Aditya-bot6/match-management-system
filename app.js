let scoreA=0;
let scoreB=0;

let teamAFouls=0;
let teamBFouls=0;

let teamAPlayers={};
let teamBPlayers={};

function updateTeamNames(){
}

function addEvent(text){

    const li=document.createElement("li");
    li.innerText=text;

    document.getElementById("eventLog")
        .prepend(li);
}

/* Goals */

function goalA(){
    scoreA++;
    document.getElementById("scoreA").innerText=scoreA;
    addEvent(`Goal - ${document.getElementById("teamAInput").value}`);
}

function goalB(){
    scoreB++;
    document.getElementById("scoreB").innerText=scoreB;
    addEvent(`Goal - ${document.getElementById("teamBInput").value}`);
}

function minusGoalA(){
    if(scoreA>0){
        scoreA--;
        document.getElementById("scoreA").innerText=scoreA;
    }
}

function minusGoalB(){
    if(scoreB>0){
        scoreB--;
        document.getElementById("scoreB").innerText=scoreB;
    }
}

/* Fouls */
/* Team A Foul */

function addFoulA() {

    const player =
        document.getElementById("playerNumberA").value.trim();

    if (!player) {
        alert("Enter Team A Player Number");
        return;
    }

    teamAFouls++;

    document.getElementById("teamAFouls").innerText =
        teamAFouls;

    teamAPlayers[player] =
        (teamAPlayers[player] || 0) + 1;

    renderPlayers("A");
    const foulItem = document.createElement("div");

    foulItem.className =
        "alert alert-warning py-1 mb-1";

    foulItem.innerText =
        `Player #${player} - Foul ${teamAPlayers[player]}`;

    document.getElementById("teamAFoulList")
        .prepend(foulItem);

    const teamName =
        document.getElementById("teamAInput").value || "Team A";

    addEvent(`Foul - ${teamName} - #${player}`);

    document.getElementById("playerNumberA").value = "";
}


/* Team B Foul */

function addFoulB() {

    const player =
        document.getElementById("playerNumberB").value.trim();

    if (!player) {
        alert("Enter Team B Player Number");
        return;
    }
    const foulItem = document.createElement("div");

    foulItem.className =
        "alert alert-warning py-1 mb-1";

    foulItem.innerText =
        `Player #${player} - Foul ${teamBPlayers[player]}`;

    document.getElementById("teamBFoulList")
        .prepend(foulItem);

    teamBFouls++;

    document.getElementById("teamBFouls").innerText =
        teamBFouls;

    teamBPlayers[player] =
        (teamBPlayers[player] || 0) + 1;

    renderPlayers("B");

    const teamName =
        document.getElementById("teamBInput").value || "Team B";

    addEvent(`Foul - ${teamName} - #${player}`);

    document.getElementById("playerNumberB").value = "";
}

function renderPlayers(team){

    let html="";

    if(team==="A"){

        for(let p in teamAPlayers){

            html +=
            `<li>Player #${p} - ${teamAPlayers[p]} Fouls</li>`;
        }

        document.getElementById("teamAPlayers")
            .innerHTML=html;

    }else{

        for(let p in teamBPlayers){

            html +=
            `<li>Player #${p} - ${teamBPlayers[p]} Fouls</li>`;
        }

        document.getElementById("teamBPlayers")
            .innerHTML=html;
    }
}

/* Match Timer */

let totalSeconds=900;
let timer;

function updateTimerDisplay(){

    let min=Math.floor(totalSeconds/60);
    let sec=totalSeconds%60;

    document.getElementById("timer").innerText =
    `${String(min).padStart(2,"0")}:${String(sec).padStart(2,"0")}`;
}

function setMatchTime(){

    let minutes = Number(
        document.getElementById("minutesInput").value
    );

    if(minutes <= 0) return;

    totalSeconds = minutes * 60;

    updateTimerDisplay();
}

function startTimer(){

    clearInterval(timer);

    timer=setInterval(()=>{

        if(totalSeconds>0){

            totalSeconds--;
            updateTimerDisplay();

        }else{

            clearInterval(timer);
            alert("Match Finished");
        }

    },1000);
}

function pauseTimer(){
    clearInterval(timer);
}

function resetTimer(){

    clearInterval(timer);
    setMatchTime();
}

/* Shot Clock */

let shotClock = 30;
let shotTimer;

function setShotClock(){

    shotClock = Number(
        document.getElementById("shotClockInput").value
    ) || 30;

    document.getElementById("shotClock").innerText =
        shotClock;
}

function startShotClock(){

    clearInterval(shotTimer);

    shotClock =
        parseInt(document.getElementById("shotClockInput").value) || 30;

    document.getElementById("shotClock").innerText =
        shotClock;

    shotTimer = setInterval(() => {

        if(shotClock > 0){

            shotClock--;

            document.getElementById("shotClock").innerText =
                shotClock;

        }else{

            clearInterval(shotTimer);
            alert("Shot Clock Ended");
        }

    },1000);
}
function updateTeamNames() {

    const teamA =
        document.getElementById("teamAInput").value || "Team A";

    const teamB =
        document.getElementById("teamBInput").value || "Team B";

    document.getElementById("teamAFoulTitle").innerText =
        `${teamA} Foul Entry`;

    document.getElementById("teamBFoulTitle").innerText =
        `${teamB} Foul Entry`;

    document.getElementById("teamAFoulsTitle").innerText =
        `${teamA} Fouls`;

    document.getElementById("teamBFoulsTitle").innerText =
        `${teamB} Fouls`;

    document.getElementById("teamAPlayersTitle").innerText =
        `${teamA} Players`;

    document.getElementById("teamBPlayersTitle").innerText =
        `${teamB} Players`;
}

function resetShotClock(){

    clearInterval(shotTimer);

    shotClock =
        parseInt(document.getElementById("shotClockInput").value) || 30;

    document.getElementById("shotClock").innerText =
        shotClock;
}

/* Keyboard Shortcuts */

document.addEventListener("keydown",(e)=>{

    switch(e.key.toLowerCase()){

        case "a":
            goalA();
            break;

        case "b":
            goalB();
            break;

        case "q":
            addFoulA();
            break;

        case "w":
            addFoulB();
            break;

        case "r":
            resetShotClock();
            break;
    }

});

setMatchTime();
setShotClock();
updateTeamNames();
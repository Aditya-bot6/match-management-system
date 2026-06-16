let scoreA=0;
let scoreB=0;

let teamAFouls=0;
let teamBFouls=0;

let teamAPlayers={};
let teamBPlayers={};

let teamAGoals = {};
let teamBGoals = {};

function updateTeamNames(){
}

function addEvent(text){

    const li=document.createElement("li");
    li.innerText=text;

    document.getElementById("eventLog")
        .prepend(li);
}
let tossWinnerTeam = "";

function tossCoin(){

    const coin =
        document.getElementById("coin");

    const resultText =
        document.getElementById("tossResult");

    resultText.innerText = "";

    coin.classList.add("coin-spin");

    setTimeout(() => {

        coin.classList.remove("coin-spin");

        const result =
            Math.random() < 0.5
                ? "HEADS"
                : "TAILS";

        coin.innerText = result;

        resultText.innerText =
            `Result: ${result}`;

    }, 3000);

}

function startMatch() {

    const teamA =
        document.getElementById("setupTeamA").value || "Team A";

    const teamB =
        document.getElementById("setupTeamB").value || "Team B";

    document.getElementById("teamAName").innerText = teamA;
    document.getElementById("teamBName").innerText = teamB;

    document.getElementById("setupScreen").style.display = "none";
    document.getElementById("matchScreen").style.display = "block";

    updateTeamNames();
}

/* Goals */

function goalA(){
    scoreA++;
    document.getElementById("scoreA").innerText=scoreA;
    addEvent(`Goal - ${document.getElementById("teamAName").innerText}`);
}

function goalB(){
    scoreB++;
    document.getElementById("scoreB").innerText=scoreB;
    addEvent(`Goal - ${document.getElementById("teamBName").innerText}`);
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

function addGoalA(){

    const player =
        document.getElementById("goalPlayerA").value.trim();

    if(!player){
        alert("Enter Player Number");
        return;
    }

    scoreA++;
    document.getElementById("scoreA").innerText = scoreA;

    teamAGoals[player] =
        (teamAGoals[player] || 0) + 1;
       
     renderGoalStats("A");

    const goalItem = document.createElement("li");

    goalItem.className =
        "alert alert-success py-1 mb-1";

    goalItem.innerText =
        `Player #${player} - Goal ${teamAGoals[player]}`;

    document.getElementById("teamAGoalList")
        .prepend(goalItem);

    document.getElementById("goalPlayerA").value = "";
}

function addGoalB(){

    const player =
        document.getElementById("goalPlayerB").value.trim();

    if(!player){
        alert("Enter Player Number");
        return;
    }

    scoreB++;
    document.getElementById("scoreB").innerText = scoreB;

    teamBGoals[player] =
        (teamBGoals[player] || 0) + 1;

    renderGoalStats("B"); 

    const goalItem = document.createElement("li");

    goalItem.className =
        "alert alert-success py-1 mb-1";

    goalItem.innerText =
        `Player #${player} - Goal ${teamBGoals[player]}`;

    document.getElementById("teamBGoalList")
        .prepend(goalItem);

    document.getElementById("goalPlayerB").value = "";
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
        document.getElementById("teamAName").innerText || "Team A";

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

    teamBFouls++;

    document.getElementById("teamBFouls").innerText =
        teamBFouls;

    teamBPlayers[player] =
        (teamBPlayers[player] || 0) + 1;

    renderPlayers("B");

    const foulItem = document.createElement("div");

    foulItem.className =
        "alert alert-warning py-1 mb-1";

    foulItem.innerText =
        `Player #${player} - Foul ${teamBPlayers[player]}`;

    document.getElementById("teamBFoulList")
        .prepend(foulItem);

    const teamName =
        document.getElementById("teamBName").innerText || "Team B";

    addEvent(`Foul - ${teamName} - #${player}`);

    document.getElementById("playerNumberB").value = "";
}

function renderGoalStats(team){

    let html = "";

    if(team === "A"){

        for(let p in teamAGoals){
            html +=
            `<li>Player #${p} - ${teamAGoals[p]} Goals</li>`;
        }

        document.getElementById("teamAGoalStats").innerHTML = html;

    }else{

        for(let p in teamBGoals){
            html +=
            `<li>Player #${p} - ${teamBGoals[p]} Goals</li>`;
        }

        document.getElementById("teamBGoalStats").innerHTML = html;
    }
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

function updateTeamNames() {

    const teamA =
        document.getElementById("teamAName").innerText;

    const teamB =
        document.getElementById("teamBName").innerText;

    document.getElementById("teamAGoalTitle").innerText =
        `${teamA} Goal Entry`;

    document.getElementById("teamBGoalTitle").innerText =
        `${teamB} Goal Entry`;

    if(document.getElementById("teamAGoalsTitle")){
        document.getElementById("teamAGoalsTitle").innerText =
            `${teamA} Goals`;
    }

    if(document.getElementById("teamBGoalsTitle")){
        document.getElementById("teamBGoalsTitle").innerText =
            `${teamB} Goals`;
    }

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
updateTeamNames();
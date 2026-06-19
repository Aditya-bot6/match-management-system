let scoreA=0;
let scoreB=0;

let teamAFouls=0;
let teamBFouls=0;

let teamAPlayers={};
let teamBPlayers={};

let teamAGoals = {};
let teamBGoals = {};

let teamAPlayerNames = {};
let teamBPlayerNames = {};

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
    document.querySelectorAll(".playerNoA").forEach((el,index)=>{

    const number = el.value.trim();

    const name =
        document.querySelectorAll(".playerNameA")[index]
        .value.trim();

    if(number && name){
        teamAPlayerNames[number] = name;
    }
});

    document.querySelectorAll(".playerNoB").forEach((el,index)=>{

    const number = el.value.trim();

    const name =
        document.querySelectorAll(".playerNameB")[index]
        .value.trim();

    if(number && name){
        teamBPlayerNames[number] = name;
    }
});

    updateTeamNames();
}

function addPlayerRowA(){

    const div = document.createElement("div");

    div.className = "row mb-2";

    div.innerHTML = `
        <div class="col-4">
            <input type="text"
                   class="form-control playerNoA"
                   placeholder="Number">
        </div>

        <div class="col-8">
            <input type="text"
                   class="form-control playerNameA"
                   placeholder="Player Name">
        </div>
    `;

    document.getElementById("teamAPlayersSetup")
        .appendChild(div);
}

function addPlayerRowB(){

    const div = document.createElement("div");

    div.className = "row mb-2";

    div.innerHTML = `
        <div class="col-4">
            <input type="text"
                   class="form-control playerNoB"
                   placeholder="Number">
        </div>

        <div class="col-8">
            <input type="text"
                   class="form-control playerNameB"
                   placeholder="Player Name">
        </div>
    `;

    document.getElementById("teamBPlayersSetup")
        .appendChild(div);
}

/* Goals */

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

    const playerName =
    teamAPlayerNames[player] || "Unknown";

    goalItem.innerText =
    `#${player} - ${playerName} - Goal ${teamAGoals[player]}`;

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

    const playerName =
    teamBPlayerNames[player] || "Unknown";

    goalItem.innerText =
    `#${player} - ${playerName} - Goal ${teamBGoals[player]}`;

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

    const playerName =
    teamAPlayerNames[player] || "Unknown";

    foulItem.innerText =
    `#${player} - ${playerName} - Foul ${teamAPlayers[player]}`;

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

    const playerName =
    teamBPlayerNames[player] || "Unknown";

    foulItem.innerText =
    `#${player} - ${playerName} - Foul ${teamBPlayers[player]}`;

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

            const name =
                teamAPlayerNames[p] || "Unknown";

            html += `
                <li>
                    #${p} - ${name} - ${teamAGoals[p]} Goals
                </li>
            `;
        }

        document.getElementById("teamAGoalStats").innerHTML = html;

    }else{

        for(let p in teamBGoals){

            const name =
                teamBPlayerNames[p] || "Unknown";

            html += `
                <li>
                    #${p} - ${name} - ${teamBGoals[p]} Goals
                </li>
            `;
        }

        document.getElementById("teamBGoalStats").innerHTML = html;
    }
}

function renderPlayers(team){

    let html = "";

    if(team === "A"){

        for(let p in teamAPlayers){

            const name =
                teamAPlayerNames[p] || "Unknown";

            html += `
                <li>
                    #${p} - ${name} - ${teamAPlayers[p]} Fouls
                </li>
            `;
        }

        document.getElementById("teamAPlayers")
            .innerHTML = html;

    }else{

        for(let p in teamBPlayers){

            const name =
                teamBPlayerNames[p] || "Unknown";

            html += `
                <li>
                    #${p} - ${name} - ${teamBPlayers[p]} Fouls
                </li>
            `;
        }

        document.getElementById("teamBPlayers")
            .innerHTML = html;
    }
}

/* Match Timer */

let totalSeconds = 900;
let timer;
let isRunning = false;
let isPaused = false;

function updateTimerDisplay() {

    let min = Math.floor(totalSeconds / 60);
    let sec = totalSeconds % 60;

    document.getElementById("timer").innerText =
        `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

function setMatchTime() {

    let minutes = Number(
        document.getElementById("minutesInput").value
    );

    if (minutes <= 0) return;

    totalSeconds = minutes * 60;

    updateTimerDisplay();
}

function startTimer() {

    if (isRunning) return;

    isRunning = true;

    document.getElementById("startBtn").classList.add("d-none");
    document.getElementById("pauseResumeBtn").innerText = "Pause";
    document.getElementById("pauseResumeBtn").classList.remove("btn-primary");
    document.getElementById("pauseResumeBtn").classList.add("btn-warning");
    timer = setInterval(() => {

        if (totalSeconds > 0) {

            totalSeconds--;
            updateTimerDisplay();

        } else {

            clearInterval(timer);
            isRunning = false;

            alert("Match Finished");
        }

    }, 1000);
}

function togglePauseResume() {

    const btn = document.getElementById("pauseResumeBtn");

    if (!isPaused) {

        clearInterval(timer);
        isRunning = false;
        isPaused = true;

        btn.innerText = "Resume";
        btn.classList.remove("btn-warning");
        btn.classList.add("btn-primary");

    } else {

        startTimer();

        isPaused = false;

        btn.innerText = "Pause";
        btn.classList.remove("btn-primary");
        btn.classList.add("btn-warning");
    }
}

function resetTimer() {

    clearInterval(timer);
    isPaused = false;
    isRunning = false;
    const btn = document.getElementById("pauseResumeBtn");
    btn.innerText = "Pause";
    btn.classList.remove("btn-primary");
    btn.classList.add("btn-warning");

    setMatchTime();

    document.getElementById("startBtn").classList.remove("d-none");
    document.getElementById("resumeBtn").classList.add("d-none");
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
        `${teamA} Fouls`;

    document.getElementById("teamBPlayersTitle").innerText =
        `${teamB} Fouls`;
}
function generatePDF(){

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const teamA = document.getElementById("teamAName").innerText;
    const teamB = document.getElementById("teamBName").innerText;

    const today = new Date();

    const teamATableData = [];
    const teamBTableData = [];

    for(let no in teamAPlayerNames){

        teamATableData.push([
            no,
            teamAPlayerNames[no],
            teamAGoals[no] || 0,
            teamAPlayers[no] || 0
        ]);
    }

    for(let no in teamBPlayerNames){

        teamBTableData.push([
            no,
            teamBPlayerNames[no],
            teamBGoals[no] || 0,
            teamBPlayers[no] || 0
        ]);
    }

    doc.setFontSize(20);
    doc.text("ROLLBALL MATCH REPORT", 105, 20, {align:"center"});

    doc.setFontSize(11);

    doc.text(
        `Date: ${today.toLocaleDateString()}`,
        14,
        35
    );

    let winner = "Draw";

    if(scoreA > scoreB){
        winner = teamA;
    }else if(scoreB > scoreA){
        winner = teamB;
    }

    doc.setFontSize(13);
    doc.text(`Winner: ${winner}`,14,72);

    doc.setFontSize(14);
    doc.text(`${teamA} Player Statistics`,14,90);

    doc.autoTable({
        startY:95,
        head:[["No","Player Name","Goals","Fouls"]],
        body:teamATableData,
        theme:"grid",
        headStyles:{
            fillColor:[33,37,41]
        }
    });

    doc.text(
        `${teamB} Player Statistics`,
        14,
        doc.lastAutoTable.finalY + 15
    );

    doc.autoTable({
        startY:doc.lastAutoTable.finalY + 20,
        head:[["No","Player Name","Goals","Fouls"]],
        body:teamBTableData,
        theme:"grid",
        headStyles:{
            fillColor:[33,37,41]
        }
    });

    const finalY = doc.lastAutoTable.finalY + 30;

    doc.line(20, finalY, 80, finalY);
    doc.text("Referee Signature",20,finalY + 8);

    doc.line(120, finalY, 180, finalY);
    doc.text("Scorekeeper Signature",120,finalY + 8);

    doc.save(`${teamA}_vs_${teamB}_Match_Report.pdf`);
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
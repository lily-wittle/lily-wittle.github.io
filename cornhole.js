var roundNumber;
var teamOneThrows;
var teamOneName;
var teamTwoName;
var teamOneScore;
var teamTwoScore;

function startGame() {
    roundNumber = 1;
    teamOneThrows = true;
    teamOneScore = 0;
    teamTwoScore = 0;

    document.getElementById("scoreTitle").textContent = "Current Score"
    teamOneName = document.getElementById("teamOne").value;
    teamTwoName = document.getElementById("teamTwo").value;
    document.getElementById("teamNames").style.display = "none";
    startRound();
}

function startRound() {
    updateCurrentScore();
    resetRoundEntry();
}

function finishRound() {
    var netRoundScore = getNetRoundScore();
    if (13 == netRoundScore) {
        return;
    } else if (netRoundScore > 0) {
        teamOneScore = getTeamScore(teamOneScore, netRoundScore);
        teamOneThrows = true;
    } else if (netRoundScore < 0) {
        teamTwoScore = getTeamScore(teamTwoScore, -1 * netRoundScore);
        teamOneThrows = false;
    }

    if (21 == teamOneScore) {
        gameOver(true);
    } else if (21 == teamTwoScore) {
        gameOver(false);
    } else {
        roundNumber++;
        startRound();
    }
}

function gameOver(teamOneWon) {
    document.getElementById("roundEntry").style.display = "none";
    document.getElementById("scoreTitle").textContent = "Final Score"
    updateCurrentScore();
    document.getElementById("gameOver").style.display = "block";
    var winner = teamOneWon ? teamOneName : teamTwoName;
    document.getElementById("winner").textContent = "Team " + winner + " wins!"
}

function getNetRoundScore() {
    var teamOneHole = parseInt(document.getElementById("teamOneHole").value);
    var teamOneBoard = parseInt(document.getElementById("teamOneBoard").value);
    var teamTwoHole = parseInt(document.getElementById("teamTwoHole").value);
    var teamTwoBoard = parseInt(document.getElementById("teamTwoBoard").value);

    if (validateScore(teamOneHole, teamOneBoard, teamTwoHole, teamTwoBoard)) {
        document.getElementById("error").textContent = "";
    } else {
        return 13;
    }

    var teamOneRoundScore = 3 * teamOneHole + teamOneBoard;
    var teamTwoRoundScore = 3 * teamTwoHole + teamTwoBoard;
    return teamOneRoundScore - teamTwoRoundScore;
}

function validateScore(teamOneHole, teamOneBoard, teamTwoHole, teamTwoBoard) {
    valid = true;
    [teamOneHole, teamOneBoard, teamTwoHole, teamTwoBoard].forEach(function (numBags) {
        if (numBags < 0 || numBags > 4) {
            document.getElementById("error").textContent = "Invalid input. Number of bags must be between 0 and 4. Please correct round score and enter again."
            valid = false;
        }
    })
    if (teamOneHole + teamOneBoard > 4 || teamTwoHole + teamTwoBoard > 4) {
        document.getElementById("error").textContent = "Invalid input. Each team only has 4 bags. Please correct round score and enter again."
        valid = false;
    }
    return valid;
}

function getTeamScore(currentScore, roundScore) {
    if (21 >= currentScore + roundScore) {
        return currentScore + roundScore;
    }
    return 15;
}

function updateCurrentScore() {
    document.getElementById("teamOneCurrentScore").textContent = "Team " + teamOneName + ": " + teamOneScore;
    document.getElementById("teamTwoCurrentScore").textContent = "Team " + teamTwoName + ": " + teamTwoScore;

    document.getElementById("score").style.display = "block";
}

function resetRoundEntry() {
    document.getElementById("roundNumber").textContent = "Round " + roundNumber;
    var throwingTeam = teamOneThrows ? teamOneName : teamTwoName;
    document.getElementById("throwsFirst").textContent = "Team " + throwingTeam + " throws first.";

    document.getElementById("teamOneScore").textContent = "Enter Team " + teamOneName + "'s Score";
    document.getElementById("teamTwoScore").textContent = "Enter Team " + teamTwoName + "'s Score";

    document.getElementById("teamOneHole").value = "0";
    document.getElementById("teamOneBoard").value = "0";
    document.getElementById("teamTwoHole").value = "0";
    document.getElementById("teamTwoBoard").value = "0";

    document.getElementById("roundEntry").style.display = "block";
}
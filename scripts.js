const team1 = document.querySelector('#team1Input');
const team2 = document.querySelector('#team2Input');
const teamOneNames = document.querySelectorAll('.team-one');
const teamTwoNames = document.querySelectorAll('.team-two');
const teamOneCurrentScore = document.querySelector('#team1CurrentScore');
const teamTwoCurrentScore = document.querySelector('#team2CurrentScore');
const gameRadio = document.querySelector('.game-radio');
const setRadio = document.querySelector('.set-radio');
const addPoint1 = document.querySelector('#addPoint1');
const addPoint2 = document.querySelector('#addPoint2');
const setItems = document.querySelectorAll('.set-item');
const setBtns = document.querySelectorAll('.set-btn');
const setTableBodies = document.querySelectorAll('.table-body-set');
const resetBtn = document.querySelector('#reset');


const match = {
    teamOneSets: 0,
    teamTwoSets: 0,
    currentSet: 1,
    setsToWin: 3,
}

const set = {
    teamOneGames: 0,
    teamTwoGames: 0,
    currentGame: 1,
    gamesToWin: 6
}

const game = {
    teamOnePoints: 0,
    teamTwoPoints: 0
}

const points = {
    0: '0',
    1: '15',
    2: '30',
    3: '40',
    4: 'DEUCE',
    5: 'ADVANTAGE',
    6: 'WIN'
}

function updateMatch(completedSet) {
    match.currentSet++;
    if (completedSet.teamOneGames > completedSet.teamTwoGames) {
        match.teamOneSets++;
        setBtns[match.currentSet - 2].classList.add('bg-primary', 'text-white');
    } else {
        match.teamTwoSets++;
        setBtns[match.currentSet - 2].classList.add('bg-success', 'text-white');
    }
    if (match.teamOneSets === Math.floor(match.setsToWin / 2 + 1)) {
        alert(`${teamOneNames[0].innerText} wins!`);
    } else if (match.teamTwoSets === Math.floor(match.setsToWin / 2 + 1)) {
        alert(`${teamTwoNames[0].innerText} wins!`);
    } else {
        setItems[match.currentSet - 1].classList.remove('d-none');
        return
    }
    addPoint1.disabled = true;
    addPoint2.disabled = true;
}

function updateSet(completedGame) {
    let gameElement;
    let setElement = document.createElement('td');
    setElement.classList.add('text-white');
    let teamOneScoreElement = document.createElement('td');
    teamOneScoreElement.classList.add('text-white');
    let teamTwoScoreElement = document.createElement('td');
    teamTwoScoreElement.classList.add('text-white');

    setElement.innerText = set.currentGame;

    if (completedGame.teamOnePoints > completedGame.teamTwoPoints) {
        set.teamOneGames++;
        gameElement = document.createElement('tr');
        gameElement.classList.add('bg-primary');
        completedGame.teamOnePoints -= 1;
    } else {
        set.teamTwoGames++;
        gameElement = document.createElement('tr');
        gameElement.classList.add('bg-success');
        completedGame.teamTwoPoints -= 1;
    }
    teamOneScoreElement.innerText = points[completedGame.teamOnePoints];
    teamTwoScoreElement.innerText = points[completedGame.teamTwoPoints];
    gameElement.appendChild(setElement);
    gameElement.appendChild(teamOneScoreElement);
    gameElement.appendChild(teamTwoScoreElement);
    setTableBodies[match.currentSet - 1].appendChild(gameElement);
    set.currentGame++;

    if (set.teamOneGames === set.gamesToWin + 1 ||
        set.teamTwoGames === set.gamesToWin + 1 ||
        set.teamOneGames === set.gamesToWin && set.teamOneGames - set.teamTwoGames >= 2 ||
        set.teamTwoGames === set.gamesToWin && set.teamTwoGames - set.teamOneGames >= 2) {
        updateMatch(set);
        set.teamOneGames = 0;
        set.teamTwoGames = 0;
        set.currentGame = 1;
    }
}

function updateGame() {
    if (game.teamOnePoints > 3 && game.teamOnePoints - game.teamTwoPoints >= 2 ||
        game.teamTwoPoints > 3 && game.teamTwoPoints - game.teamOnePoints >= 2) {
        updateSet(game);
        game.teamOnePoints = 0;
        game.teamTwoPoints = 0;
    } else if (game.teamOnePoints === 3 && game.teamTwoPoints === 3) {
        game.teamOnePoints = 4;
        game.teamTwoPoints = 4;
    } else if (game.teamOnePoints === 5 && game.teamTwoPoints === 5) {
        game.teamOnePoints = 4;
        game.teamTwoPoints = 4;
    }
    if (set.currentGame === 2) {
        if (setBtns[match.currentSet - 1].ariaExpanded === 'false') {
            setBtns[match.currentSet - 1].click();
        }
    }
    teamOneCurrentScore.innerText = points[game.teamOnePoints];
    teamTwoCurrentScore.innerText = points[game.teamTwoPoints];
}

// event listeners
team1.addEventListener('input', () => {
    teamOneNames.forEach(name => {
        if (team1.value === '') {
            name.innerText = 'Team One';
        } else {
            name.innerText = team1.value;
        }
    });
});

team2.addEventListener('input', () => {
    teamTwoNames.forEach(name => {
        if (team2.value === '') {
            name.innerText = 'Team Two';
        } else {
            name.innerText = team2.value;
        }
    });
});

gameRadio.addEventListener('click', () => {
    for (let radio of gameRadio.children) {
        if (radio.checked) {
            set.gamesToWin = parseInt(radio.nextElementSibling.innerText);
        }
    }
});

setRadio.addEventListener('click', () => {
    for (let radio of setRadio.children) {
        if (radio.checked) {
            match.setsToWin = parseInt(radio.nextElementSibling.innerText);
        }
    }
});

addPoint1.addEventListener('click', () => {
    game.teamOnePoints++;
    updateGame();
    if (!gameRadio.disabled) {
        for (let radio of gameRadio.children) {
            if (!radio.checked) {
                radio.disabled = true;
            }
        }
        for (let radio of setRadio.children) {
            if (!radio.checked) {
                radio.disabled = true;
            }
        }
        gameRadio.disabled = true;
        setRadio.disabled = true;
    }
});

addPoint2.addEventListener('click', () => {
    game.teamTwoPoints++;
    updateGame();
    if (!gameRadio.disabled) {
        for (let radio of gameRadio.children) {
            if (!radio.checked) {
                radio.disabled = true;
            }
        }
        for (let radio of setRadio.children) {
            if (!radio.checked) {
                radio.disabled = true;
            }
        }
        gameRadio.disabled = true;
        setRadio.disabled = true;
    }
});

resetBtn.addEventListener('click', () => {
    match.teamOneSets = 0;
    match.teamTwoSets = 0;
    match.currentSet = 1;
    set.teamOneGames = 0;
    set.teamTwoGames = 0;
    set.currentGame = 1;
    game.teamOnePoints = 0;
    game.teamTwoPoints = 0;
    updateGame();

    for (let set of setTableBodies) {
        set.innerHTML = '';
    }

    for (let i = 0; i < setItems.length; i++) {
        if (i !== 0) {
            setItems[i].classList.add('d-none');
        }
    }

    for (let item of setBtns) {
        item.classList.remove('bg-primary', 'bg-success', 'text-white');
    }

    addPoint1.disabled = false;
    addPoint2.disabled = false;
    gameRadio.disabled = false;
    setRadio.disabled = false;
    for (let radio of gameRadio.children) {
        radio.disabled = false;
    }
    for (let radio of setRadio.children) {
        radio.disabled = false;
    }
});
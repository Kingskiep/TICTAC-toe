window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');
    // om te zorgen dat javascript mee kan kijken wat er op het scherm gebeurt en die info kan gebruiken en laden

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;
    // om te zorgen dat game info als huidige speler en waar op het bord de stukken zijn, op te slaan

    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';
    // de drie eindstanden 

    
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    // de manieren waarop het spel gewonnen kan worden, alle cijfers zijn coordinaten op het bord

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
            if (roundWon) {
                announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
                isGameActive = false;
                return;
            }
    
        if (!board.includes(''))
            announce(TIE);
        }
        }
        // het hart van deze code, dit stuurt alles aan en controleert bijna alles 

    const announce = (type) => {
        switch(type){
            case PLAYERO_WON:
                announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
                break;
            case PLAYERX_WON:
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
                break;
            case TIE:
                announcer.innerText = 'Tie';
        }
        announcer.classList.remove('hide');
    };
    // hierdoor wordt de winnaar verkondigt of de tie als het gelijk is 

    const isValidAction = (tile) => {
        if (tile.innerText === 'X' || tile.innerText === 'O'){
            return false;
        }

        return true;
    };
    // hierdoor geen cheats (ik kijk naar jou jesse)

    const updateBoard =  (index) => {
        board[index] = currentPlayer;
    }
    // dit update het bord (duh logisch)

    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }
    // verandert de speler 


    const userAction = (tile, index) => {
        if(isValidAction(tile) && isGameActive) {
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }
    // dit zorgt ervoor dat de actie van de speler gechecked wordt en er geen illegale moves zijn 

    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add('hide');

        if (currentPlayer === 'O') {
            changePlayer();
        }
    // reset voor volgend potje (alsof iemand hier meer van wilt spelen)

         tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    }
    // dit reset de ui 


    
    tiles.forEach( (tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });
    // de tiles (dus coordinaten op het bord) om te kijken of er op die tile geclicked is 
    resetButton.addEventListener('click', resetBoard);
});
export default class Player {
    constructor(gameboard) {
        this.gameboard = gameboard;
    }

    set gameboard(newGameboard) {
        this.gameboard = newGameboard;
    }
}

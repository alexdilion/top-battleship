export default class Gameboard {
    constructor() {
        this.grid = [];
        this.attacks = [];
        this.ships = [];

        for (let i = 0; i < 10; i++) {
            this.grid[i] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        }
    }
}

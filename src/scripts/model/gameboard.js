export default class Gameboard {
    constructor() {
        this.grid = Array(10).fill(Array(10).fill(0));
        this.attacks = [];
    }
}

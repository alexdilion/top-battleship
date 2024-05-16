import shipTypes from "../misc/shipSettings";

export default class Ship {
    constructor(type) {
        this.type = type;
        this.length = shipTypes[type].length;
        this.hits = 0;
    }

    hit() {
        if (this.hits < this.length) this.hits += 1;
    }

    isSunk() {
        return this.hits === this.length;
    }
}

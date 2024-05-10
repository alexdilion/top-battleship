import Ship from "./ship";
import shipSettings from "../misc/ship-settings";

export default class Gameboard {
    constructor() {
        this.grid = [];
        this.ships = [];
        this.attacks = {};

        for (let i = 0; i < 10; i++) {
            this.grid[i] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        }
    }

    isValidLocation(shipData) {
        const shipLength = shipSettings[shipData.type].length;
        const { x, y } = shipData.coordinates;
        let isValid = true;

        if (!shipData.placeVertically) {
            isValid &&= x + shipLength <= 10;

            isValid &&= this.grid[y]
                .slice(x, x + shipLength)
                .every((cell) => !(cell instanceof Ship));
        } else {
            isValid &&= y + shipLength <= 10;

            isValid &&= this.grid
                .map((row) => row[x])
                .slice(y, y + shipLength)
                .every((cell) => !(cell instanceof Ship));
        }

        return isValid;
    }

    place(shipData) {
        if (!this.isValidLocation(shipData)) return;

        const ship = new Ship(shipData.type);
        const coordinateRange = {};

        if (!shipData.placeVertically) {
            const { x, y } = shipData.coordinates;
            coordinateRange.x = [x, x + ship.length - 1];
            coordinateRange.y = y;

            for (let i = x; i < x + ship.length; i++) {
                this.grid[y][i] = ship;
            }
        } else {
            const { x, y } = shipData.coordinates;
            coordinateRange.x = x;
            coordinateRange.y = [y, y + ship.length];

            for (let i = y; i < y + ship.length; i++) {
                this.grid[i][x] = ship;
            }
        }

        this.ships.push({
            ship,
            coordinateRange,
            placeVertically: shipData.placeVertically,
        });
    }

    attack(x, y) {
        if (this.attacks[`${x}-${y}`]) return;

        if (this.grid[y][x] === 0) {
            this.attacks[`${x}-${y}`] = "miss";

            return "miss";
        } else {
            this.attacks[`${x}-${y}`] = "hit";
            this.grid[y][x].hit();

            return "hit";
        }
    }
}

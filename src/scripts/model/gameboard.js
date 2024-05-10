import Ship from "./ship";
import shipSettings from "../misc/ship-settings";

export default class Gameboard {
    constructor() {
        this.grid = [];
        this.attacks = [];
        this.ships = [];

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
            isValid &&= !this.grid[y].slice(x, x + shipLength).includes(1);
        } else {
            isValid &&= y + shipLength <= 10;
            isValid &&= !this.grid
                .map((row) => row[x])
                .slice(y, y + shipLength)
                .includes(1);
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
                this.grid[y][i] = 1;
            }
        } else {
            const { x, y } = shipData.coordinates;
            coordinateRange.x = x;
            coordinateRange.y = [y, y + ship.length];

            for (let i = y; i < y + ship.length; i++) {
                this.grid[i][x] = 1;
            }
        }

        this.ships.push({
            ship,
            coordinateRange,
            placeVertically: shipData.placeVertically,
        });
    }
}

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
    
    place(shipData) {
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

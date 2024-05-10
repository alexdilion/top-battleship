import Gameboard from "../scripts/model/gameboard";
import Ship from "../scripts/model/ship";
import shipInfo from "../scripts/misc/ship-settings";

let gameboard;
beforeEach(() => {
    gameboard = new Gameboard();
});

test("New gameboard is empty", () => {
    gameboard.grid.forEach((row) => {
        expect(row).not.toContain(1);
    });
});

describe("Ship placement", () => {
    test("Place adds ship instance to gameboard's list of ships", () => {
        gameboard.place({
            type: "Battleship",
            coordinates: { x: 0, y: 0 },
            placeVertically: false,
        });

        const shipData = gameboard.ships[0];
        expect(shipData.ship).toBeInstanceOf(Ship);
        expect(shipData.placeVertically).toBe(false);
        expect(shipData.coordinateRange.x).toEqual(
            expect.arrayContaining([0, 3])
        );
        expect(shipData.coordinateRange.y).toEqual(0);
    });

    test("Correct horizontal placement with valid location", () => {
        gameboard.place({
            type: "Battleship",
            coordinates: { x: 0, y: 0 },
            placeVertically: false,
        });

        const actual = gameboard.grid[0];
        expect(actual.slice(0, shipInfo.Battleship.length)).not.toContain(0);
        expect(actual.slice(shipInfo.Battleship.length)).not.toContain(1);
    });

    test("Correct vertical placement with valid location", () => {
        gameboard.place({
            type: "Battleship",
            coordinates: { x: 0, y: 0 },
            placeVertically: true,
        });

        const actual = gameboard.grid.map((row) => row[0]);
        expect(actual.slice(0, shipInfo.Battleship.length)).not.toContain(0);
        expect(actual.slice(shipInfo.Battleship.length)).not.toContain(1);
    });

    test("No placement for out-of-bounds x coordinate", () => {
        const actual = gameboard.isValidLocation({
            type: "Destroyer",
            coordinates: { x: 10, y: 0 },
            placeVertically: false,
        });

        expect(actual).toBe(false);
    });

    test("No placement for out-of-bounds y coordinate", () => {
        const actual = gameboard.isValidLocation({
            type: "Destroyer",
            coordinates: { x: 0, y: 10 },
            placeVertically: true,
        });

        expect(actual).toBe(false);
    });

    test("No placement for horizontal ship overlap", () => {
        gameboard.place({
            type: "Carrier",
            coordinates: { x: 0, y: 0 },
            placeVertically: false,
        });

        const actual = gameboard.isValidLocation({
            type: "Carrier",
            coordinates: { x: 4, y: 0 },
            placeVertically: false,
        });

        expect(actual).toBe(false);
    });

    test("No placement for vertical ship overlap", () => {
        gameboard.place({
            type: "Carrier",
            coordinates: { x: 0, y: 0 },
            placeVertically: true,
        });

        const actual = gameboard.isValidLocation({
            type: "Carrier",
            coordinates: { x: 0, y: 4 },
            placeVertically: true,
        });

        expect(actual).toBe(false);
    });
});

describe("Gameboard attacks", () => {
    test("Valid hit on an empty cell", () => {
        gameboard.place({
            type: "Destroyer",
            coordinates: { x: 4, y: 3 },
            placeVertically: false,
        });

        const actual = gameboard.attack(4, 4);

        expect(actual).toMatch("miss");
    });

    test("Hit on a ship", () => {
        gameboard.place({
            type: "Destroyer",
            coordinates: { x: 4, y: 3 },
            placeVertically: false,
        });

        const actual = gameboard.attack(4, 3);

        expect(actual).toMatch("hit");
    });

    test("Ship sinks when all cells are hit", () => {
        gameboard.place({
            type: "Destroyer",
            coordinates: { x: 4, y: 3 },
            placeVertically: false,
        });

        gameboard.attack(5, 3);
        const actual = gameboard.attack(4, 3);

        expect(actual).toMatch("sunk");
    });

    test("Hits on the same ship cell are not counted", () => {
        gameboard.place({
            type: "Destroyer",
            coordinates: { x: 4, y: 3 },
            placeVertically: false,
        });

        gameboard.attack(4, 3);
        gameboard.attack(4, 3);

        expect(gameboard.ships[0].ship.isSunk()).toBe(false);
    });

    test("Game is over when all ships are sunk", () => {
        gameboard.place({
            type: "Destroyer",
            coordinates: { x: 4, y: 3 },
            placeVertically: false,
        });

        gameboard.place({
            type: "Submarine",
            coordinates: { x: 0, y: 0 },
            placeVertically: true,
        });

        gameboard.attack(4, 3);
        gameboard.attack(5, 3);
        gameboard.attack(0, 0);
        gameboard.attack(0, 1);
        gameboard.attack(0, 2);
        
        expect(gameboard.isGameOver()).toBe(true);
    });
});

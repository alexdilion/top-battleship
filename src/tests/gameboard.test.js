import Gameboard from "../scripts/model/gameboard";
import Ship from "../scripts/model/ship";
import shipInfo from "../scripts/misc/ship-settings";

test("New gameboard is empty", () => {
    const gameboard = new Gameboard();

    gameboard.grid.forEach((row) => {
        expect(row).not.toContain(1);
    });

    expect(gameboard.attacks.length).toEqual(0);
});

describe("Ship placement", () => {
    test("Place adds ship instance to gameboard's list of ships", () => {
        const gameboard = new Gameboard();
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
        const gameboard = new Gameboard();
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
        const gameboard = new Gameboard();
        gameboard.place({
            type: "Battleship",
            coordinates: { x: 0, y: 0 },
            placeVertically: true,
        });

        const actual = gameboard.grid.map((row) => row[0]);
        expect(actual.slice(0, shipInfo.Battleship.length)).not.toContain(0);
        expect(actual.slice(shipInfo.Battleship.length)).not.toContain(1);
    });
});

import Ship from "../scripts/model/ship";
import shipTypes from "../scripts/misc/ship-settings";

test("Creates ship given a valid argument", () => {
    const ship = new Ship("Carrier");

    expect(ship.length).toEqual(shipTypes.Carrier.length);
    expect(ship.hits).toEqual(0);
    expect(ship.type).toMatch("Carrier");
});

test("Hit method increases hits count", () => {
    const ship = new Ship("Carrier");
    ship.hit();

    expect(ship.hits).toEqual(1);
});

test("Hits does not exceed ship length", () => {
    const ship = new Ship("Destroyer");

    for (let i = 0; i < 10; i++) {
        ship.hit();
    }

    expect(ship.hits).toEqual(2);
});

test("Ship is sunk if hits equal ship length", () => {
    const ship = new Ship("Destroyer");
    ship.hit();
    ship.hit();

    expect(ship.isSunk()).toBe(true);
});

test("Ship is not sunk if hits is less than ship length", () => {
    const ship = new Ship("Battleship");

    expect(ship.isSunk()).toBe(false);
});

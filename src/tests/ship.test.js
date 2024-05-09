import Ship from "../scripts/model/ship";

test("Creates ship given a valid argument", () => {
    const ship = new Ship(5);

    expect(ship.length).toEqual(5);
    expect(ship.hits).toEqual(0);
});

test("Hit method increases hits count", () => {
    const ship = new Ship(5);
    ship.hit();

    expect(ship.hits).toEqual(1);
});

test("Hits does not exceed ship length", () => {
    const ship = new Ship(2);

    for (let i = 0; i < 10; i++) {
        ship.hit();
    }

    expect(ship.hits).toEqual(2);
});

test("Ship is sunk if hits exceed ship length", () => {
    const ship = new Ship(1);
    ship.hit();

    expect(ship.isSunk()).toBe(true);
});

test("Ship is not sunk if hits is less than ship length", () => {
    const ship = new Ship(1);

    expect(ship.isSunk()).toBe(false);
});

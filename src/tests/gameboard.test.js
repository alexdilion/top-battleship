import Gameboard from "../scripts/model/gameboard";

test("New gameboard is empty", () => {
    const gameboard = new Gameboard();

    gameboard.grid.forEach((row) => {
        expect(row).not.toContain(1);
    });
    
    expect(gameboard.attacks.length).toEqual(0);
});

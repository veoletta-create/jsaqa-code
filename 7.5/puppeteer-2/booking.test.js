const {
    clickElement,
    isActive,
    isVisible,
    getText,
    clickByText,
    clickElementInArray,
} = require("./lib/commands");

let page;

beforeEach(async () => {
    page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
});

afterEach(() => {
    page.close();
});

describe("Бронирование билетов в веб-приложении", () => {
    beforeEach(async () => {
        await page.goto("https://qamid.tmweb.ru/client/index.php", {
            timeout: 10000,
        });

        await clickElement(page, "a:nth-child(2)");
        await clickElement(page, ".movie-seances__list li:first-child a");
    });

    test("Смотрим возможность забронировать два билета на завтра", async () => {
        const expectedStateButton = true;
        const expectedTextButton = "Забронировать";

        const selectorNotTaken =
            ".buying-scheme__chair_standart:not(.buying-scheme__chair_taken)";
        await clickElementInArray(page, selectorNotTaken, 0);
        await clickElementInArray(page, selectorNotTaken, 1);

        const actualState = await isActive(page, ".acceptin-button");
        const actualText = await getText(page, ".acceptin-button");
        expect(actualState).toBe(expectedStateButton);
        expect(actualText).toBe(expectedTextButton);
    }, 30000);

    test("Смотрим возможность забронировать один билет на завтра", async () => {
        const expectedStateButton = true;
        const expectedTextButton = "Забронировать";

        await clickElement(
            page,
            ".buying-scheme__chair_standart:not(.buying-scheme__chair_taken)",
        );

        const actualState = await isActive(page, ".acceptin-button");
        const actualText = await getText(page, ".acceptin-button");

        expect(actualState).toBe(expectedStateButton);
        expect(actualText).toBe(expectedTextButton);
    }, 30000);

    test("Пытаемся забронировать ноль билетов на завтра", async () => {
        const expectedStateHall = true;
        await clickByText(page, "Забронировать");

        const isHallVisible = await isVisible(page, ".buying-scheme__wrapper");
        expect(isHallVisible).toBe(expectedStateHall);
    }, 30000);
});
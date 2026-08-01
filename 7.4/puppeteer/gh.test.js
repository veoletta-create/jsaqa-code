const puppeteer = require('puppeteer');

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 50,
  });
});

afterAll(async () => {
  await browser.close();
});

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(async () => {
  await page.close();
});

async function navigateTo(url) {
  await page.goto(url, { waitUntil: 'networkidle2' });
}

describe("Github page tests", () => {
  beforeEach(async () => {
    await navigateTo("https://github.com/team");
  });

  test("The h1 header content", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector("h1");
    const title = await page.title();
    expect(title).toContain("Change is constant");
  }, 15000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toContain("#start-of-content");
  }, 10000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, { visible: true });
    const actual = await page.$eval(btnSelector, (link) =>
      link.textContent.trim()
    );
    expect(actual).toContain("Get started");
  }, 10000);
});

describe("Second task - add 3 new tests", () => {
  test("Blog page title contains 'The GitHub Blog'", async () => {
    await navigateTo("https://github.blog");
    const title = await page.title();
    expect(title).toContain("The GitHub Blog");
  }, 15000);

  test("Security page title contains 'Security'", async () => {
    await navigateTo("https://github.com/features/security");
    const title = await page.title();
    expect(title).toContain("Security");
  }, 15000);

  test("Pricing page title contains 'Pricing'", async () => {
    await navigateTo("https://github.com/pricing");
    const title = await page.title();
    expect(title).toContain("Pricing");
  }, 15000);
});
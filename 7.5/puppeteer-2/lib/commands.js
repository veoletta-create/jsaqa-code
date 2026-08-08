module.exports = {
    clickElement: async function (page, selector) {
        try {
            await page.waitForSelector(selector);
            await page.click(selector);
        } catch {
            throw new Error(`Selector is not clickable: ${selector}`);
        }
    },
    clickElementInArray: async function (page, selector, index = 0) {
        try {
            await page.waitForSelector(selector);

            const elements = await page.$$(selector);

            if (!elements.length || !elements[index]) {
                throw new Error(
                    `No element found for selector: ${selector} with index: ${index}`,
                );
            }

            await elements[index].click();
        } catch {
            throw new Error(
                `Selector is not clickable: ${selector} at index ${index}`,
            );
        }
    },
    getText: async function (page, selector) {
        try {
            await page.waitForSelector(selector);
            return await page.$eval(selector, (link) => link.textContent);
        } catch {
            throw new Error(`Text is not available for selector: ${selector}`);
        }
    },
    isActive: async function (page, selector) {
        try {
            await page.waitForSelector(selector);
            return await page.$eval(selector, (el) => !el.disabled);
        } catch {
            throw new Error(
                `Cannot check active state for selector: ${selector}`,
            );
        }
    },
    isVisible: async function (page, selector) {
        try {
            await page.waitForSelector(selector, { visible: true });
            return await page.$eval(selector, (el) => {
                const style = window.getComputedStyle(el);
                return (
                    style &&
                    style.display !== "none" &&
                    style.visibility !== "hidden" &&
                    el.offsetParent !== null
                );
            });
        } catch {
            throw new Error(
                `Cannot check visibility for selector: ${selector}`,
            );
        }
    },
    clickByText: async function (page, text) {
        try {
            await page.waitForXPath(`//*[text()="${text}"]`);
            const [element] = await page.$x(`//*[text()="${text}"]`);

            if (!element) {
                throw new Error(`Element with text "${text}" not found`);
            }

            await element.click();
        } catch {
            throw new Error(`Failed to click element with text: "${text}"`);
        }
    },
    clickElementXPath: async function (page, xpath) {
        try {
            await page.waitForXPath(xpath);
            const [el] = await page.$x(xpath);

            if (!el) {
                throw new Error(`Element not found for XPath: ${xpath}`);
            }

            await el.click();
        } catch {
            throw new Error(`XPath is not clickable: ${xpath}`);
        }
    },
};

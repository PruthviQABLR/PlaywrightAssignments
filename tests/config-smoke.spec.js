import { expect, test } from "@playwright/test";

const BASE_URL = 'https://eventhub.rahulshettyacademy.com'

async function openLoginPage(page) {
    await page.goto(`${BASE_URL}/login`)

    await expect(
        page.getByRole('heading', { name: 'Sign in to EventHub' })
    ).toBeVisible();
}


test("TC-01 Smoke Test", async ({ page }) => {

    await openLoginPage(page)
    await expect(page).toHaveTitle(/EventHub/i);
    // assert the email field and sign in button is visible

    await expect(page.locator("#email")).toBeVisible()
    await expect(page.locator("#login-btn")).toBeVisible()
})

test("TC-02-Compare page fixture and browser context", async ({ page }) => {

    await openLoginPage(page)
    const email = "beginner@sample.com"
    await page.locator("#email").fill(email)
    await expect(page.locator("#email")).toHaveValue(email)
})

test("TC-03 Isolated browser context", async ({ browser }) => {
    const isolatedContext = await browser.newContext()
    const isolatedPage = await isolatedContext.newPage()
    await isolatedPage.goto(`${BASE_URL}/login`);
    await expect(isolatedPage.getByRole("heading", { name: "Sign in to EventHub" })).toBeVisible();
    await expect(isolatedPage.getByPlaceholder("you@email.com")).toHaveValue("");
    await isolatedContext.close();
})

// Page fixture:
// Playwright provides one ready-to-use page for each test.

// Browser context:
// A browser context is an isolated browser session that can create one or more pages.

// Fresh browser context:
// Every new browser context starts with a clean state (no cookies, local storage, or session data).
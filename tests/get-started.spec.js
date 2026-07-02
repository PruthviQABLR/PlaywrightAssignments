// playwright: Browser automation library.
// @playwright/test: Testing framework built on top of Playwright.


import { expect, test } from '@playwright/test'

const BASE_URL = 'https://eventhub.rahulshettyacademy.com'

async function openLoginPage(page) {
    await page.goto(`${BASE_URL}/login`);

    await expect(
        page.getByRole('heading', { name: 'Sign in to EventHub' })
    ).toBeVisible();
}

test("TC-01-EventHub login page loads", async ({ page }) => {
    await openLoginPage(page)

    await expect(page.getByPlaceholder("you@email.com")).toBeVisible()
    await expect(page.locator("#login-btn", { name: 'Sign In' })).toBeVisible()
})

// promise ensures that each action finishes before next one starts

test("TC-02 Simple login-Page test", async ({ page }) => {
    await openLoginPage(page)

    // assert the page url contains /login
    await expect(page).toHaveURL(/login/)

    //Assert the password field located by label Password is visible
    await expect(page.locator("label", { hasText: 'Password' })).toBeVisible()

})






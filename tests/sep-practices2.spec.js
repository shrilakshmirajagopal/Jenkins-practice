import { test, expect } from "@playwright/test";

test.describe("Payment Plans Test Group @sep02", () => {

    test.beforeEach(async ({ page }) => {

        const code = Buffer.from(`${process.env.SEP_USERNAME}:${process.env.SEP_PASSWORD}`).toString("base64");
        await page.setExtraHTTPHeaders({'Authorization': `Basic ${code}`});
        await page.goto(process.env.SEP_QA_URL);

        let firstNameInputField = page.locator("//input[@formcontrolname='firstName']");
        let lastNameInputField = page.locator("//input[@formcontrolname='lastName']");
        let emailInputField = page.locator("//input[@formcontrolname='email' and @type='email']");
        let phoneNumberInputField = page.locator("//input[@formcontrolname='phoneNumber']");
        let howDidYouHearAboutUsDropdown = page.locator("//mat-label[text()='How did you hear about us?']");
        let nextButton = page.locator("//button[@type='submit']");

        await firstNameInputField.fill("Muhtar");
        await lastNameInputField.fill("Mahmut");
        await emailInputField.fill("muhtarmahmut@example.com");
        await phoneNumberInputField.fill("555-123-4567");
        await howDidYouHearAboutUsDropdown.click();
        await page.click("//span[text()='Email']");
        await nextButton.click();

        await page.waitForTimeout(3000);

    });


  test("Verify that Step 2 stepper is blue and Step 1 stepper is green.", async ({ page }) => {
    
    let step1StepperCircle = page.locator("//div[@class='step-circle' and span[text()='1']]");
    let step2StepperCircle = page.locator("//div[@class='step-circle' and span[text()='2']]");

    await expect(step2StepperCircle).toHaveCSS("background-color", "rgb(1, 201, 255)");
    await expect(step1StepperCircle).toHaveCSS("background-color", "rgb(172, 245, 138)");

  });


  test("Verify that the Next button is disabled by default.", async ({ page }) => {

    let inactiveNextButton = page.locator("//button[text()='Next']");
    await expect(inactiveNextButton).toBeDisabled();
    
  });


  test("Verify that the Next button becomes enabled when a payment plan is selected", async ({ page }) => {

    let upfrontpaymentPlanOption = page.locator("//mat-expansion-panel[.//span[@class='payment-type' and text()=' Upfront ']]");
    await upfrontpaymentPlanOption.click();

    let activeNextButton = page.locator("//button[contains(@class, 'next-button') and text()='Next']");
    await expect(activeNextButton).toBeEnabled();
    
  });


  test("Verify Clicking the active next button will change the stepper 2 color to green", async ({ page }) => {
    let upfrontpaymentPlanOption = page.locator("//mat-expansion-panel[.//span[@class='payment-type' and text()=' Upfront ']]");
    await upfrontpaymentPlanOption.click();

    let activeNextButton = page.locator("//button[contains(@class, 'next-button') and text()='Next']");
    await activeNextButton.click();
    let step2StepperCircle = page.locator("//div[@class='step-circle' and span[text()='2']]");
    await expect(step2StepperCircle).toHaveCSS("background-color", "rgb(172, 245, 138)");

  });


});
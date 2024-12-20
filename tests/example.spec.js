// @ts-check
const { test, expect } = require('@playwright/test');

const URL = "https://buggy.justtestit.org/";

test.beforeEach(async ({ page }) => {
  await page.goto(URL);
});

test('has title', async ({ page }) => {
  await expect(page).toHaveTitle("Buggy Cars Rating");
  console.log(await page.title());
  console.log("This is my first test!");
    });

test("Button Register redirects me to /register", async ({ page }) => {
      await page.getByRole("link", { name: "Register" }).click();
      await expect(page).toHaveURL(URL + "register");
    });

 // happy path
 test("Register user with valid credentials", async ({ page }) => {
   await page.getByRole("link", { name: "Register" }).click();
   await expect(page).toHaveURL(URL + "register");
 // Fill in the registration form
   const uniqueLogin = `Jacek_${Date.now()}`;
   console.log(uniqueLogin);

   await page.getByLabel('Login').fill(uniqueLogin);
   await page.getByLabel('First Name').fill("Jacek");
   await page.getByLabel('Last Name').fill("Kowalski");
   await page.locator('.my-form').locator('#password').fill("Test1234!");
   await page.locator('.my-form').locator('#confirmPassword').fill("Test1234!");
  // Click the "Register" button within the form
  await page.locator('.my-form').getByRole("button", { name: "Register" }).click();
   // Verify the registration success message
  await expect(page.getByText('Registration is successful')).toBeVisible();
  // Fill in the registration form
  await page.locator('[name="login"]').fill(uniqueLogin);
  await page.locator('form .form-control[name="password"]').nth(0).fill("Test1234!");
  // Click the "Login" button
  await page.getByRole("button", { name: "Login" }).click();
  // Verify the Login by viewing the hello message
  await expect(page.getByText('Hi, Jacek')).toBeVisible();
 
});

  test("throws error in UI when registering already registered user", async ({ page }) => {
    await page.getByRole("link", { name: "Register" }).click();
    await expect(page).toHaveURL(URL + "register");
   // Fill in the registration form
    await page.getByLabel('Login').fill("Anežka");
    await page.getByLabel('First Name').fill("Anežka");
    await page.getByLabel('Last Name').fill("!");
    await page.locator('.my-form').locator('#password').fill("1aA!bcde");
    await page.locator('.my-form').locator('#confirmPassword').fill("1aA!bcde");
    // Click the "Register" button within the form
    await page.locator('.my-form').getByRole("button", { name: "Register" }).click();
    await expect(page.getByText('UsernameExistsException: User already exists')).toBeVisible();
  });

  //negative paths for login form 
    test.describe("login form validation", () => {
    test("shows right alert if Login is blank", async ({ page }) => {
      await page.locator('[name="login"]').fill("");
      await page.locator('form .form-control[name="password"]').nth(0).fill("Test1234!");
      // Click the "Login" button
      await page.getByRole("button", { name: "Login" }).click();
      await expect(page.getByText('Required')).toBeVisible();
    });

    test("shows alert if invalid username/password", async ({ page }) => {
      await page.locator('[name="login"]').fill("Anežka");
      await page.locator('form .form-control[name="password"]').nth(0).fill("Tests1234!");
      // Click the "Login" button
      await page.getByRole("button", { name: "Login" }).click();
      await expect(page.getByText("Invalid username/password")).toBeVisible();
    });

    test("shows alert if password is blank", async ({ page }) => {
      await page.locator('[name="login"]').fill("Anežka");
      await page.locator('form .form-control[name="password"]').nth(0).fill("");
      // Click the "Login" button
      await page.getByRole("button", { name: "Login" }).click();
      await expect(page.getByText('Required')).toBeVisible();
    });
  });

   
  



 


  

  
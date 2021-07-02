require("dotenv").config();
import { Selector } from "testcafe";

fixture`Login`.page`http://localhost:3000/login`;

const welcomeDiv = Selector("#welcome");
const loginButton = Selector("#submit");
const mainSiteButton = Selector("#main-site");

test("Login with valid credentials", async (t) => {
  await t
    .typeText("#username", process.env.ADMIN_USERNAME)
    .typeText("#password", process.env.ADMIN_PASSWORD)
    .click("#submit")
    .expect(welcomeDiv.innerText)
    .eql("Welcome, user1");
});
test("Login with invalid username", async (t) => {
  await t
    .setNativeDialogHandler(() => true)
    .typeText("#username", "fakeUser")
    .typeText("#password", process.env.ADMIN_PASSWORD)
    .click("#submit")
    .expect(loginButton.exists)
    .ok();
});
test("Login with invalid password", async (t) => {
  await t
    .setNativeDialogHandler(() => true)
    .typeText("#username", process.env.ADMIN_USERNAME)
    .typeText("#password", "fakePassword")
    .click("#submit")
    .expect(loginButton.exists)
    .ok();
});
test("Logout", async (t) => {
  await t
    .typeText("#username", process.env.ADMIN_USERNAME)
    .typeText("#password", process.env.ADMIN_PASSWORD)
    .click("#submit")
    .click("#logout")
    .expect(mainSiteButton.exists)
    .ok();
});

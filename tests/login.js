import { Selector } from "testcafe";

fixture`Login`
	.page`http://localhost:3000/login`;

const welcomeDiv = Selector("#welcome");
const loginLink = Selector("#login");
const loginButton = Selector('#submit')

test("Login with valid credentials", async (t) => {
   await t
     .typeText("#username", "user1")
     .typeText("#password", "qwerty")
     .click("#submit")
     .expect(welcomeDiv.innerText)
     .eql("Welcome, user1");
});
test("Login with invalid username", async (t) => {
  await t
    .setNativeDialogHandler(() => true)
    .typeText("#username", "fakeUser")
    .typeText("#password", "qwerty")
    .click("#submit")
    .expect(loginButton.exists)
    .ok();
});
test("Login with invalid password", async (t) => {
  await t
    .setNativeDialogHandler(() => true)
    .typeText("#username", "user1")
    .typeText("#password", "qwery")
    .click("#submit")
    .expect(loginButton.exists)
    .ok();
});
test("Logout", async (t) => {
  await t
    .typeText("#username", "user1")
    .typeText("#password", "qwerty")
    .click("#submit")
    .click(".about-and-login")
    .expect(loginLink.exists).ok();
});
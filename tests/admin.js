require("dotenv").config();
import { Selector } from "testcafe";
import { Role } from "testcafe";

const adminUser = Role("http://localhost:3000/login", async (t) => {
  await t
    .typeText("#username", process.env.ADMIN_USERNAME)
    .typeText("#password", process.env.ADMIN_PASSWORD)
    .click("#submit");
});

fixture`Upload and admin`.page`http://localhost:3000/`;

const titleInput = Selector("input").withAttribute('name', 'title');
const artistInput = Selector("input").withAttribute("name", "artist_name");
const mapInput = Selector("input").withAttribute(
  "placeholder",
  "Search your city here..."
);
const mapSearchButton = Selector('.leaflet-control-geocoder-icon')
const mapSearchOptions = Selector('.leaflet-control-geocoder-alternatives')
const mapSearchIcon = Selector('.leaflet-marker-icon')
const textLabel = Selector('.radio-label').withAttribute('for', 'upload_text')
const imageLabel = Selector(".radio-label").withAttribute("for", "upload_image");
const textArea = Selector('textarea').withAttribute('name', 'story')
const fileUploadBtn = Selector('.media-input')
const submitButton = Selector('button').withAttribute('type', 'submit')
const successAlert = Selector('.success-alert')
const welcomeDiv = Selector("#welcome");
const cards = Selector(".MuiPaper-root");
const textCardTitle = Selector(".MuiPaper-root")
  .find("h2")
  .withExactText("Testing text upload");
const textCardEditButton = textCardTitle.parent(".MuiCardContent-root").child().withAttribute('href', '/edit');
const textCardStory = textCardTitle
  .parent(".MuiCardContent-root")
  .child('.admin-card-story')
const textAreaEdit = Selector("textarea").withAttribute("name", "content_text");
const imageCardTitle = Selector(".MuiPaper-root")
  .find("h2")
  .withExactText("Testing file upload");
const textCardDeleteButton = textCardTitle
  .parent(".MuiCardContent-root")
  .child('.delete-button')
const imageCardDeleteButton = imageCardTitle
  .parent(".MuiCardContent-root")
  .child(".delete-button")


test("Text upload works", async (t) => {
	
  await t
    .click("#upload-button")
    .typeText(titleInput, "Testing text upload")
    .typeText(artistInput, "Test user")
    .typeText(mapInput, "Milan")
    .click(mapSearchButton)
    .expect(mapSearchOptions.exists)
    .ok()
    .click(mapSearchOptions.child(0))
    .expect(mapSearchIcon.exists)
    .ok()
    .click(textLabel)
    .expect(textArea.exists)
    .ok()
    .typeText(textArea, "Test content")
    .click(submitButton)
    .expect(successAlert.exists)
    .ok();
});

test("File upload works", async (t) => {
  await t
    .click("#upload-button")
    .typeText(titleInput, "Testing file upload")
    .typeText(artistInput, "Test user")
    .typeText(mapInput, "Milan")
    .click(mapSearchButton)
    .expect(mapSearchOptions.exists)
    .ok()
    .click(mapSearchOptions.child(0))
    .expect(mapSearchIcon.exists)
    .ok()
    .click(imageLabel)
    .expect(textArea.exists)
    .ok()
    .typeText(textArea, "Test content")
    .expect(fileUploadBtn.exists)
    .ok()
    .setFilesToUpload(fileUploadBtn, [
      "../uploads/Melody_dec_2020.jpg"
    ])
    .click(submitButton)
    .expect(successAlert.exists)
    .ok();
});

test("Uploaded story can be edited by admin", async (t) => {
  await t
    .useRole(adminUser)
    .setNativeDialogHandler(() => true)
    .navigateTo("http://localhost:3000/admin")
    .expect(welcomeDiv.innerText)
    .eql("Welcome, user1")
    .expect(textCardTitle.exists)
    .ok()
    .expect(textCardEditButton.exists)
    .ok()
    .click(textCardEditButton)
    .typeText(textAreaEdit, " editing")
    .expect(textAreaEdit.value)
    .eql("Test content editing")
    .click(submitButton)
    .expect(textCardStory.innerText)
    .eql("Test content editing");
});

test("Admin can see and search all artwork in database", async (t) => {
  await t
    .useRole(adminUser)
    .navigateTo("http://localhost:3000/admin")
    .expect(welcomeDiv.innerText)
    .eql("Welcome, user1")
    .click("#artwork-toggle")
    .expect(cards.count)
    .gt(1)
    .typeText("#search", "test user")
    .expect(cards.count)
    .eql(2);
});

test("Uploaded stories can be deleted by admin", async (t) => {
  await t
    .useRole(adminUser)
    .setNativeDialogHandler(() => true)
    .navigateTo("http://localhost:3000/admin")
    .expect(welcomeDiv.innerText)
    .eql("Welcome, user1")
    .expect(textCardTitle.exists)
    .ok()
    .expect(textCardDeleteButton.exists)
    .ok()
    .click(textCardDeleteButton)
    .expect(imageCardDeleteButton.exists)
    .ok()
    .click(imageCardDeleteButton)
    .expect(textCardTitle.exists)
    .notOk()
	.expect(imageCardTitle.exists)
    .notOk();
});

test("Admin access a form to create a new admin", async (t) => {
  await t
    .useRole(adminUser)
    .navigateTo("http://localhost:3000/admin")
    .expect(welcomeDiv.innerText)
    .eql("Welcome, user1")
    .click("#create-admin")
    .expect(Selector("#username").exists)
    .ok()
    .expect(Selector("#email").exists)
    .ok();
});


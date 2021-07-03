import { Selector } from "testcafe";

fixture`Homepage`.page`http://localhost:3000/`;

const cards = Selector(".MuiPaper-root");
const listButton = Selector(".tab-button").withText("List view");
const mapContainer = Selector(".leaflet-container");
const searchBar = Selector(".search-bar");
const searchResults = Selector(".MuiCard-root");
const imageCheckbox = Selector('.switch-checkbox').withAttribute("name", "image")

test("List of cards shows after intro content", async (t) => {
  await t.expect(cards.count).gt(1);
});

test("List shows after clicking list button", async (t) => {
  await t.click(listButton).expect(mapContainer.exists).ok();
});

test("Search and filter work", async (t) => {

  await t.typeText(searchBar, "sto").click(imageCheckbox);
  const count = await searchResults.count;
  for (let i = 0; i < count; i++) {
    await t
      .expect((await searchResults.nth(i).innerText).toLowerCase())
      .contains("sto")
      .expect(await searchResults.nth(i).find('img').exists)
      .notOk();
  }
});

import { Selector } from "testcafe";

fixture`Homepage`.page`http://localhost:3000/`;

const cards = Selector(".MuiPaper-root");
const listButton = Selector(".tab-button").withText("STORY VIEW");
const mapContainer = Selector(".leaflet-container");
const searchBar = Selector(".search-bar");
const searchResults = Selector(".MuiCard-root");
const imageCheckbox = Selector('.switch-checkbox').withAttribute("name", "image")

test("Map shows on page load", async (t) => {
  await t.expect(mapContainer.exists).ok();
});

test("List shows after clicking list button", async (t) => {
  await t.click(listButton).expect(cards.count).gt(1);
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

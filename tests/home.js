// TODO check search and filter works

import { Selector } from "testcafe";

fixture`Homepage`.page`http://localhost:3000/`;

const cards = Selector('.MuiPaper-root')
const mapButton = Selector('.tab-button').withText('Map')
const mapContainer = Selector('.leaflet-container')

test("List of cards shows after intro content", async (t) => {
  await t
    .click("#main-site")
    .expect(cards.count).gt(1)
});

test("Map shows after clicking map button", async (t) => {
  await t
  .click("#main-site")
  .click(mapButton)
  .expect(mapContainer.exists).ok();
});

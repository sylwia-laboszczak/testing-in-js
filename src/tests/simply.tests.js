describe("Znany lekarz", () => {
  beforeEach(async () => {
    await browser.url("https://www.znanylekarz.pl/");
  });

  it("Accept cookies button", async () => {
    // setup
    const acceptCookiesBtnSelector = "button#onetrust-accept-btn-handler";
    const acceptCookiesBtn = await $(acceptCookiesBtnSelector);

    await acceptCookiesBtn.waitUntil(
      async function () {
        const innerText = await this.getText();
        return innerText === "Zaakceptuj";
      },
      {
        timeout: 5000,
        timeoutMsg: "expected text to be different after 3s",
      }
    );

    // execute
    await $(acceptCookiesBtnSelector).click();

    // verify
    const selector = "ul.list-inline .list-inline-item";
    const tags = $$(selector);

    // verify
    await expect(await tags[0]).toHaveText("Ginekolog");
    await expect(await tags[1]).toHaveText("Ortopeda");
    await expect(await tags[2]).toHaveText("Psycholog");
    await expect(await tags[3]).toHaveText("Stomatolog");
    await expect(await tags[4]).toHaveText("Psychiatra");
  });

  it("Search single doctor", async () => {
    // setup
    const firstSearchField = await $$("input.form-control.search-field")[0];
    await firstSearchField.setValue("Ginekolog");

    // execute
    const searchBtn = await $(".search-button.btn-block.btn-primary");
    await waitAndClick(searchBtn);

    // verify
    const firstCard = await $(".card.card-shadow-1.mb-1");
    await expect(await firstCard).toExist();
    await expect(
      await firstCard.$$('span[data-test-id="doctor-specializations"]')[0]
    ).toHaveTextContaining("Ginekolog");
  });

  it("Search the city", async () => {
    // setup
    const firstSearchField = await $$("input.form-control.search-field")[1];
    await firstSearchField.setValue("Warszawa");

    // execute
    const searchBtn = await $(".search-button.btn-block.btn-primary");
    await waitAndClick(searchBtn);

    // verify
    const firstCard = await $(".card.card-shadow-1.mb-1");
    await expect(await firstCard).toExist();
    await expect(
      await firstCard.$$("span.text-truncate")[0]
    ).toHaveTextContaining("Warszawa");
  });

  it("Choose single specialist for online consultation", async () => {
    // setup
    const onlineBtn = await $('a[data-nav-link="online-consultation"]');
    await waitAndClick(onlineBtn);
    const multiSelectBtn = await $('div[data-tab-id="online-consultation"]');
    await waitAndClick(multiSelectBtn);
    const multiSelectOptionsBtn = await $$("span.multiselect__option")[0];
    await waitAndClick(multiSelectOptionsBtn);

    // execute

    const searchBtn = await $(
      'button[data-test-id="online-consultations-search-button"]'
    );

    await waitAndClick(searchBtn);

    // verify
    const firstCard = await $(".card.card-shadow-1.mb-1");
    await expect(await firstCard).toExist();
    await expect(
      await firstCard.$$('span[data-test-id="doctor-specializations"]')[0]
    ).toHaveText("Alergolog");
  });

});

async function waitAndClick(searchBtn) {
  await searchBtn.waitForDisplayed({ timeout: 3000 });
  await searchBtn.waitForClickable({ timeout: 3000 });
  await searchBtn.click();
}


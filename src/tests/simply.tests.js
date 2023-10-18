describe("Znany lekarz", () => {
  beforeEach(async () => {
    await browser.url("https://www.znanylekarz.pl/");
  });

  it("Check page title", async () => {
    // setup
    const title = await browser.getTitle();

    // execute
    await expect(browser).toHaveTitle(
      "Znajdź lekarza - Umów wizytę - ZnanyLekarz.pl"
    );

    // verify
    if (title !== "Znajdź lekarza - Umów wizytę - ZnanyLekarz.pl") {
      throw new Error("Page title isnt correct");
    }
  });

  it("Check default search bar filter", async () => {
    // setup & execute
    const inOfficeVisits = await $('.//a[@data-nav-link="office-visit"]');

    // verify
    await expect(inOfficeVisits).toHaveAttributeContaining("class", "focus");
  });

  it("Check default main picture on the site", async () => {
    // setup & execute
    const picture = await $(
      './/div[@data-id="intro-bkg"]//*[contains(concat(" ",normalize-space(@class)," ")," active ")]'
    );
    // verify
    await expect(picture).toExist();
  });

  it("Find first doctor in popular section ", async () => {
    // setup 
    const text = await $$("#new-doctors-carousel")[0];

    // execute
    const el = await text.$$("li")[0].$("h3.dp-doctor-card-header");

    // verify
    await expect(el).toExist();
  });
});

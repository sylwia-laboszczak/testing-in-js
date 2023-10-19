const chai = require("chai");

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
    await expect(await tags[0]).toHaveText("Ginekolog");
    await expect(await tags[1]).toHaveText("Ortopeda");
    await expect(await tags[2]).toHaveText("Psycholog");
    await expect(await tags[3]).toHaveText("Stomatolog");
    await expect(await tags[4]).toHaveText("Psychiatra");
  });

  it("execute with params", async () => {
    // setup
    const mainHeaderSelector = "h1.intro-header";

    // execute
    const mainHeaderText = await browser.execute(function (selector) {
      return document.querySelector(selector).innerText;
    }, mainHeaderSelector);
    await browser.pause(1000);

    // verify
    chai.expect(mainHeaderText).to.equal("Znajdź lekarza i umów wizytę");
  });

  it("Should navigate user to Pro page", async () => {
    await $('a.btn-primary[href*="pro.znanylekarz.pl"]').click();
    await browser.waitUntil(
      async () =>
        (await $("div.header-content img#znanylekrarz-pro-logo").getAttribute(
          "alt"
        )) === "ZnanyLekarz Pro logo"
    );

    await expect(await $("div.header-content img#znanylekrarz-pro-logo")).toHaveAttribute("alt", "ZnanyLekarz Pro logo");

  });
});
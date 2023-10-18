// const { expect } = require('chai');

describe("Conduit", () => {
  beforeEach(async () => {
    await browser.url("https://demo.realworld.io/#/");
  });

    it("Check page title", async () => {
      const title = await browser.getTitle();
      console.log(title);
      await expect(browser).toHaveTitle("Home — Conduit");
      if (title !== "Home — Conduit") {
        throw new Error("Page title isnt correct");
      }
    });

  it("Open Popular tags Welcome", async () => {
    const selector = "div.tag-list .tag-pill";

    const elem = await $(selector);
    await elem.waitUntil(
      async function () {
        const innerText = await this.getText();
        console.log(innerText);
        return innerText === "welcome";
      },
      {
        timeout: 3000,
        timeoutMsg: "expected text to be different after 3s",
      }
    );

    const tags = $$(selector)

    expect(await tags[0]).toHaveText('welcome')
    expect(await tags[1]).toHaveText('implementations')
    expect(await tags[2]).toHaveText('codebaseShow')
    expect(await tags[3]).toHaveText('ipsum')
    expect(await tags[4]).toHaveText('qui')
    expect(await tags[5]).toHaveText('cupiditate')


    console.log("ending Tests");

    // await newLocal.click();
  });
});

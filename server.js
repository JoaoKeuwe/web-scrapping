const puppeteer = require("puppeteer");

const scraping = async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto("https://gamesfull.app/");

  const wrapperMenu = ".carousel__wrapper";
  await page.waitForSelector(wrapperMenu, {
    visible: true,
  });

  const firstChildSelector = ` .poster__title`;
  await page.waitForSelector(firstChildSelector, { visible: true });

  const firstTitle = await page.$$(firstChildSelector);

  if (firstTitle.length > 0) {
    await firstTitle[6].click();
  } else {
    console.log("Não há títulos suficientes.");
  }

  const classButtonDialogDowload = "[alt='descargas svg']";
  const classButtonDowload = ".board__btn--c2";

  await page.waitForSelector(classButtonDialogDowload, { visible: true });
  await page.click(classButtonDialogDowload);

  await page.waitForSelector(classButtonDowload, { visible: true });
  await page.click(classButtonDowload);

  const linkSelector = ".link-container > a";
  await page.waitForSelector(linkSelector, { visible: true });
  await page.click(linkSelector);
};

scraping();

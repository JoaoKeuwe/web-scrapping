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

  const firstChildSelector = `.poster__title`;
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

  // Agora, vamos pegar o primeiro link dentro de .link-container
  const linkSelector = ".link-container > a";

  // Espera o link dentro de .link-container ser visível
  await page.waitForSelector(linkSelector, { visible: true });

  // Captura o primeiro link dentro de .link-container e clica nele
  const link = await page.$(linkSelector);
  if (link) {
    await link.click();
  } else {
    console.log("Nenhum link encontrado dentro de .link-container.");
  }
};

scraping();

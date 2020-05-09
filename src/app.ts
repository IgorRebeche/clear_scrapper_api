import puppeteer from "puppeteer";

async function run() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
      height: 800,
      width: 1080,
    },
  });
  const page = await browser.newPage();

  await page.goto("https://google.com");
  await page.focus(
    "#tsf > div:nth-child(2) > div.A8SBwf > div.RNNXgb > div > div.a4bIc > input"
  );
  await page.keyboard.type("Teste");
  await page.keyboard.down("Enter"); // browser.close();

  await page.waitForNavigation();
  await page.click("#rso > div:nth-child(1) > div > div.r > a > h3");
  const data = await page.evaluate(() => document.querySelector("*").outerHTML);
  console.log(data);
}

run();

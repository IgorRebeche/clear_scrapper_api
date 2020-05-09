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

  await page.goto("https://www.clear.com.br/pit/");
  // await page.screenshot({ path: "screenshots/github.png" });
  // const searchValue = await page.$eval(
  //   "input[name=identificationNumber]",
  //   (el) => {
  //     el.innerHTML = "13023387737";
  //   }
  // );
  await page.focus("input[name=identificationNumber]");
  await page.keyboard.type("");

  await page.focus("input[name=password]");
  await page.keyboard.type(" ");

  await page.focus("input[name=dob]");
  await page.keyboard.type("");

  await Promise.all([
    page.waitForNavigation(),
    page.click("input[type=submit]"),
  ]);

  await Promise.all([
    page.waitForNavigation(),
    page.click("#content_middle > div.middle > div.left > a"),
  ]);

  const valor = await page.$eval(
    "#view-list > li.container_box.assetvalue.active > a > div:nth-child(1) > label:nth-child(1) > h2",
    (el) => el.innerHTML
  );

  console.log(valor);
  //   const data = await page.evaluate(() => document.querySelector("*").outerHTML);
  //   console.log(data);
  // browser.close();
}

run();

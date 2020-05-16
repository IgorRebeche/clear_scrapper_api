import { Page } from 'puppeteer'

const loginIn = async (page: Page) => {
  await page.goto('https://www.clear.com.br/pit/')
  await page.focus('input[name=identificationNumber]')

  console.log('Login at clear dashboard...')

  await page.keyboard.type(process.env.CNPJ)

  await page.focus('input[name=password]')
  await page.keyboard.type(process.env.PASSWORD)

  await page.focus('input[name=dob]')
  await page.keyboard.type(process.env.BIRTHDAY)

  await Promise.all([
    page.waitForNavigation(),
    page.click('input[type=submit]'),
  ])
  // Selecting New Pit
  await Promise.all([
    page.waitForNavigation(),
    page.click('#content_middle > div.middle > div.left > a'),
  ])
}
export default loginIn

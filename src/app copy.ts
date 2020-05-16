require('dotenv').config()
import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import { Page } from 'puppeteer'
import { format } from 'date-fns'

import { snooze, saveToJson } from './helper/general'

puppeteer.use(StealthPlugin())

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

const getAssets = async (page: Page) => {
  console.log('Scrapping Data...')

  // Get Iframe Handle
  const elementHandle = await page.$('.ifm')
  const frame = await elementHandle.contentFrame()

  /*
    view-list tag represents the two main lists 
    of cleaar dashboard with valuable information
  */
  const ViewLists = await frame.$x('//*[@id="view-list"]')

  // Gets Assets List
  const AssetsHandle = await ViewLists[1].$$('.stock')
  const AssetsCollection = AssetsHandle.map(async (assetHandle) => {
    const assetName = await assetHandle.$eval(
      'div:nth-child(1) > label:nth-child(1) > h2',
      (el) => el.innerHTML
    )
    const amount = await assetHandle.$eval(
      'div.custody-row2 > label.custody-col1 > span.col-value',
      (el) => el.innerHTML
    )

    const amountPrice = await assetHandle.$eval(
      'div.custody-row2 > label.custody-col2 > span.col-value',
      (el) => el.innerHTML
    )

    return await { assetName, amount, amountPrice }
  })

  const AssetTotalAmount = ViewLists[1].$eval(
    '.assetvalue .custody-symbol',
    (el) => el.innerHTML
  )

  const Cash = ViewLists[1].$eval(
    '.cash .custody-col1 i:nth-child(2)',
    (el) => el.innerHTML
  )

  const assets = await Promise.all(AssetsCollection)

  const generalInformation = await Promise.all([AssetTotalAmount, Cash])

  console.log('Data Scrapped!')

  return { assets, generalInformation }
}

async function run() {
  const browser = await puppeteer.launch({
    defaultViewport: {
      height: 800,
      width: 1080,
    },
  })

  const page = await browser.newPage()

  await loginIn(page)

  await snooze(5000)

  const response = await getAssets(page)

  saveToJson(
    './src/data',
    `clear_report_${format(new Date(), 'dd_MM_yyyy')}`,
    response,
    'Saved Json output in src/data'
  )

  console.log('Finished')
  await page.close()
}

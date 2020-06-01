import { Page } from 'puppeteer'

const AssetDataStep = async (page: Page) => {
  console.log('Getting Asset Data')
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

  return { assets, generalInformation }
}

export default AssetDataStep

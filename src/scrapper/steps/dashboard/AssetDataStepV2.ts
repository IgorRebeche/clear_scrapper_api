import { Page } from 'puppeteer'
import { snooze } from '../../../helper/general'
import { formatNumber } from '../../../helper/format'
import { IStep } from '../../IStep'

const AssetDataStep2 = async (page: Page) => {
  console.log('Getting Asset Data...')
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
  const AssetInfo = await frame.$('body > div.container.myassets > section')
  const assetsList = []

  for (const asset of AssetsHandle) {
    await asset.click()
    await snooze(1000)

    const assetName = await asset.$eval(
      'div:nth-child(1) > label:nth-child(1) > h2',
      (el) => el.innerHTML
    )

    const positionQuantity = await AssetInfo.$eval(
      'div > div.cont_line.first > label:nth-child(1) > span.position-quantity',
      (el) => el.textContent
    )

    const assetPrice = await AssetInfo.$eval(
      'div > div.cont_line.second > label:nth-child(1) > span.asset-price',
      (el) => el.textContent
    )

    const positionValueAverage = await AssetInfo.$eval(
      'div > div.cont_line.second > label:nth-child(3) > span.position-value-average',
      (el) => el.textContent
    )

    const positionValueSpreadPrice = await AssetInfo.$eval(
      'div > div.cont_line.second > label:nth-child(5) > span.position-value-spread',
      (el) => el.textContent
    )

    const positionValueRaw = await AssetInfo.$eval(
      'div > div.cont_line.third > label:nth-child(1) > span.position-value-raw',
      (el) => el.textContent
    )

    const positionValueAquisition = await AssetInfo.$eval(
      'div > div.cont_line.third > label:nth-child(3) > span.position-value-aquisition',
      (el) => el.textContent
    )

    const positionPnl = await AssetInfo.$eval(
      'div > div.cont_line.third > label:nth-child(5) > span.position-pnl',
      (el) => el.textContent
    )

    assetsList.push({
      assetName,
      assetPrice: formatNumber(assetPrice),
      positionQuantity: formatNumber(positionQuantity),
      positionValueRaw: formatNumber(positionValueRaw),
      positionValueAverage: formatNumber(positionValueAverage),
      positionValueSpreadPrice: formatNumber(positionValueSpreadPrice),
      positionValueAquisition: formatNumber(positionValueAquisition),
      positionPnl: formatNumber(positionPnl),
    })
  }

  const AssetTotalAmount = ViewLists[1].$eval(
    '.assetvalue .custody-symbol',
    (el) => el.innerHTML
  )

  const Cash = ViewLists[1].$eval(
    '.cash .custody-col1 i:nth-child(2)',
    (el) => el.innerHTML
  )

  const generalInformation = await Promise.all([AssetTotalAmount, Cash])

  return {
    assetsList,
    AssetTotalAmount: formatNumber(generalInformation[0]),
    Cash: formatNumber(generalInformation[1]),
  }
}
class AssetDataStep implements IStep {
  stepName = 'Collect Asset Data'
  stepDescription: "Get information about asset's wallet"

  async stepFunction(page: Page): Promise<any> {
    console.log('Getting Asset Data...')
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
    const AssetInfo = await frame.$('body > div.container.myassets > section')
    const assetsList = []

    for (const asset of AssetsHandle) {
      await asset.click()
      await snooze(1000)

      const assetName = await asset.$eval(
        'div:nth-child(1) > label:nth-child(1) > h2',
        (el) => el.innerHTML
      )

      const positionQuantity = await AssetInfo.$eval(
        'div > div.cont_line.first > label:nth-child(1) > span.position-quantity',
        (el) => el.textContent
      )

      const assetPrice = await AssetInfo.$eval(
        'div > div.cont_line.second > label:nth-child(1) > span.asset-price',
        (el) => el.textContent
      )

      const positionValueAverage = await AssetInfo.$eval(
        'div > div.cont_line.second > label:nth-child(3) > span.position-value-average',
        (el) => el.textContent
      )

      const positionValueSpreadPrice = await AssetInfo.$eval(
        'div > div.cont_line.second > label:nth-child(5) > span.position-value-spread',
        (el) => el.textContent
      )

      const positionValueRaw = await AssetInfo.$eval(
        'div > div.cont_line.third > label:nth-child(1) > span.position-value-raw',
        (el) => el.textContent
      )

      const positionValueAquisition = await AssetInfo.$eval(
        'div > div.cont_line.third > label:nth-child(3) > span.position-value-aquisition',
        (el) => el.textContent
      )

      const positionPnl = await AssetInfo.$eval(
        'div > div.cont_line.third > label:nth-child(5) > span.position-pnl',
        (el) => el.textContent
      )

      assetsList.push({
        assetName,
        assetPrice: formatNumber(assetPrice),
        positionQuantity: formatNumber(positionQuantity),
        positionValueRaw: formatNumber(positionValueRaw),
        positionValueAverage: formatNumber(positionValueAverage),
        positionValueSpreadPrice: formatNumber(positionValueSpreadPrice),
        positionValueAquisition: formatNumber(positionValueAquisition),
        positionPnl: formatNumber(positionPnl),
      })
    }

    const AssetTotalAmount = ViewLists[1].$eval(
      '.assetvalue .custody-symbol',
      (el) => el.innerHTML
    )

    const Cash = ViewLists[1].$eval(
      '.cash .custody-col1 i:nth-child(2)',
      (el) => el.innerHTML
    )

    const generalInformation = await Promise.all([AssetTotalAmount, Cash])

    return {
      assetsList,
      AssetTotalAmount: formatNumber(generalInformation[0]),
      Cash: formatNumber(generalInformation[1]),
    }
  }
}
export default AssetDataStep

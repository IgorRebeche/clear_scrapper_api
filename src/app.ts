require('dotenv').config()
import { format } from 'date-fns'

import loginIn from './scrapper/steps/loginStep'
import AssetDataStepV2 from './scrapper/steps/dashboard/AssetDataStepV2'

import { snooze, saveToJson } from './helper/general'
import { __Response } from './entities/Response'
import ClearScrapper from './scrapper/ClearScrapper'

async function main() {
  console.log('Starting Clear Scrapper')
  const scrapper = new ClearScrapper()
  await scrapper.init()

  await scrapper.run(new loginIn())
  await snooze(5000)
  const response = await scrapper.run(new AssetDataStepV2())

  const dataPath = './src/data'
  const filename = `clear_report_${format(new Date(), 'dd_MM_yyyy')}`
  const outputMessage = 'Saved Json output in src/data'
  saveToJson(dataPath, filename, response, outputMessage)
}
main()
// async function main2() {
//   const assets = { teste: 1, teste2: 2 }
//   const a = new __Response(assets, null)
//   console.log(a.getResponse())
// }
// main2()

// // const test = () => {
// //   saveToJson('./src/data', 'teste2', { teste: 1 }, '')
// // }
// // test()

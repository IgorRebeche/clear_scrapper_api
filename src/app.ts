require('dotenv').config()
import ClearScrapperApp from './ClearScrapperApp'
import { format } from 'date-fns'

import loginIn from './steps/loginStep'
import AssetDataStepV2 from './steps/dashboard/AssetDataStepV2'

import { snooze, saveToJson } from './helper/general'
import { __Response } from './entities/Response'

async function main() {
  console.log('Starting Clear Scrapper')
  const scrapper = new ClearScrapperApp({ headless: false })
  await scrapper.init()

  await scrapper.run(loginIn)
  await snooze(5000)
  const response = await scrapper.run(AssetDataStepV2)

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

require('dotenv').config()
import ClearScrapperApp from './ClearScrapperApp'
import { format } from 'date-fns'

import loginIn from './steps/loginStep'
import AssetDataStep from './steps/dashboard/AssetDataStep'

import { snooze, saveToJson } from './helper/general'

async function main() {
  console.log('Starting Clear Scrapper')
  const scrapper = new ClearScrapperApp({ headless: false })
  await scrapper.init()

  await scrapper.run(loginIn)
  await snooze(5000)
  const response = await scrapper.run(AssetDataStep)

  const dataPath = './src/data'
  const filename = `clear_report_${format(new Date(), 'dd_MM_yyyy')}`
  const outputMessage = 'Saved Json output in src/data'
  saveToJson(dataPath, filename, response, outputMessage)
}
main()

// const test = () => {
//   saveToJson('./src/data', 'teste2', { teste: 1 }, '')
// }
// test()

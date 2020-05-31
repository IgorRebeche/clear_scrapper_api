import ClearScrapperApp from '../ClearScrapperApp'
import loginIn from '../steps/loginStep'
import AssetDataStepV2 from '../steps/dashboard/AssetDataStepV2'
import { snooze } from '../helper/general'
import { format } from 'date-fns'

export const getAssets = async () => {
  console.log('Starting Clear Scrapper')
  const scrapper = new ClearScrapperApp({})
  await scrapper.init()

  await scrapper.run(loginIn)
  await snooze(3000)
  const response = await scrapper.run(AssetDataStepV2)

  await scrapper.terminate()

  return response
}

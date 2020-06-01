import loginIn from '../scrapper/steps/loginStep'
import AssetDataStepV2 from '../scrapper/steps/dashboard/AssetDataStepV2'
import { snooze } from '../helper/general'
import { format } from 'date-fns'
import ClearScrapper from '../scrapper/ClearScrapper'
import { IStep } from '../scrapper/IStep'

export const getAssets = async () => {
  console.log('Starting Clear Scrapper')
  const scrapper = new ClearScrapper()
  await scrapper.init()

  await scrapper.run(new loginIn())
  await snooze(3000)
  const response = await scrapper.run(new AssetDataStepV2())

  await scrapper.terminate()

  return response
}

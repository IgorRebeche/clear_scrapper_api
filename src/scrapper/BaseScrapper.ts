import { Browser, Page } from 'puppeteer'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import puppeteer from 'puppeteer-extra'
import { IStep } from './IStep'
puppeteer.use(StealthPlugin())

interface parameters {
  height?: number
  width?: number
  headless?: boolean
}

export interface IBaseScrapper {
  height: number
  width: number
  page: Page
  browser: Browser
  headless: boolean
  scrapperName: string

  init(): Promise<any>
  run(step: IStep): Promise<any>
  terminate(): Promise<any>
}

abstract class BaseScrapper implements IBaseScrapper {
  height: number
  width: number
  page: Page
  browser: Browser
  headless: boolean
  scrapperName: string

  constructor(params: parameters = {}) {
    const { height = 800, width = 1080, headless = true } = params
    this.height = height
    this.width = width
    this.headless = headless
  }

  async init() {
    this.browser = await puppeteer.launch({
      defaultViewport: {
        height: this.height,
        width: this.width,
      },
      headless: this.headless,
    })
    this.page = await this.browser.newPage()
  }

  async run(step: IStep) {
    console.log(`Running ${step.stepName} Step`)

    return await step.stepFunction(this.page)
  }

  async terminate() {
    await this.browser.close()
    console.log(`Closing ${this.scrapperName}`)
  }
}

export default BaseScrapper

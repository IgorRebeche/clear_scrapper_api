import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import { Page, Browser } from 'puppeteer'
import { stepFunction } from './types'

puppeteer.use(StealthPlugin())

interface parameters {
  height?: number
  width?: number
  headless?: boolean
}

class ClearScrapperApp {
  height: number
  width: number
  page: Page
  browser: Browser
  headless: boolean

  constructor(params: parameters) {
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

  async run(stepFunction: stepFunction) {
    return await stepFunction(this.page)
  }
}

export default ClearScrapperApp

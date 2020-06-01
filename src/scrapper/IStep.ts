import { Page } from 'puppeteer'

export interface IStep {
  stepName: string
  stepDescription: string
  stepFunction(page: Page): Promise<any>
}

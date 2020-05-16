import { Page } from 'puppeteer'
import { StepI } from '../steps/stepInterface'

export type stepFunction = (page: Page) => Promise<any>

import express from 'express'
import assets from './assets/index'

const router = express.Router()

router.use('/assets', assets)

export default router

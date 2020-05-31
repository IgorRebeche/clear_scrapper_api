import express from 'express'
import { getAssets } from '../../services/asset'
import { __Response } from '../../entities/Response'
const router = express.Router()

router.route('/').get(async (req, res) => {
  try {
    const assets = await getAssets()
    res.json(new __Response({ data: assets }).getResponse())
    res.status(200)
  } catch (error) {
    res.json(new __Response({ error: [error.message] }).getResponse())
    res.status(400)
  }
})

export default router

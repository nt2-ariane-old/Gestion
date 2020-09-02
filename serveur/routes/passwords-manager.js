
const express = require('express')
const router = express.Router()
const safe = require('../middleware/password-safe')
// Get all subscribers
router.get('/', (req, res) => {

    return res.status(200).json({ data: safe.getEntries() })

})
router.get('/groups', (req, res) => {
})

router.post('/group', (req, res) => {

})
router.post('/entry', (req, res) => {


    return res.status(200).json({ data: entry })
})

module.exports = router
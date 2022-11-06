const { createResume, updateResume, getResume, deleteResume } = require('../controller/resumeController')
const router = require('express').Router()

router.post('/create', createResume)
router.put('/', updateResume)
router.get('/fetch', getResume)
router.delete('/', deleteResume)

module.exports = router
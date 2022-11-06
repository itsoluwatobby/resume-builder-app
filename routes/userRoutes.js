const { handleRegister, handleLogin, handleLogout } = require('../controller/userController')
const router = require('express').Router()

router.post('/register', handleRegister)
router.post('/login', handleLogin)
router.get('/logout', handleLogout)

module.exports = router
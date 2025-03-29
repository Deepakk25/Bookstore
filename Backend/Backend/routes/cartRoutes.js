const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cartController')
const auth = require('../middlewares/auth')



router.post('/',auth,cartController.createCart)

router.get('/view',auth,cartController.getCart)

router.delete('/:id',auth,cartController.removefromcart);

module.exports = router
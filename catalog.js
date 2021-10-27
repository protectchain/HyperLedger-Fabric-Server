const express = require('express')

const caActions = require('./caActions')
const ledgerActions = require('./ledgerActions')

const router = express.Router()

router.get('/', (req, res) => {
    res.send('Server is Running')
});

router.get('/caActions/getAdmin', caActions.getAdmin)
router.get('/caActions/getUser', caActions.getUser)
router.get('/ledgerActions/:id', ledgerActions.ledger)


module.exports = router;
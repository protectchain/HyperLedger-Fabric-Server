const express = require('express')

const caActions = require('./caActions')
const ledgerActions = require('./ledgerActions')

const router = express.Router()

router.get('/', (req, res) => {
    res.send('Server is Running')
});

router.get('/caActions/getAdmin', caActions.getAdmin)
router.get('/caActions/getUser', caActions.getUser)
router.get('/ledgerActions/getAllAssets', ledgerActions.getAllAssets)
router.post('/ledgerActions/readAsset', (req, res) =>{
    ledgerActions.readAsset(req,res);
});
router.post('/ledgerActions/createAsset', ledgerActions.createAsset)

module.exports = router;
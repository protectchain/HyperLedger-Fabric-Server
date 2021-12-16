/**
 * Ledger - Actions
 */

// node.js includes
const helper = require('./helper')
const path = require('path')

// fabric includes
const { Gateway, Wallets } = require('fabric-network');
const walletPath = path.join(__dirname, 'wallet');

// some consts
const org1UserId = 'roland';
const channelName = 'mychannel';
const chaincodeName = 'basic';

async function getAllAssets(req, res)
{
  try {
    // build CCP
    const ccp = helper.buildCCPOrg1();
    
    // setup the wallet to hold the credentials of the application user
    const wallet = await helper.buildWallet(Wallets, walletPath);

    // Create a new gateway instance for interacting with the fabric network.
    // In a real application this would be done as the backend server session is setup for
    // a user that has been verified.
    const gateway = new Gateway();
      
    // setup the gateway instance
    // The user will now be able to create connections to the fabric network and be able to
    // submit transactions and query. All transactions submitted by this gateway will be
    // signed by this user using the credentials stored in the wallet.
    await gateway.connect(ccp, {
      wallet,
      identity: org1UserId,
      discovery: { enabled: true, asLocalhost: true } // using asLocalhost as this gateway is using a fabric network deployed locally
    });

    // Build a network instance based on the channel where the smart contract is deployed
    const network = await gateway.getNetwork(channelName);

    // Get the contract from the network.
    const contract = network.getContract(chaincodeName);

    let result = await contract.evaluateTransaction('GetAllAssets');
    const result2 = helper.prettyJSONString(result.toString());
    console.log('Done'+result2);
    res.send(result2);

    // disconnect form the network
    gateway.disconnect();
  }
  catch(e){
    throw new Error(e);
  }   
}

async function readAsset(req, res)
{
  try {
    const ccp = helper.buildCCPOrg1();
    
    const wallet = await helper.buildWallet(Wallets, walletPath);

    const gateway = new Gateway();
      
    await gateway.connect(ccp, {
      wallet,
      identity: org1UserId,
      discovery: { enabled: true, asLocalhost: true } // using asLocalhost as this gateway is using a fabric network deployed locally
    });

    const network = await gateway.getNetwork(channelName);

    const contract = network.getContract(chaincodeName);

    let asset = 'asset14';    //asset1 is the test case
    result = await contract.evaluateTransaction('ReadAsset', asset);
    console.log(`${helper.prettyJSONString(result.toString())}`);
    res.send(helper.prettyJSONString(result.toString()));
  
    gateway.disconnect();
  }
  catch(e){
    throw new Error(e);
  }   
}

async function createAsset(req, res)
{
  try {
    const ccp = helper.buildCCPOrg1();
    
    const wallet = await helper.buildWallet(Wallets, walletPath);

    const gateway = new Gateway();
      
    await gateway.connect(ccp, {
      wallet,
      identity: org1UserId,
      discovery: { enabled: true, asLocalhost: true } // using asLocalhost as this gateway is using a fabric network deployed locally
    });

    const network = await gateway.getNetwork(channelName);

    const contract = network.getContract(chaincodeName);

    let r = await contract.submitTransaction('CreateAsset', 'asset1', 'red', '5', 'Honda', '1000');
    const result = r.toString();
    console.log('*** Result: committed', result);
    res.send(result);

    gateway.disconnect();
  }
  catch(e){
    throw new Error(e);
  }   
}

module.exports.getAllAssets = getAllAssets;
module.exports.readAsset = readAsset;
module.exports.createAsset = createAsset;
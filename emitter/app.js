const express = require('express')
const app = express()
const dotenv = require('dotenv')
const {Web3} = require('web3')
const MobilePurchase = require('./contract/MobilePurchase.json')

dotenv.config();
app.use(express.json());

const web3 = new Web3(new Web3.providers.WebsocketProvider(process.env.LOCAL_URL));





// this will emit an event
app.post("/change-price",async (req, res)=>{
    const id = await web3.eth.net.getId(); // local id for now
    const deployedNetwork = MobilePurchase.networks[id];
    const contract = new web3.eth.Contract(
    MobilePurchase.abi,
    deployedNetwork && deployedNetwork.address,
);
    const accounts = await web3.eth.getAccounts();
    const {price} = req.body;
    contract.methods.changePrice(price).send({from : accounts[0]
    })
    res.status(200).json({success : true , message : "Price changed successfully"})
})


app.listen(5000, ()=>{
    console.log("server listening on 5000")
})

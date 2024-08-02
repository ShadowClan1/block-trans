const MobilePurchase = require('./contract/MobilePurchase.json')
const dotenv = require('dotenv')
const {Web3} = require('web3');
const connectToDb = require('./db/db');
const Event = require('./db/event.model');

dotenv.config();

const web3 = new Web3(new Web3.providers.WebsocketProvider(process.env.LOCAL_URL));

( async () =>{

    const id = await web3.eth.net.getId(); // local id for now
    const deployedNetwork = MobilePurchase.networks[id];
    const contract = new web3.eth.Contract(
    MobilePurchase.abi,
    deployedNetwork && deployedNetwork.address,
);


contract.events.allEvents({fromBlock :0}).on('data', async (event)=>{
    console.log(event.event, event.transactionHash)

    try {
        const existing = await Event.findOne({transactionHash : event.transactionHash});
        if(!existing) {
            console.log("creating transaction")
            await Event.create({
                transactionHash :event.transactionHash,
                eventType :event.event,
                price : event.returnValues.newPrice,
                raw : event
            })
        }
    } catch (error) {
        console.log(error, "this is error")
    }
})
contract.events.allEvents({fromBlock:0}).on('error',console.error)

console.log("app is listening")
})()

connectToDb().then(()=>console.log("connection successfull")).catch(()=>console.error)
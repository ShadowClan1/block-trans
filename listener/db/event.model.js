const { default: mongoose } = require("mongoose");

const eventsSchema = mongoose.Schema({
    eventType: {
        type: String,
        required: true
    },
    price: {
        type: BigInt,
        required: true
    }, 
    eventTime :{
        type : Date,
        default :Date.now()
    },
    transactionHash :{
        type : String,
        unique :true
    },
    raw : {
        type :Object
    }
},
{
    timestamps: true 
})

const Event = mongoose.model('Event', eventsSchema)

module.exports = Event;
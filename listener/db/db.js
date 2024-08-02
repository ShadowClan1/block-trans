const { default: mongoose } = require("mongoose");
const dotenv  = require('dotenv')
const connectToDb = async () => mongoose.connect(process.env.MOGODB_URI)

module.exports = connectToDb
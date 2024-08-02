const MyContract = artifacts.require("MobilePurchase");

module.exports = function (deployer) {
    let initalvalue = 20000;
    deployer.deploy(MyContract, initalvalue);
};
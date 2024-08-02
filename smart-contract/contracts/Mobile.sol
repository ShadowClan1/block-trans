// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract MobilePurchase {
    uint public price ;

    event PriceChanged(string typeOfEvent, uint newPrice);
    event AvailableForSale(string typeOfEvent, uint  price);

    constructor(uint  newPrice) {
        require(newPrice > 0, "Price must be greater than zero");
        price = newPrice;
    }

function changePrice (uint newPrice) public {
        require(newPrice > 0, "Price must be greater than zero");
        price = newPrice;
        emit PriceChanged('PRICE_CHANGED',newPrice);
    }
}
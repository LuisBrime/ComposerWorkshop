/**
 *  Copyright 2018 Luis Brime
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
'use strict';

/**
 * Register a house for sale
 * @param {brime.house.RegisterForSale} registerTxn
 * @transaction
 */
function registerForSale(registerTxn) {
    // If a house is not found, reject the transaction
    if (!registerTxn.house) {
        throw new Error('House not found.');
    }

    // Get the house that is going to be registered for sale
    var house = registerTxn.house;

    // Change the onSale variable to true
    house.onSale = true;
    
    // Update the info to show a log that the house was registered for sale
    house.info.push('House registered for sale');

    // Get the asset registry that stores assets.
    // This is done to update the House asset
    return getAssetRegistry('brime.house.House')
        .then(function (houseRegistry) {
            // Update the house asset that was modified
            return houseRegistry.update(house);
        })
        .then(function () {
            // Emit an HouseOnSale event
            var event = getFactory().newEvent('brime.house', 'HouseOnSale');
            // Add all the information that the event will emit
            event.houseOnSaleId = house.houseId;
            event.ownerId = house.owner.email;
            event.houseAddress = house.houseAddress;
            emit(event);
        })
        .catch(function (err) {
            throw new Error('House could not be registered for sale...' , err);
        });
}

/**
 * Sale a house. Transfer ownership
 * @param {brime.house.SaleHouse} saleTxn
 * @transaction
 */
function saleHouse(saleTxn) {
    // If a sales agreement is not found, reject the transaction
    if (!saleTxn.sA) {
        throw new Error('No sales agreement found.');
    }

    // Get the house, seller and buyer.
    var house = saleTxn.sA.houseInSale;
    var seller = saleTxn.sA.seller;
    var buyer = saleTxn.sA.buyer;

    // If the seller is not the owner of the house, reject the transaction
    if (seller != house.owner) {
        throw new Error('Only the owner can sell a house.');
    }

    // Make the buyer the new owner of the house
    house.owner = buyer;

    // Push a log that the house was selled
    house.info.push("House selled. New owner of the house is " + buyer.firstName);

    // Get the asset registry that stores assets.
    // This is done to update the House asset
    return getAssetRegistry('brime.house.House')
        .then(function (houseRegistry) {
            // Update the house asset that was modified
            return houseRegistry.update(house);
        })
        .then(function () {
            // Emit an HouseSale event
            var event = getFactory().newEvent('brime.house', 'HouseSale');
            // Add all the information that the event will emit
            event.houseId = house.houseId;
            event.sellerId = seller.email;
            event.buyerId = buyer.email;
            event.houseAddress = house.houseAddress;
            emit(event);
        })
        .catch(function (err) {
            throw new Error('House could not be sold...', err);
        });
}
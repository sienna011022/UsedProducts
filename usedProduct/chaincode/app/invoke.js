/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

"use strict";
const cpath =  "../app/";
const wpath = "../app/";
// Hyperledger Bridge
const { Wallets, Gateway } = require("fabric-network");
const fs = require("fs");
const path = require("path");
const ccpPath = path.resolve(cpath , "ccp", "connection-org1.json");
let ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));

async function main() {
    const walletPath = path.join(wpath, "wallet");
    console.log(`Wallet path: ${walletPath}`);
    const wallet = await Wallets.newFileSystemWallet(walletPath);

    console.log(`Wallet path: ${walletPath}`);

    const userExists = await wallet.get("appUser");
   
    if (!userExists) {
        console.log(
            'An identity for the user "appUser" does not exist in the wallet'
        );
      
        console.log("Run the registerUser.js application before retrying");
        return;
    }

        

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, {
            wallet,
            identity: "appUser",
            discovery: { enabled: true, asLocalhost: true },
        });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork("mychannel");

        // Get the contract from the network.
        const contract = network.getContract("teamate");

        // Submit the specified transaction.
        // createCar transaction - requires 5 argument, ex: ('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom')
        // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR12', 'Dave')
        await contract.submitTransaction(
            "InitSellerInfo",
            "seller5",
           "0"

            
        );
       

        const result = await contract.evaluateTransaction(
            "GetSellerHistory","seller5"
            );
        console.log(
            `Transaction has been evaluated, result is: ${result.toString()}`
        );
        // Disconnect from the gateway.
        await gateway.disconnect();
        
    }


main();

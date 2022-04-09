"use strict";
//데이터베이스 로드

const ProductStorage = require("../../models/ProductStorage");
const Product = require("../../models/Product");

const res = require("express/lib/response");

const Deliver = require("../../models/Deliver");
const Balance = require("../../models/Balance");
const BalanceStorage = require("../../models/BalanceStorage");




// Hyperledger Bridge
const { Wallets, Gateway } = require("fabric-network");
const fs = require("fs");
const path = require("path");
const ccpPath = path.resolve(__dirname, "ccp", "connection-org1.json");
let ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));

async function cc_call(fn_name, args) {
    const walletPath = path.join(process.cwd(), "wallet");
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

    const gateway = new Gateway();
    await gateway.connect(ccp, {
        wallet,
        identity: "appUser",
        discovery: { enabled: true, asLocalhost: true },
    });

    const network = await gateway.getNetwork("mychannel");
    const contract = network.getContract("teamate");

    var result;

    if (fn_name == "InitProduct") {
        q = args[0];
        w = args[1];
        t = args[2];
        e = args[3];
        p = args[4];
        s = args[5];
        result = await contract.submitTransaction("addRating", q,w,t,e,p,s);}

    // } else if (fn_name == "addRating") {
    //     e = args[0];
    //     p = args[1];
    //     s = args[2];
    //     result = await contract.submitTransaction("addRating", e, p, s);
    // } else if (fn_name == "readRating")
    //     result = await contract.evaluateTransaction("readRating", args);
    else result = "not supported function";

    return result;
}


const output = {
   
    product_register : (req,res)=>{
        res.render("home/product_register")
    },
    get_deliver : (req,res)=>{
        res.render("home/get_deliver")
    },
    get_deliverlist : (req,res)=>{
        res.render("home/get_deliverlist")
    },
    balance : (req,res)=>{
        res.render("home/balance")
    },
};

const process = {
    //로그인 데이터 받기 



    save_deliverstate: async(req,res) => {
       
        const deliver = new Deliver(req.body);
        const response = await deliver.get_sellerHistory();
        return res.json(response);
    },
    get_deliverlist : async(req,res) => {


        const deliver = new Deliver();
        const response = await deliver.getDeliverList();
        return res.json(response);
   

    
    },
    

     

     product_register : async(req,res) => {
        const product = new Product(req.body);
        const response = await product.product_register();
        
        if(response){
                const sellerID = req.body.sellerID
                const productID = req.body.productID
                const timestamp = req.body.timestamp
                const productName = req.body.productName
                const info = req.body.info
                const price = req.body.price

            console.log("REGISTER PRODUCT: " + productName);
            var args=[sellerID,productID,timestamp,productName,info,price]
            result = await cc_call("addUser", args);
            
            const myobj = { result: "success" };
            res.status(200).json(myobj);
        }
        return res.json(response)
        //pdf 엮기
     },
     balance : async(req,res) => {
        const balance = new Balance(req.body);
        const response = await balance.UpdateBalance();
        return res.json(response)
        //pdf 엮기
     },
     

};


//밖에서 쓰려고 내보내는거
module.exports = {
    output,
    process,
};



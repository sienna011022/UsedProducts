"use strict";
//데이터베이스 로드

const ProductStorage = require("../../models/ProductStorage");
const Product = require("../../models/Product");

const res = require("express/lib/response");

const Deliver = require("../../models/Deliver");
const Balance = require("../../models/Balance");
const BalanceStorage = require("../../models/BalanceStorage");

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

    if (fn_name == "addUser") {
        result = await contract.submitTransaction("addUser", args);
    } else if (fn_name == "addRating") {
        e = args[0];
        p = args[1];
        s = args[2];
        result = await contract.submitTransaction("addRating", e, p, s);
    } else if (fn_name == "readRating")
        result = await contract.evaluateTransaction("readRating", args);
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

    update_state : async(req,res)=>{
        const sellerID = req.body.sellerID;
        const productID =  req.body.productID;
        const productName = req.body.productName;
        const info = req.body.info;
        const price = req.body.price;
        const timestamp = req.body.timestamp;

        var args = [sellerID,productID,productName,info,price,timestamp]

        result = await cc_call("AddProduct",args)
        console.log("result"+result.toString());
        const myobj = JSON.parse(result,"utf8");

        return myobj
               

    },


    update_deliverstate : async(req,res) => {
        const productID = rq.body.productID;
        const buyerID = req.body.buyerID;
        const deliverID =  req.body.deliverID;
        const state = "deliver";
        
        var args = [buyerID,deliverID,state]

        result = await cc_call("getProductState",productID)
        if(result.state == "sold"){
            update = await cc_call("updateDeliverState",args)
     
            console.log("result"+result.toString());
            const myobj = JSON.parse(result,"utf8");
    
            return myobj

        }
       
    },
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



"use strict";

const res = require("express/lib/response");
const BalanceStorage = require("./BalanceStorage");
const ProductStorage = require("./ProductStorage");

class Balance{
    constructor(body){
        this.body = body;
    }

    async UpdateBalance(){
        const client = this.body;
        
        try{
        const sellerbalance = await BalanceStorage.getUserbalance(client);
        const productprice = await BalanceStorage.getProductPrice(client);
        const modifyprice = sellerbalance + productprice;

        var response = await BalanceStorage.modifyBalance(client,modifyprice);
        if(response){
            var list = await ProductStorage.productList(client);
        }
        return list;
        }catch(err){
            console.error(err);
        }
    }

   

    
   
}


module.exports = Balance;


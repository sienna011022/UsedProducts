"use strict";
const crypto = require("crypto");
const res = require("express/lib/response");
const ProductStorage = require("./ProductStorage");


class Product{
    constructor(body){
        this.body = body;
    }
    
    async product_register(){
        const client = this.body;
 
        try{
        const complete = await ProductStorage.save(client);
        if(complete){
            const response = await ProductStorage.productList(client)
            return response
        }

        }catch(err){
            console.error({result:1,error:err});
        }
    }
    

    
   

}


module.exports = Product;


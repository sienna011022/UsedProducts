"use strict";

const res = require("express/lib/response");
const DeliverStorage = require("./DeliverStorage");


class Deliver{
    
    constructor(body){
        this.body = body;
    }

    async get_sellerHistory(){
        const client = this.body;
 
        try{
        const response = await DeliverStorage.get_sellerHistory(client);
        return response;
        }catch(err){
            console.error(err);
        }
    }

    async getDeliverList(){
 
        try{
        const response = await DeliverStorage.getDeliverList();
        return response;
        }catch(err){
            console.error(err);
        }
    }

    async updateDelivestate(){
        try{
            const response = await DeliverStorage.updateDelivestate();
            return response;
            }catch(err){
                console.error(err);
            }

    }
    

    
    

}


module.exports = Deliver;


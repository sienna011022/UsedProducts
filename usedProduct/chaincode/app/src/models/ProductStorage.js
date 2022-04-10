
const { json } = require("express/lib/response");
const db = require("../config/db");
class ProductStorage{

   
    static async save(client){
        return new Promise((resolve,reject) => {
        
    
            const query = "INSERT INTO productInfo(sellerID,productID,productName,price,info,date) Values(?,?,?,?,?,?);"
            db.query(query,[client.sellerID,client.productID,client.productName,client.price,client.info,client.timestamp],(err,data) =>{
                if(err) reject(`${err}`);
          
                resolve({success : true})
    

            });
        });
    }

    static async productList(client){
        return new Promise((resolve,reject) => {
           
    
            const query = "select * from productInfo where sellerId = ?;"
           db.query(query,[client.sellerID],(err,data) =>{
               if(err) reject(`${err}`);
              
               const result = JSON.parse(JSON.stringify(data))
               var response = {result:0 ,partyInfo: "seller" ,itemList: Object.values(result)}
               resolve(response)
           
              
   
            
            

           
          
            });
        });
    }
}

module.exports = ProductStorage;

const { json } = require("express/lib/response");
const db = require("../config/db");
class BalanceStorage{

   #sellerid 
    static getUserbalance(sellerID){
        return new Promise((resolve,reject) => {
    //데이터베이스에 접근 후 유저 정보 반환

        const query = "SELECT balance FROM sellerInfo where sellerID = ?;";
        db.query(query,[sellerID.sellerID],(err,data) =>{
            if(err) reject(err);
            
            let sellerbalance = data[0].balance;
            
            resolve(parseInt(sellerbalance));
           
        }
      
        
         )
        });
    }
    #productprice
    static getProductPrice(productName){
        //데이터베이스에 접근 후 유저 정보 반환
  
        return new Promise((resolve,reject) => {
            const query = "SELECT price FROM productInfo where productName = ?;";
            db.query(query,[productName.productName],(err,data) =>{
                if(err) reject(err);
                let productprice = data[0].price
          
                
                resolve(parseInt(productprice));
            }
            )
             
            });
        }
    
    static modifyBalance(info,modifybalance){
        return new Promise((resolve,reject) => {
    
            const query = "UPDATE sellerInfo SET balance = ? where sellerID = ?; ";
            db.query(query,[modifybalance,info.sellerID],(err,data) =>{
                if(err) reject(err);
                resolve({success : true});
            }
            )
             
            });
        }
    
                    
                 
                      

      
}

module.exports = BalanceStorage;

const { json } = require("express/lib/response");
const db = require("../config/db");
class DeliverStorage{

        
    static getDeliverList(){
        //데이터베이스에 접근 후 유저 정보 반환
    return new Promise((resolve,reject) => {
         const query = "select deliverID, deliverName from deliverInfo;";
        db.query(query,(err,data) =>{
            if(err) reject(err);
            resolve({result:0,deliverInfo : Object.values(data)});
           
     });
    });
    
   

    }
    static getDeliver(deliverID){
        //데이터베이스에 접근 후 유저 정보 반환
    return new Promise((resolve,reject) => {
         const query = "SELECT * FROM deliverInfo where deliverID = ?;";
        db.query(query,[deliverID.deliverID],(err,data) =>{
            if(err) reject(err);
            console.log(data);
           
     });
    });
    


 }
}
module.exports = DeliverStorage;
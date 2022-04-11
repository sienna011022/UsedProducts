
//sellerHistory
// sellerName = document.querySelector("#sellerName");
// sellerBtn = document.querySelector("#seller");
// sellerBtn.addEventListener("click",get_sellerHistory);

// //deliver select
// registerBtn = document.querySelector("#button");
// registerBtn.addEventListener("click",get_deliverlist);
    
//request deliver


const 
 productID = document.querySelector("#productID"),




 registerBtn = document.querySelector("#button");
 registerBtn.addEventListener("click",get_productState);


function get_productState(){


     
    const req = {

        productID : productID.value,
 

    };
    console.log(req)
    fetch("/get_productState",{
        
        method : "POST",
        headers :{
            "Content-Type" : "application/json",
        },
        body : JSON.stringify(req),
       
    
        
    }).then((res) => console.log(res))
    .catch((err) => {
        console.error(new Error("Error- get deliver list"));
    });



}

// function get_deliverlist(){
    

//     fetch("/get_deliverlist",{
//         method : "POST",
//         headers :{
//             "Content-Type" : "application/json",
//         },
        
//     })
//         .then((res) => res.json())
//         .then((res) => {
//             if(res){
//                 //get data
//                 console.log(res)
//         }else{
//             alert("Cannot get deliver list");
        
//         }
//     })
//     .catch((err) => {
//         console.error(new Error("Error- get deliver list"));
//     });



// }

        
    

    // fetch("/get_sellerHistory",{
    //     method : "POST",
    //     headers :{
    //         "Content-Type" : "application/json",
    //     },
    //     body : JSON.stringify(req),
    // })
    //     .then((res) => res.json())
    //     .then((res) => {
    //         if(res){
    //             //get data
    //             console.log(res);
    //     }else{
    //         alert("Cannot get seller history list");
        
    //     }
    // })
    // .catch((err) => {
    //     console.error(new Error("Error- get seller list"));
    // });


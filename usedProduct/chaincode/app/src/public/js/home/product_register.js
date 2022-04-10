

const sellerID = document.querySelector("#sellerID"),
 productID = document.querySelector("#productID"),
 productName = document.querySelector("#productName"),
 price = document.querySelector("#price"),
 info = document.querySelector("#info"),
 date = Date.now() 



 registerBtn = document.querySelector("#button");
 registerBtn.addEventListener("click",register_function);


function register_function(){


     
    const req = {
        sellerID : sellerID.value,
        productID : productID.value,
        productName : productName.value,
        info:info.value,
        price : price.value,
        timestamp : date,
    };


    fetch("/product_register",{
        method : "POST",
        headers :{
            "Content-Type" : "application/json",
        },
        body : JSON.stringify(req),
    })
        .then((res) => res.json())
        .then((res) => console.log(res))
        
            // if(res){
                
            //     // fetch("/update_state",{
            //     //     method : "POST",
            //     //     headers :{
            //     //         "Content-Type" : "application/json",
            //     //     },
            //     //     body : JSON.stringify(req),
            //     // })
            
            //     //     .then((res) => console.log(res.json()))}
            //     //     // .then((res) => {
            //     //     //     if(res){console.log(res.status(200),json(res.myobj))}
                                    
            //     // else{
            //     //     alert(res.msg);   
            //     // }
            // })
                
   
    .catch((err) => {
        console.error(new Error("상품 등록 중 에러 발생"));
    });


}


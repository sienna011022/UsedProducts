

const sellerID = document.querySelector("#sellerID"),
 productID = document.querySelector("#productID"),
 productName = document.querySelector("#productName"),
 price = document.querySelector("#price"),
 info = document.querySelector("#info"),
 address = document.querySelector("#address"),
 reject = document.queryCommandIndeterm("#reject")
 date = Date.now() 



 registerBtn = document.querySelector("#button");
 registerBtn.addEventListener("click",register_function);


function register_function(){


     
    const req = {
        sellerID : sellerID.value,
        productID : productID.value,
        productName : productName.value,
        info:info.value,
        timestamp : date,
        address : address.value,
        reject : reject.value

    };
    console.log(req)


    fetch("/product_register",{
        method : "POST",
        headers :{
            "Content-Type" : "application/json",
        },
        body : JSON.stringify(req),
    })
        .then((res) => res.json())
        .then((res) => console.log(res))
             
   
    .catch((err) => {
        console.error(new Error("상품 등록 중 에러 발생"));
    });


}


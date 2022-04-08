
const sellerID = document.querySelector("#sellerID"),
productName = document.querySelector("#productName");
registerBtn = document.querySelector("#button");
registerBtn.addEventListener("click",balance);



function balance(){


    const req = {
        sellerID : sellerID.value,
        productName : productName.value,
    };

    fetch("/balance",{
        method : "POST",
        headers :{
            "Content-Type" : "application/json",
        },
        body : JSON.stringify(req),
    })
    .then((res) => res.json())
    .then((res) => {
        if(res){
            console.log(res)
    }else{
        alert("balance error");
    
    }
})
.catch((err) => {
    console.error(new Error("아이디 찾기 중 에러 발생"));
});
                
}


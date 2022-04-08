

const 
sellerName = document.querySelector("#sellerName");
sellerBtn = document.querySelector("#seller");
sellerBtn.addEventListener("click",get_sellerHistory);


registerBtn = document.querySelector("#button");
registerBtn.addEventListener("click",get_deliverlist);
    

requestBtm = document.querySelector("#request");
requestBtm.addEventListener("click",save_deliverstate);


function save_deliverstate(){
    
    fetch("/save_deliverstate",{
        
        method : "POST",
        headers :{
            "Content-Type" : "application/json",
        },
        body : JSON.stringify(req),
       
    
        
    })
        .then((res) => res.json())
        .then((res) => {
            if(res){
                req = {buyerID : sellerID.value,
                        deliverID : deliverID.value,
                        state : "deliver"
                };
                fetch("/update_deliverstate",{
                    method : "POST",
                    headers :{
                        "Content-Type" : "application/json",
                    },
                    body : JSON.stringify(req),
                })
                    .then((res) => res.json())
                    .then((res) => {
                        if(res){console.log(res.status(200),json(res.myobj))}
                                    
                else{
                    alert(res.msg);   
                }
            })
    .catch((err) => {
        console.error(new Error("Error- get deliver list"));
    });



}

function get_deliverlist(){
    

    fetch("/get_deliverlist",{
        method : "POST",
        headers :{
            "Content-Type" : "application/json",
        },
        
    })
        .then((res) => res.json())
        .then((res) => {
            if(res){
                //get data
                console.log(res)
        }else{
            alert("Cannot get deliver list");
        
        }
    })
    .catch((err) => {
        console.error(new Error("Error- get deliver list"));
    });



}

        
    

    fetch("/get_sellerHistory",{
        method : "POST",
        headers :{
            "Content-Type" : "application/json",
        },
        body : JSON.stringify(req),
    })
        .then((res) => res.json())
        .then((res) => {
            if(res){
                //get data
                console.log(res);
        }else{
            alert("Cannot get seller history list");
        
        }
    })
    .catch((err) => {
        console.error(new Error("Error- get seller list"));
    });


}
        )

}
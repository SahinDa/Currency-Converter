const BASE_URL =
  `https://v6.exchangerate-api.com/v6/${api}/latest/`;

  const dropdowns = document.querySelectorAll(".dropdown select");
  const btn=document.querySelector(".btn");
  const fromCurr=document.querySelector(".from select");
  const toCurr=document.querySelector(".to select");
  const msg=document.querySelector(".msg input");

  for(let select of dropdowns){
    for(currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name==="from" && currCode==="USD"){
            newOption.selected="selected";
        }else if(select.name==="to" && currCode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
          updateFlag(evt.target)
    })
  }

  const updateFlag =(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img=element.parentElement.querySelector('img');
    img.src=newSrc;
  }

  btn.addEventListener("click",async(evt)=>{
     evt.preventDefault();
     let amount=document.querySelector(".amount input");
     let amtVal=amount.value;
     if(amtVal==="" || amtVal <1){
      amtVal=1;
      amount.value="1";
     }
     const url=`${BASE_URL}${fromCurr.value}`
     let response=await fetch(url);
    
    let data=await response.json();
     let rate=data["conversion_rates"][toCurr.value];
    let finalAmount=amtVal*rate;
    finalAmount = parseFloat(finalAmount.toFixed(2));
    msg.value=finalAmount;
    // msg.innerHTML=`${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
  })
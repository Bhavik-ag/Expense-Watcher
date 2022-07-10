let myTransactions = [];
let amountinhand = 0;
let expenses = 0;
let curbal = 0;
expdata = {"amountinhand":amountinhand,"expenses":expenses,"bal":curbal};

const transDate = document.getElementById("transdate");
const transType = document.getElementById("transtype");
const transPart = document.getElementById("transpart");
const transAmount = document.getElementById("transamount");
const addTrans = document.getElementById("addtrans");
const amountInHand = document.getElementById("income");
const expense = document.getElementById("expense");
const transForm = document.getElementById("transform");
const transList = document.getElementById("translist");
const curBalance = document.getElementById("current-bal");

//Getting data from localStorage
if(localStorage.getItem("expense")){
    myTransactions = JSON.parse(localStorage.getItem("expense"));
}
if(localStorage.getItem("expdata")){
    expdata = JSON.parse(localStorage.getItem("expdata"));
}

for(let i = 0;i<myTransactions.length;i++){ 
    transList.innerHTML +=  `<div class="listitem" style="margin-bottom:3px;">
                                        <p class="listdate">${myTransactions[i]["date"]}</p>
                                        <p class="listpart">${myTransactions[i]["particular"]}</p>
                                        <p class="listamount">${myTransactions[i]["amount"]}</p>
                                    </div>`
}

amountinhand = expdata["amountinhand"];
expenses = expdata["expenses"];
curbal = expdata["bal"];

amountInHand.innerText = `₹${amountinhand}`;
expense.innerText = `₹${expenses}`;
curBalance.innerText = `₹${curbal}`;

addTrans.addEventListener("click",(e)=>{
    e.preventDefault(); 
    transaction = {};

    let userDate = transDate.value.split('-');
    transaction["date"] = `${userDate[2]}-${userDate[1]}-${userDate[0]}`;

    transaction["particular"] = `${transPart.value}`;

    if(getComputedStyle(transType).backgroundColor === "rgb(9, 255, 0)"){
        transaction["amount"] = `+${transAmount.value}`;
        amountinhand += parseInt(transAmount.value);
    }
    else{
        transaction["amount"] = `-${transAmount.value}`;
        expenses += parseInt(transAmount.value);
    }

    curbal = amountinhand-expenses;
    //style="border-top:0px; border-radius: 0px;"
    transForm.reset();
    transList.innerHTML +=  `<div class="listitem" style="margin-bottom:4px;">
                                    <p class="listdate">${transaction.date}</p>
                                    <p class="listpart">${transaction.particular}</p>
                                    <p class="listamount">${transaction.amount}</p>
                                </div>`

    amountInHand.innerText = `₹${amountinhand}`;
    expense.innerText = `₹${expenses}`;
    curBalance.innerText = `₹${curbal}`;

    myTransactions.push(transaction);
    localStorage.setItem("expense",JSON.stringify(myTransactions));
    localStorage.setItem("expdata",JSON.stringify({"amountinhand":amountinhand,"expenses":expenses,"bal":curbal}));
})


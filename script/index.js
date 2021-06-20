'user strict';

const main = document.getElementById('main');
const btnAddUser = document.getElementById('add-user');
const btnDouble = document.getElementById('double-balance');
const btnFilter = document.getElementById('filter-rich');
const btnSort = document.getElementById('sort');
const btnTotal = document.getElementById('total');
let data =[];

//Balance formater
function formatToCurrency(amount){
    return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g,'$&,');
};

//function update dom
const updateDom = function(providedData = data){
    main.innerHTML='<h2><strong>Name</strong> Balance</h2>';
    providedData.forEach(item=>{
        const element = document.createElement('div');
        element.classList.add('users');
        element.innerHTML= `<strong>${item.name}</strong>${formatToCurrency(item.balance)}`;
        main.appendChild(element);
    });
}

//add user
const addData = function(obj){
    data.push(obj);
    updateDom();
};

//fetch a random user from random user API
const getRandomUser = async function(){
    const response = await fetch('https://randomuser.me/api');
    const data = await response.json();
    const user = data.results[0];
    // ({name:{first,last} }=user);
    // console.log(first,last);
    const newUser = {
        name:`${user.name.first} ${user.name.last}`,
        balance:Math.floor(Math.random()*100000),
    };
    addData(newUser);
}

//Double the amount
const doubleBalance = function(){
    data=data.map(user=>{
        return{...user,balance:user.balance*2};
    });
    updateDom();
}

//filter rich
const filterRich = function(){
    data=data.filter((user)=> user.balance>50000);
    updateDom();
}

const sort=function(){
    data.sort((user1,user2)=>user1.balance-user2.balance);
    updateDom();
}

//Total balance
const totalBalance = function(){
    const wealth = data.reduce((acc,user) =>
        (acc = acc + user.balance),0
    );
    const wealth1 = document.createElement('div');
    wealth1.innerHTML =`<h3>Total Balance:<strong>${formatToCurrency(wealth)}</strong></h3>`;
    main.appendChild(wealth1);
}

//EventListeners
btnAddUser.addEventListener('click',getRandomUser);
btnDouble.addEventListener('click',doubleBalance);
btnFilter.addEventListener('click',filterRich);
btnTotal.addEventListener('click',totalBalance);
btnSort.addEventListener('click',sort);
const userstatus=[];
var type=0;
let accounts;
fetch('/getaccounts')
    .then(response => response.json())
    .then(data => {
        console.log("hello");
        // data is the accounts array
        accounts = data;
        // printrating(2);
        getuserstatus();
        // printrating(2);
    });
// import { accounts } from './constants.js';
// const accounts = require('./constants.js').accounts;  

   



async function getblitzrating(username) {
    const response = await fetch(`https://lichess.org/api/user/${username}`);
    const data = await response.json();
    return data.perfs.blitz.rating;
}
async function getbulletrating(username) {
    const response = await fetch(`https://lichess.org/api/user/${username}`);
    const data = await response.json();
    return data.perfs.bullet.rating;
}
async function getrapidrating(username) {
    const response = await fetch(`https://lichess.org/api/user/${username}`);
    const data = await response.json();
    return data.perfs.rapid.rating;
}
async function onlinestatus(username) {
    const response = await fetch(`https://lichess.org/api/users/status?ids=${username}`);
    const data = await response.json();
   
    const us = data[0].online;
    return us ? us : false;
}

console.log(userstatus);
async function addrow(index,nameid,userrating,j){
    //getting table
    const usertable=document.querySelector('#userTable tbody');
    //creating new row
    let newrow=document.createElement('tr');
    newrow.className='rowdata';
    
    //serial number

    let serial=document.createElement('td');
    serial.innerText=index+1;
    serial.className="first";
    newrow.appendChild(serial);

    // second cell
    let second=document.createElement('td');
    second.className="second"
    let celllink=document.createElement('a');
    celllink.href=`https://lichess.org/@/${nameid}`;
    celllink.textContent=nameid;
    second.appendChild(celllink);
   
   if(userstatus[j]===true){
    second.style.color="green";
   }
    
    
    newrow.appendChild(second);
    
    //third cell
    let third=document.createElement('td');
    third.className="third";
    third.innerText=userrating;
    newrow.appendChild(third);
    usertable.append(newrow);



}
async function getuserstatus() {
    for(var i=0;i<accounts.length;i++){
        const onstatus=await onlinestatus(accounts[i]);
        console.log(onstatus);
        userstatus.push(onstatus);
    }
    console.log(userstatus);
    printrating(2);
};


async function printrating(type) {
    
    const done=[];
    const ratingsarr=[];
    const sortedratingsarr=[];
    console.log(sortedratingsarr);
    const tbody = document.querySelector('#userTable > tbody');
    tbody.innerHTML='';


    for (let i = 0; i < accounts.length; i++) {
        let rating;
        if(type===0){ rating = await getrapidrating(accounts[i]);}
        if(type===1){ rating = await getblitzrating(accounts[i]);}
        if(type===2){ rating = await getbulletrating(accounts[i]);}
        //console.log(accounts[i] + ": " + rating);
        ratingsarr.push(rating);
        sortedratingsarr.push(rating);

    }
    sortedratingsarr.sort((a, b) => b - a);
  
    console.log(sortedratingsarr);
    
    var ind=0;
    for(let i=0;i<accounts.length;i++){
        for(let j=0;j<accounts.length;j++){
            if(ratingsarr[j]==sortedratingsarr[i]){
                var f=0;
                for(var k=0;k<done.length;k++){
                    if(done[k]===accounts[j]){
                        f=1;
                        break;
                    }
                }
                if(f==1){
                    continue;
                }
                onlinestatus(accounts[j]);
                done.push(accounts[j]);
                
                
                addrow(i,accounts[j],ratingsarr[j],j);

                console.log(accounts[j] + ": " + ratingsarr[j]);
                break;

            }

        }

    }
}

$(".btn").click(function(){
    
    var index = $(".btn").index(this);
    
    
    $(".btn").removeClass("active");
  
    
    $(this).addClass("active");
  
    
    printrating(index);
  });
//   printrating(2);

const tids=["3XjH5NY2","YdLNe0fy","SXxmbtZv","oiP2bwGY","ONS7YgR4","eEo1RGVu","Y00z1RT2","aSa4IKky"];
const accounts = ["KalpitDON", "varun05772", "Krishankant_2004", "Deepanshu202", "surtor15", "Homeyprime","Za_Robot10","Dark-knight_1629900","magnusnakamura123456","aadichachra"];
for(var i=0;i<accounts.length;i++){
    accounts[i]={
        name: accounts[i],
        score:0
    }
}
const tnames=[];
const fst=[];
const snd=[];
const thd=[]


async function getstandings(id,index){
    const response=await fetch(`https://lichess.org/api/tournament/${id}`);
    const data=await response.json();
    const ranking=data.standing.players;
   // console.log(ranking);
    var players=data.nbPlayers;
    for(var i=0;i<ranking.length;i++){
        var nm=ranking[i].name;
        var sc=ranking[i].score;
        //console.log(name+" "+sc);
        for(var j=0;j<accounts.length;j++){
            if(accounts[j].name===nm){
                accounts[j].score+=sc;
                break;
            }
            
        }
        


    }
    tnames.push(data.fullName);
    fst.push(ranking[0].name);
    snd.push(ranking[1].name);
    thd.push(ranking[2].name);
    


    

}

async function updatestandings(){
    for(var i=0;i<tids.length;i++){
        await getstandings(tids[i],i);
    
    }
    accounts.sort((a, b) => b.score - a.score);
    
    for(var i=0;i<accounts.length;i++){
        console.log(accounts[i].name+"--> "+accounts[i].score);
        const distable=document.querySelector('#table1');
        let newrow=document.createElement('tr');
        newrow.classname='rowdata';
        //sno.
        let serial=document.createElement('td');
        serial.innerText=i+1;
        serial.className="first";
        newrow.appendChild(serial);
        // second cell
        let second=document.createElement('td');
        second.className="second"
        let celllink=document.createElement('a');
        celllink.href=`https://lichess.org/@/${accounts[i].name}`;
        celllink.textContent=accounts[i].name;
        celllink.target='_blank';
        second.appendChild(celllink);
        newrow.appendChild(second);
        //third child
        let third=document.createElement('td');
        third.className="third";
        third.innerText=accounts[i].score;
        newrow.appendChild(third);
        distable.appendChild(newrow);


     }
     
}
async function main(){
    await updatestandings();
    for(var i=0;i<tids.length;i++){

        const distable=document.querySelector('#table2');
        let newrow=document.createElement('tr');
        newrow.classname='rowdata';
        //sno.
        let serial=document.createElement('td');
        serial.innerText=i+1;
        serial.className="first";
        newrow.appendChild(serial);
        // second cell
        let second=document.createElement('td');
        second.className="second"
        let celllink=document.createElement('a');
        celllink.href=`https://lichess.org/tournament/${tids[i]}`;
        celllink.textContent=tnames[i];
        celllink.target='_blank';
        second.appendChild(celllink);
        newrow.appendChild(second);
        //third child
        let third=document.createElement('td');
        third.className="third winner";
        third.innerText=fst[i];
        newrow.appendChild(third);
        //fourth child
        let fourth=document.createElement('td');
        fourth.className="fourth winner";
        fourth.innerText=snd[i];
        newrow.appendChild(fourth);
        distable.appendChild(newrow);
        //fifth child
        let fifth=document.createElement('td');
        fifth.className="fifth winner";
        
        fifth.innerText=thd[i];
        newrow.appendChild(fifth);
        distable.appendChild(newrow);
    
    
     }

    
}
main();





//getstandings(tids[0]);
async function getlink(time,increment){
    const data={};
    data['clock.limit']=time;
    data['clock.increment']=increment;
    data['rated']=true;
    let options={
        method : "POST",
        headers: {"Content-type":"application/json"},
        body:JSON.stringify(data)

    }
    let link;
    const response = await fetch('https://lichess.org/api/challenge/open',options);
    const json = await response.json();
    link = json.challenge.url;
    return link;
}

async function displaylink(time,increment) {
    var l = await getlink(time,increment);
    var dis=document.getElementById("givelink");
    dis.innerText=l;
    

    console.log(l);
}
$(".gamebtn").click(function(){
    var t ;
    var inc=0;
    var c=this.id;
    if(c==0){
        t=60;
        inc=1;
    }
    if(c==1){
        t=180;
    }
    if(c==2){
        t=600;
    }
    displaylink(t,inc);
})
$(document).ready(function() {
    var id = "givelink";
    $('#copybutton').click(function() {
        CopyToClipboard(id);
    });

    function CopyToClipboard(id) {
        var r = document.createRange();
        r.selectNode(document.getElementById(id));
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(r);
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
    }
    // $('#visitlink').click(function(){
    //     var tb=$("a");
    //     console.log(tb);
        
        
        
    // })
});
//displaylink();
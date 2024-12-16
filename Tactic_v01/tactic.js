let gi=document.querySelectorAll('.grid-item');
let reset=document.querySelector('.reset');
let scorecard=document.querySelector('.scorecard');
let grid=[];
let usergrid=[];
let compgrid=[];
let userwins=0;
let compwins=0;
let ties=0;
winlist=[[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];

/**********************************************************************************/


gi.forEach((box)=>{
    box.addEventListener('click',()=>{
        if(grid.includes(Number(box.dataset.pos))){

        }else{
            box.innerHTML="<p class='token'>X</p>"
            const pos = Number(box.dataset.pos);
            grid.push(pos);
            usergrid.push(pos);
            let forward=checkwinner();
            if(forward===0){
                computer();
            }
        }
    });
})

reset.addEventListener('click',()=>{
    grid=[]
    gi.forEach((box)=>{
        box.innerHTML='';
        grid=[];
        usergrid=[];
        compgrid=[];
    })
})

function computer(){
    let rand=((Math.random())*9)+1;
    rand=Math.floor(rand);
    console.log(rand);
    if(grid.length===9){
        checkwinner();
    }else if(grid.includes(rand)){
        computer();
    }else{
        const move = document.querySelector(".gi"+String(rand));
        move.innerHTML='<p class="token">O</p>';
        grid.push(rand);
        compgrid.push(rand);
        checkwinner()
    }
}

function checkwinner(){
    let gameover=false;
    winlist.forEach((sublist)=>{
        let usertally=0;
        let comptally=0;
        sublist.forEach((number)=>{
            if(usergrid.includes(number)){
                usertally++
            }else if(compgrid.includes(number)){
                comptally++
            }
        })
        if(usertally>=3){
            setTimeout(()=>{alert("User Wins!")},100);
            gameover=true;
            userwins+=1;
        }else if(comptally>=3){
            setTimeout(()=>{alert("Computer Wins!")},100);
            gameover=true;
            compwins+=1;
        }})
    if(grid.length===9){
        if(gameover===false){
            alert("Its a tie");
            gameover=true;
            ties+=1;
        }
    }
    scorecard.innerHTML=`User: ${userwins} <br> Computer: ${compwins} <br> Ties: ${ties}`
    if(gameover===false){
        return 0;
    }else{
        return 1;
    }
}
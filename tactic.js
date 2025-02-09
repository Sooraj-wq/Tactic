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
let count=0;

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
        count=0;
    })
})
function computer() {
    if(usergrid.includes(5) && count===0){
            const numbers = [1, 3, 7, 9];
            let randomIndex = Math.floor(Math.random() * numbers.length);
            let randomNumber = numbers[randomIndex];
            console.log(randomNumber);
            if (!usergrid.includes(randomNumber) && !compgrid.includes(randomNumber)) {
                const move = document.querySelector(".gi" + String(randomNumber));
                move.innerHTML = '<p class="token">O</p>';
                grid.push(randomNumber);
                compgrid.push(randomNumber);
                count++;
                return; 
            }};

    for (let i = 0; i < winlist.length; i++) {
        let tallyComp = 0;
        let win = winlist[i];

        win.forEach((element) => {
            if (compgrid.includes(element)){ 
                tallyComp++;
        }});

        if (tallyComp === 2) {
            for(let j=0; j<win.length;j++){
                let element=win[j];
                if (!usergrid.includes(element) && !compgrid.includes(element)) {
                    const move = document.querySelector(".gi" + String(element));
                    move.innerHTML = '<p class="token">O</p>';
                    grid.push(element);
                    compgrid.push(element);
                    checkwinner();
                    return; 
                }
            }
        }
    }

    for (let i = 0; i < winlist.length; i++) {
        let tallyUser = 0;
        let win = winlist[i];

        win.forEach((element) => {
            if (usergrid.includes(element)) tallyUser++;
        });

        if (tallyUser === 2) {
            for(let j=0; j<win.length;j++){
                let element=win[j];
                if (!usergrid.includes(element) && !compgrid.includes(element)) {
                    const move = document.querySelector(".gi" + String(element));
                    move.innerHTML = '<p class="token">O</p>';
                    grid.push(element);
                    compgrid.push(element);
                    checkwinner();
                    return; 
                }
            }
        }
    }

    if (grid.length === 9) {
        checkwinner(); 
        return;  
    }
    let rand = Math.floor(Math.random() * 9) + 1;
    while (grid.includes(rand)) {
        rand = Math.floor(Math.random() * 9) + 1;  
    }

    const move = document.querySelector(".gi" + String(rand));
    move.innerHTML = '<p class="token">O</p>';
    grid.push(rand);
    compgrid.push(rand);
    count++;
    checkwinner();  
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
            setTimeout(()=>{alert("User Wins!")},200);
            gameover=true;
            userwins+=1;
        }else if(comptally>=3){
            setTimeout(()=>{alert("Computer Wins!")},200);
            gameover=true;
            compwins+=1;
        }})
    if(grid.length===9){
        if(gameover===false){
            setTimeout(()=>alert("Its a tie"),200);
            gameover=true;
            ties+=1;
        }
    }
    scorecard.innerHTML=`User: ${userwins} <br> Computer: ${compwins} <br> Ties: ${ties}`;
    if(gameover===false){
        return 0;
    }else{
        return 1;
    }
}

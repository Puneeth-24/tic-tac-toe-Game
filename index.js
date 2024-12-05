const cells=document.querySelectorAll(".cell");
const message=document.getElementById("messageDisplay");
const restart=document.getElementById("restartBtn");
const win_conditions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
let options=['','','','','','','','',''];
let currentPlayer="X";
running=true;

initializeGame();

function initializeGame(){
    cells.forEach(cell=>cell.addEventListener("click",cellSelect));
    restart.addEventListener("click",restartGame);
    message.textContent=`${currentPlayer}'s Turn`
}

function cellSelect(){
    let cellIndex=this.getAttribute("CellId");
    
    if(options[cellIndex]!='' || !running){
        return;
    }
    else{
        updateCell(this,cellIndex);
        checkWinner();
    }

}

function updateCell(cell,index){
    cell.textContent=currentPlayer;
    
    options[index]=currentPlayer;
    changePlayer();
}

function checkWinner(){
    let roundWon=false;
    for(let i=0;i<=win_conditions.length-1;i++){
        const condition=win_conditions[i];
        const cellA=options[condition[0]];
        const cellB=options[condition[1]];
        const cellC=options[condition[2]];

        if(cellA==='' || cellB==='' || cellC===''){
            continue;
        }

        if(cellA===cellB && cellB===cellC){
            roundWon=true;
            break;

        }
    }

    if(roundWon){
        changePlayer();
        message.textContent=`${currentPlayer} Won!!!!`;
       
        running=false;
    }
    else if (!options.includes('')){
        message.textContent=`Draw!!!!`;
        running=false;
    }

    if(currentPlayer==="X"){
        ScoreDisplayX.classList.add("green");
        Xscore+=1;
        ScoreDisplayX.innerHTML=Xscore;
    }
    else{
        ScoreDisplayO.classList.add("blue");
        Oscore+=1;
        ScoreDisplayO.innerHTML=Xscore;
    }
}

function changePlayer(){
    currentPlayer=(currentPlayer==="X")?"O":"X";
    message.textContent=`${currentPlayer}'s Turn`;
}

function restartGame(){
    cells.forEach(cell=>cell.textContent='')
    options=['','','','','','','','',''];
    currentPlayer="X";
    initializeGame();
    running=true;
}
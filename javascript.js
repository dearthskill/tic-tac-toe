const results = document.getElementById("results")
const createPlayer =(function(name){
    const playerName = name;
    let symbol;
    const setSymbol = (input)=> symbol = input;
    const getSymbol = ()=> {
        return symbol;
    }
    return{playerName, setSymbol, getSymbol}
})

const playerOne = createPlayer('jon')
const playerTwo = createPlayer('don')

playerOne.setSymbol("X")
playerTwo.setSymbol("O")

const gameBoard = (function(){
    let board = ['','','','','','','','','']    
    const resetBoard = ()=> {
        board = ['','','','','','','','','']
        const results = document.getElementById("results")
        results.innerHTML = ''
        render()
    }
    
    const update = (player,index)=> {
        if(board[index]===''){
            board[index]= player.getSymbol()
            console.log(player.getSymbol())
        }
    }
    
    const showBoard = ()=> {
        return board
    }
    
    return{
        update, resetBoard, showBoard
    }
})()


const winningCombinations = [[0,1,2],[3,4,5],[6,7,8],[0,4,8],[2,4,6],[0,3,6],[1,4,7],[2,5,8]]

function checkWin(board)
{
    let winner
    for(i=0;i<8;i++)
        {   
            const[a,b,c] = winningCombinations[i];
            list = gameBoard.showBoard()
            if(list[a]===list[b]&&list[b]===list[c]){
                if(list[a]!=''&& list[b]!=''&& list[c]!=''){
                    if(list[a]==playerOne.getSymbol()){
                        winner = document.getElementById("p1").value
                        console.log(winner)
                    }
                    else{
                        winner = document.getElementById("p2").value
                        console.log(winner)
                    }
                    const results = document.getElementById("results")
                    results.innerHTML = `${winner} wins!`
                    return true
                }
                else{
                    return false
                }
            }
        }
    }
    
    
    function checkTie(board){        
        return board.every(cell => cell!=="")
    }
    
    
    
    function markCell(choice){   
        const board = gameBoard.showBoard();
        while((!(checkWin(board)||checkTie(board)))){
            let count = 0;
            board.forEach(element => {
                if(element==''){
                    count+=1;
                    console.log(count)
                }
            });
            if(count%2==0){
                gameBoard.update(playerTwo,choice)
                checkWin(board)
                break;
            }
            
            else{
                gameBoard.update(playerOne,choice)
                checkWin(board)
                break;
            }
        }
        render();
    }
    
    function render(){
        const container = document.querySelector(".container")
        const board = gameBoard.showBoard();
        container.innerHTML = ''
        for(let i =0;i<9;i++){
            var cell = document.createElement("button")
            cell.className = "cell";
            cell.innerHTML=`<div class="cell2" onclick="markCell(${i})">${board[i]}</div>`
            container.appendChild(cell)
    }
}

function gameFlow(){
    const title = document.querySelector(".title")
    title.innerHTML = "";
    const board = gameBoard.showBoard();
    render()
}



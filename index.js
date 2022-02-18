const grid = document.querySelector('.grid')
const startBtn = document.querySelector('#start')
let scoreDisplay = document.querySelector('#score')
let squares = []
let currentSnake = [2,1,0]
let direction = 1
let width = 10
let appleIndex = 0
let score = 0
let intervalTime = 1000
let speed = 0.9
let timerId = 0 

function createGrid() { 
  //create 100 elements with a for loop
  for(let i = 0; i < width*width; i++){
    //create element
    const square = document.createElement('div') 
      //add styling to these elements 
      square.classList.add('square')
  //put the element into our grid
    grid.appendChild(square)

  //create an array of squares
  squares.push(square)
 }  

}

createGrid()

currentSnake.forEach(index => squares[index].classList.add('snake'))

function startGame(){
  //remove the snake 
  currentSnake.forEach(index => squares[index].classList.remove('snake'))
  //remove the apple 
  squares[appleIndex].classList.remove('apple')
  //generate new apple
  
  clearInterval(timerId)
  currentSnake = [2,1,0]
  direction = 1
  score = 0
  //readd new score to browser
  scoreDisplay.textContent = score
  intervalTime = 1000
  speed = 0.9 
  width = 10
  generateApples()
  //readd class of snake to our new current snake 
  currentSnake.forEach(index => squares[index].classList.add('snake'))
  timerId = setInterval(move, intervalTime)
}

function move(){
  if(
    (currentSnake[0] + width >= width*width && direction === width) || //if snake has hit bottom
    (currentSnake[0] % width === width-1 && direction === 1) || //if snake has hit right wall
    (currentSnake[0] % width === 0 && direction === -1) || //if snake has hit left wall
    (currentSnake[0] - width < 0 && direction === -width) || //if snake has hit top
    squares[currentSnake[0] + direction].classList.contains('snake')
  )
  return clearInterval(timerId)
  //remove last element from our currentSnake array
  const tail = currentSnake.pop()
  //remove styling from last element
  squares[tail].classList.remove('snake') 
  // above I am passing in the tail which is the last element of array into squares which is all of our squares to then select which square to remove the stlying from. 
  //add square in direction we are heading
  currentSnake.unshift(currentSnake[0] + direction)
  //add styling so we can see it
  
  
  //deal with snake head getting the apple
  if (squares[currentSnake[0]].classList.contains('apple')) {
    //remove the class of apple
    squares[currentSnake[0]].classList.remove('apple')
    //grow our snake by adding class of snake to it
    squares[tail].classList.add('snake')
    //grow our snake array
    currentSnake.push(tail)
    //generate a new apple
    generateApples()
    //add one to the score
    score++
    //display our score
    scoreDisplay.textContent = score
    //speed up our snake
    clearInterval(timerId)
    intervalTime = intervalTime * speed
    timerId = setInterval(move, intervalTime)
    
  }
  squares[currentSnake[0]].classList.add('snake')
}


function generateApples(){
  do{
    //generate a random number
    appleIndex = Math.floor(Math.random() * squares.length)
    console.log(appleIndex)
  }while (squares[appleIndex].classList.contains('snake'))
  squares[appleIndex].classList.add('apple')
}

generateApples()

function control(e){
  if(e.key === "ArrowRight"){
    direction = 1
    console.log('right pressed')
  }else if(e.key === "ArrowUp"){
    direction = - width
    console.log('up arrow pressed')
  }else if(e.key === "ArrowLeft"){
    direction = -1 
    console.log('left arrow pressed')
  }else if(e.key === "ArrowDown"){
    console.log('down arrow pressed')
    direction = + width
  }
}

document.addEventListener("keyup", control)
startBtn.addEventListener('click', startGame)
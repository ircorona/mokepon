const sectionSelectAttack = document.getElementById("choose-attack")
const sectionRestart= document.getElementById("Restart")
const buttonMascotPlayer = document.getElementById("button-mascot")
const buttonRestart = document.getElementById("button-Restart")
sectionRestart.style.display = "none"

const sectionSelectMascot = document.getElementById("choose-mascot")
const spanMascotPlayer = document.getElementById("mascot-player")
    
const spanMascotEnemy = document.getElementById("mascot-enemy")

const spanVictoriesPlayer = document.getElementById("victories-player")
const spanVictoriesEnemy = document.getElementById("victories-enemy")

const createMessageSection = document.getElementById("result")
const playerAttack = document.getElementById("player-attack")
const enemyAttack = document.getElementById("enemy-attack")
const containerCards = document.getElementById("container-cards")
const containerAttacks = document.getElementById("container-attacks")

const sectionViewMap =document.getElementById("view-map")
const map = document.getElementById("map")

let playerId = null
let enemyId = null
let mokepones = []
let mokeponesEnemies = []
let attackPlayer = []
let attackEnemy = []
let mokeponOptions
let inputSquirtle 
let inputCharmander 
let inputBulbasaur 
let mascotPlayer
let mascotPlayerObject
let attacksMokepon
let attacksMokeponEnemy
let buttonEarth 
let buttonFire 
let buttonWater 
let buttons = []
let indexAttackPlayer
let indexAttackEnemy
let victoriesPlayer = 0
let victoriesEnemy = 0
let canvas = map.getContext("2d")
let interval;
let backgroundMap = new Image();
backgroundMap.src = "./jpg-png/mokemap1.jpg";
let heightMap;
let widhtMap = window.innerWidth - 20;
const widhtMaxMap = 400;

if(widhtMap > widhtMaxMap){
    widhtMap = widhtMaxMap - 20
}

heightMap = widhtMap * 600 / 800

map.widht = widhtMap
map.height = heightMap

class Mokepon{
    constructor(name, photo, lives, mapPhoto,id = null){
        this.id = id
        this.name = name
        this.photo = photo
        this.lives = lives
        this.attacks = []
        this.widht = 40
        this.height = 40
        this.x = aleatory(0,map.widht - this.widht)
        this.y = aleatory(0, map.height - this.height)
        this.mapPhoto = new Image()
        this.mapPhoto.src = mapPhoto
        this.velocityX = 0
        this.velocityY = 0
    }

    paintMokepon(){
        canvas.drawImage(
            this.mapPhoto,
            this.x,
            this.y,
            this.widht,
            this.height
        )
    }
}

let squirtle = new Mokepon("Squirtle", "./jpg-png/squirtle.jpg", 5,"./jpg-png/squirtle-head.jpg")
let charmander = new Mokepon("Charmander", "./jpg-png/charmander.jpg", 5,"./jpg-png/charmander-head.jpg")
let bulbasaur = new Mokepon("Bulbasaur", "./jpg-png/bulbasaur.png", 5,"./jpg-png/bulbasaur-head.jpg")
let totodile = new Mokepon("Totodile", "./jpg-png/totodile.jpg", 5,"./jpg-png/totodile-head.jpg")
let chilaquil = new Mokepon("Chilaquil", "./jpg-png/chilaquil1.jpg",5,"./jpg-png/chilaquil-head.jpg")
let elChicorita = new Mokepon("El_Chicorita", "./jpg-png/elchicorita1.jpg",5,"./jpg-png/elchicorita-head.png")
let squirtleEnemy = new Mokepon("Squirtle", "./jpg-png/squirtle.jpg", 5,"./jpg-png/squirtle-head.jpg")
let charmanderEnemy = new Mokepon("Charmander", "./jpg-png/charmander.jpg", 5,"./jpg-png/charmander-head.jpg")

const squirtleAttacks = [
    { name: "💧", id: "button-Water"}, 
    { name: "💧", id: "button-Water"},
    { name: "💧", id: "button-Water"},
    { name: "🔥", id: "button-Fire" },
    { name: "☘️", id: "button-Earth"},
]

squirtle.attacks.push(...squirtleAttacks)
    
const charmanderAttacks = [
    { name: "🔥", id: "button-Fire" }, 
    { name: "🔥", id: "button-Fire" },
    { name: "🔥", id: "button-Fire" },
    { name: "💧", id: "button-Water"},
    { name: "☘️", id: "button-Earth"},
]

charmander.attacks.push(...charmanderAttacks)

const bulbasaurAttacks = [
    { name: "☘️", id: "button-Earth"}, 
    { name: "☘️", id: "button-Earth"},
    { name: "☘️", id: "button-Earth"},
    { name: "🔥", id: "button-Fire" },
    { name: "💧", id: "button-Water"},
]

bulbasaur.attacks.push(...bulbasaurAttacks)
    
const totodileAttacks = [
    { name: "💧", id: "button-Water"}, 
    { name: "💧", id: "button-Water"},
    { name: "💧", id: "button-Water"},
    { name: "🔥", id: "button-Fire" },
    { name: "☘️", id: "button-Earth"},
]

totodile.attacks.push(...totodileAttacks)


const chilaquilAttack = [
    { name: "🔥", id: "button-Fire" }, 
    { name: "🔥", id: "button-Fire" },
    { name: "🔥", id: "button-Fire" },
    { name: "💧", id: "button-Water"},
    { name: "☘️", id: "button-Earth"},
]

chilaquil.attacks.push(...chilaquilAttack)

    
const elChicoritaAttack = [
    { name: "☘️", id: "button-Earth"}, 
    { name: "☘️", id: "button-Earth"},
    { name: "☘️", id: "button-Earth"},
    { name: "🔥", id: "button-Fire" },
    { name: "💧", id: "button-Water"},
]
elChicorita.attacks.push(...elChicoritaAttack)


mokepones.push(squirtle,charmander,bulbasaur,totodile,chilaquil,elChicorita)

function startgame() {
    
    sectionSelectAttack.style.display = "none"
    sectionViewMap.style.display = "none"

    mokepones.forEach((mokepon) => {
        mokeponOptions = `
        <input type="radio" name="mascot" id=${mokepon.name} />
        <label class = "mokepon-card" for =${mokepon.name} >
                <p>${mokepon.name}</p>
                <img src=${mokepon.photo} alt=${mokepon.name}>
        </label>
        `

    containerCards.innerHTML += mokeponOptions

    inputSquirtle = document.getElementById("Squirtle")
    inputCharmander = document.getElementById("Charmander")
    inputBulbasaur = document.getElementById("Bulbasaur")
    inputTotodile = document.getElementById("Totodile")
    inputChilaquil = document.getElementById("Chilaquil")
    inputElChicorita = document.getElementById("El_Chicorita")
    

    })

    buttonMascotPlayer.addEventListener("click", selectMascotPlayer)
    buttonRestart.addEventListener("click", restartGame)

   // joinGame()
}

// function joinGame(){ 
//    fetch("http://192.168.100.125:8080/join")
//        .then(function (res){
//           if(res.ok){
//                res.text()
//                    .then(function(result){
//                       console.log(result)
//                        playerId = result
//                })
//            }
//        })
//}

function selectMascotPlayer(){
    

        if (inputSquirtle.checked) {
            spanMascotPlayer.innerHTML = inputSquirtle.id
            mascotPlayer = inputSquirtle.id
        } else if (inputCharmander.checked){
            spanMascotPlayer.innerHTML = inputCharmander.id
            mascotPlayer = inputCharmander.id
        } else if (inputBulbasaur.checked){
            spanMascotPlayer.innerHTML = inputBulbasaur.id
            mascotPlayer = inputBulbasaur.id
        } else if (inputTotodile.checked){
            spanMascotPlayer.innerHTML = inputTotodile.id
            mascotPlayer = inputTotodile.id
        } else if (inputChilaquil.checked){
            spanMascotPlayer.innerHTML = inputChilaquil.id
            mascotPlayer = inputChilaquil.id
        } else if (inputElChicorita.checked){
            spanMascotPlayer.innerHTML = inputElChicorita.id
            mascotPlayer = inputElChicorita.id
        } else {
             alert("Choose a Mascot")
             return    
    }

    sectionSelectMascot.style.display = "none"


    //selectMokepon(mascotPlayer)

    extractAttacks(mascotPlayer)
    sectionViewMap.style.display = "flex"
    startMap()
    
}

//function selectMokepon(mascotPlayer) {
//    fetch(`http://192.168.100.125:8080/mokepon/${playerId}`,{
//        method: "post",
//        headers:{
//            "Content-type": "application/json"
//        },
//        body: JSON.stringify({
//            mokepon: mascotPlayer
//        })
 //   })
//}

function extractAttacks(mascotPlayer){
    let attacks
    for (let i = 0; i < mokepones.length; i++) {
        if(mascotPlayer === mokepones[i].name){
            attacks = mokepones[i].attacks
        
        }
    }
    showAttacks(attacks)
}

function showAttacks(attacks){
    attacks.forEach((attacks)=>{
        attacksMokepon = `
        <button id=${attacks.id} class="attackbutton AB">${attacks.name}</button>
        `
        containerAttacks.innerHTML += attacksMokepon
        })
        buttonEarth = document.getElementById("button-Earth")
        buttonFire = document.getElementById("button-Fire")
        buttonWater = document.getElementById("button-Water")

        buttons = document.querySelectorAll(".AB")

        
        }

function sequenceAttacks() {
    buttons.forEach((buttons) => {
        buttons.addEventListener ("click", (e) =>{
            if (e.target.textContent === "🔥"){
                attackPlayer.push("Fire")
                console.log(attackPlayer)
                buttons.style.background = "#F5EE69"
                buttons.disabled = true
            } else if (e.target.textContent === "💧"){
                attackPlayer.push("Water")
                console.log(attackPlayer)
                buttons.style.background = "#F5EE69"
                buttons.disabled = true
            } else {
                attackPlayer.push("Earth")
                console.log(attackPlayer)
                buttons.style.background = "#F5EE69"
                buttons.disabled = true
            }
            //if(attackPlayer.length ===5){
             //   sendAttacks()
             randomAttackEnemy()
            //}
        })
    })
    

}

//function sendAttacks(){
//fetch (`http://192.168.100.125:8080/mokepon/${playerId}/attacks`, {
 //   method: "post",
 //   headers: {
 //       "Content-Type": "application/json"
  //  },
  //  body: JSON.stringify({
 //       attacks: attackPlayer
  //  })
//})

//interval = setInterval(getAttacks, 50)
//}

//function getAttacks(){
  //  fetch (`http://192.168.100.125:8080/mokepon/${enemyId}/attacks`)
  //      .then(function(res){
   //        if (res.ok){
     //           res.json()
      //              .then(function({attacks}){
       //                 if (attacks.length === 5){
        //                    attackEnemy = attacks
       //                    fight()
       //                 }
      //              })
     //       }
  //  })
//}

function selectMascotEnemy(enemy){
    //let aleatoryMascot = aleatory (0,mokepones.length -1) 
    //spanMascotEnemy.innerHTML = mokepones[aleatoryMascot].name
    //attacksMokeponEnemy = mokepones[aleatoryMascot].attacks
    spanMascotEnemy.innerHTML = enemy.name
    attacksMokeponEnemy = enemy.attacks
    sequenceAttacks()
}

function randomAttackEnemy(){
    let randomAttack = aleatory (0, attacksMokeponEnemy.length -1)

    if ([randomAttack].name ==="🔥") {
        attackEnemy.push("Fire")
    } else if ([randomAttack].name ==="💧"){
        attackEnemy.push("Water")
    } else {
        attackEnemy.push("Earth")
    }
    console.log(attackEnemy)
    startfight()
} 

function startfight(){
    if (attackPlayer.length === 5){
        fight()
    }
}

function indexBothFigthers(player, enemy) {
    indexAttackPlayer = attackPlayer[player]
    indexAttackEnemy = attackEnemy[enemy]
}

function fight (){
    clearInterval(interval)

    for (let index = 0; index < attackPlayer.length; index++) {
        if (attackPlayer[index] === attackEnemy[index]) {
            indexBothFigthers(index, index)
            createMessage("Tie")
        } else if (( attackPlayer[index] == "Fire" && attackEnemy[index] == "Earth")||( attackPlayer[index] == "Water" && attackEnemy[index] == "Fire")||( attackPlayer[index] == "Earth" && attackEnemy[index] == "Water")){
            indexBothFigthers(index, index)
            createMessage("Win")
            victoriesPlayer ++
            spanVictoriesPlayer.innerHTML = victoriesPlayer
        } else {
            indexBothFigthers(index, index);
            createMessage("Losse")
            victoriesEnemy ++
            spanVictoriesEnemy.innerHTML = victoriesEnemy    
        }
    }   
   checkVictories ()
}

function checkVictories(){
    if (victoriesPlayer ===  victoriesEnemy) {
        createFinalMessage("Some games you win, some you lose, and some you draw😅")
    } else if (victoriesPlayer > victoriesEnemy) {
        createFinalMessage("Congratulations, You make us proud, Son! 🥇")
    } else { 
      createFinalMessage("Such a disappointment, Losser!😭 ")
    }
}

function createMessage(result){
    

    let newAttackPlayer = document.createElement("p")
    let newAttackEnemy = document.createElement("p")

    createMessageSection.innerHTML = result
    newAttackPlayer.innerHTML = indexAttackPlayer
    newAttackEnemy.innerHTML = indexAttackEnemy

    playerAttack.appendChild(newAttackPlayer)
    enemyAttack.appendChild(newAttackEnemy)
}
function createFinalMessage(finalresult){
    

    createMessageSection.innerHTML = finalresult

    
    
    sectionRestart.style.display = "block"
}

function restartGame () {
    location.reload ()
}

function aleatory(min, max) {
    return Math.floor(Math.random()*(max - min + 1) + min)
}

function paintCanvas (){

    mascotPlayerObject.x = mascotPlayerObject.x + mascotPlayerObject.velocityX;
    mascotPlayerObject.y = mascotPlayerObject.y + mascotPlayerObject.velocityY;
    canvas.clearRect(0, 0, map.width, map.height); // Fixed typo here
    canvas.drawImage(
        backgroundMap,
        0,
        0,
        map.width,
        map.height,
    )
    mascotPlayerObject.paintMokepon ()
    
    //sendPosition(mascotPlayerObject.x, mascotPlayerObject.y )

    mokeponesEnemies.forEach(function(mokepon) {
        if (mokepon != undefined){
       mokepon.paintMokepon()
        checkCollision(mokepon)
        }
    })
    squirtleEnemy.paintMokepon()  
    charmanderEnemy.paintMokepon()
    //bulbasaurEnemy.paintMokepon()
    //totodileEnemy.paintMokepon()
    //chilaquilEnemy.paintMokepon()
    //elChicoritaEnemy.paintMokepon()
    
    if (mascotPlayerObject.velocityX !==0 || mascotPlayerObject.velocityY !==0){
        checkCollision(squirtleEnemy)
        checkCollision(charmanderEnemy)
        //checkCollision(bulbasaurEnemy)
        //checkCollision(totodileEnemy)
        //checkCollision(chilaquilEnemy)
        //checkCollision(elChicoritaEnemy)
    }

}


// function sendPosition(x,y) {
//     // The fetch function sends a request to the specified URL with the given options.
//     fetch(`http://192.168.100.125:8080/mokepon/${playerId}/position`, {
//         method: "post",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             x,
//             y
//         })
//     })
//     .then(function(res){
//         if (res.ok){
//             res.json()
//                 .then(function({enemies}){
//                     console.log(enemies)
//                     // The map function creates a new array with the results of calling a provided function on every element in the enemies array.
//                     mokeponesEnemies = enemies.map(function(enemy) {
//                             let mokeponEnemy = null
//                             if(enemy.mokepon != undefined)
//                             {
//                             const mokeponName = enemy.mokepon.name 
//                             // The switch statement evaluates the value of mokeponName and executes the corresponding case statement.
//                             switch(mokeponName){
//                             case "Squirtle":
//                              mokeponEnemy = new Mokepon ("Squirtle", "./jpg-png/squirtle.jpg", 5,"./jpg-png/squirtle-head.jpg",enemy.id)
//                              break
//                             case "Charmander":
//                                 mokeponEnemy = new Mokepon("Charmander", "./jpg-png/charmander.jpg", 5,"./jpg-png/charmander-head.jpg",enemy.id)
//                                 break
//                             case "Bulbasaur":
//                                 mokeponEnemy = new Mokepon("Bulbasaur", "./jpg-png/bulbasaur.png", 5,"./jpg-png/bulbasaur-head.jpg",enemy.id)
//                                 break
//                             case "Totodile":
//                                 mokeponEnemy = new Mokepon("Totodile", "./jpg-png/totodile.jpg", 5,"./jpg-png/totodile-head.jpg",enemy.id)
//                                 break
//                             case "Chilaquil":
//                                 mokeponEnemy = new Mokepon("Chilaquil", "./jpg-png/chilaquil1.jpg",5,"./jpg-png/chilaquil-head.jpg",enemy.id)
//                                 break
//                             case "El_Chicorita":
//                                 mokeponEnemy = new Mokepon("El_Chicorita", "./jpg-png/elchicorita1.jpg",5,"./jpg-png/elchicorita-head.png",enemy.id)
//                                 break
//                             //} else if (mokeponName === "El_Chicorita"){
//                                 //mokeponEnemy = new Mokepon("El_Chicorita", "./jpg-png/elchicorita1.jpg",5,"./jpg-png/elchicorita-head.png")
                            
//                             }
//                             mokeponEnemy.x = enemy.x
//                             mokeponEnemy.y = enemy.y

//                             return mokeponEnemy
//                         }
//                             })
                
//                 })
//         }
//     })
// }

function moveRight(){
    mascotPlayerObject.velocityX = 5
}

function moveLeft(){
    mascotPlayerObject.velocityX = -5
}

function moveDown(){
    mascotPlayerObject.velocityY = 5
}

function moveUp(){
    mascotPlayerObject.velocityY = -5
}

function stopMovement(){
    mascotPlayerObject.velocityX = 0
    mascotPlayerObject.velocityY = 0
}

function pushKey(event){
    console.log(event.key)
    switch (event.key) {
        case "ArrowUp":
        case "w":
            moveUp()
            break
        case "ArrowDown":
        case"s":
            moveDown()
            break
        case "ArrowLeft":
        case "a":
            moveLeft()
            break
        case "ArrowRight":
        case "d":
            moveRight()
            break
        default:
            break
    }
}

function startMap (){
    
    mascotPlayerObject = getMascot(mascotPlayer)

    interval = setInterval(paintCanvas, 50)

    window.addEventListener("keydown", pushKey)

    window.addEventListener("keyup", stopMovement)
}

function getMascot(){
    for (let i = 0; i < mokepones.length; i++) {
        if(mascotPlayer === mokepones[i].name){
            return mokepones[i]
        
        }
    }
}

function checkCollision (enemy){
    const enemyUp = enemy.y
    const enemyDown = enemy.y + enemy.height
    const enemyRight = enemy.x + enemy.widht
    const enemyLeft = enemy.x

    const mascotUp = mascotPlayerObject.y
    const mascotDown = mascotPlayerObject.y + mascotPlayerObject.height
    const mascotRight = mascotPlayerObject.x + mascotPlayerObject.widht
    const mascotLeft = mascotPlayerObject.x

    if(
        mascotDown < enemyUp ||
        mascotUp > enemyDown ||
        mascotRight < enemyLeft ||
        mascotLeft > enemyRight
    ){
        return
    }
    stopMovement()
    clearInterval(interval)
    console.log("detect");

    enemyId = enemy.id
    sectionSelectAttack.style.display = "flex"
    sectionViewMap.style.display = "none"
    selectMascotEnemy(enemy)
    
}

window.addEventListener("load", startgame)
let gameWnd = document.getElementById("game")
let startWnd = document.getElementById("start")
let appWnd = document.querySelector("#app")

const startBtn = document.querySelector("#start button")
const player = document.getElementById("player")
const options = document.getElementById("options")
const audio = document.querySelector("audio")
const soundSwitch = document.querySelector("#sound img")
let score = document.querySelector("#score span")
const skin1 = document.querySelector("#s_1")
const skin2 = document.querySelector("#s_2")

let isSound = false
countLifes = 3
countScore = 0
let playerSkin = "skin_1"


skin1.onclick = function() {
    if (skin2.className = "selected") {
        skin2.className = ""
        skin1.className = "selected"
    }
    playerSkin = "skin_1"
}

skin2.onclick = function() {
    if (skin1.className = "selected") {
        skin1.className = ""
        skin2.className = "selected"
    }
    playerSkin = "skin_2"
}

//game started
startBtn.onclick = function() {
    startGame()
}

function startGame() {
    startWnd.style = "display: none;"
    gameWnd.style = "display: block;"
    player.className = playerSkin

    createLifes()
    createEnemy()
}

//lifes
function die() {
    countLifes = countLifes - 1
    if (countLifes <= 0) {
        alert("You Died")
    }
    createLifes()
}

function createLifes() {
    let lifes = document.querySelector("#lifes")
    let counter = 0
    lifes.innerHTML = ""
    while (counter < countLifes) {
        let span = document.createElement("span")
        lifes.appendChild(span)

        counter = counter + 1
    }
}

//score
function appendScore() {
    countScore++
    score.innerHTML = countScore
}

//sound player controls
soundSwitch.onclick = function() {
    if (isSound) {
        soundSwitch.src = "images/mute_sound.png"
        audio.pause()
        isSound = false
    } else {
        soundSwitch.src = "images/sound_on.png"
        audio.play()
        isSound = true
    }
}

//listenner
document.onkeydown = function(event) {
    console.dir(event)
    if ((event.keyCode == 83 || event.key == "ArrowDown") &&
        player.offsetTop < appWnd.clientHeight - 200) {
        let playerMovedDown = setInterval(
            () =>
            player.style.top = player.offsetTop + 70 + "px", 100)
        setTimeout(() => clearInterval(playerMovedDown), 100)
    }
    if ((event.keyCode == 87 || event.key == "ArrowUp") &&
        player.offsetTop > 50) {
        let playerMovedUp = setInterval(
            () =>
            player.style.top = player.offsetTop - 70 + "px", 100)
        setTimeout(() => clearInterval(playerMovedUp), 100)
    }
    if (event.keyCode == 32) {
        createBullet()
    }
}

//bullet controls
function fireBullet(bullet) {
    let bulletMove = setInterval(() => {
        if (bullet.offsetLeft >= gameWnd.clientWidth + 100) {
            clearInterval(bulletMove)
            bullet.remove()
        }
        bullet.style.left = bullet.offsetLeft + 100 + "px"

        isBoom(bullet)
    }, 10)
}

function isBoom(bullet) {
    let enemy = document.querySelector(".enemy")
    if (enemy == null) {
        createEnemy()
    }

    if (bullet.offsetTop >= enemy.offsetTop &&
        bullet.offsetTop <= enemy.offsetTop + enemy.clientHeight) {
        if (bullet.offsetLeft > enemy.offsetLeft) {
            if (enemy.className == "enemy type-2") {
                bullet.remove()
                createBoom(enemy)
                enemy.className = "enemy type-1"
            } else {
                bullet.remove()
                createBoom(enemy)
                enemy.remove()
                createEnemy()
                appendScore()
                appendEnemy()
            }
        }
    }
}

function createBoom(enemy) {
    let boom = document.createElement("div")
    boom.className = "boom"
    boom.style.top = enemy.offsetTop + "px"
    boom.style.left = enemy.offsetLeft + "px"

    gameWnd.appendChild(boom)

    setTimeout(() => {
        boom.remove()
    }, 1000)
}

function createBullet() {
    let bullet = document.createElement("div")
    bullet.className = "bullet"
    bullet.style.top = player.offsetTop + 150 + "px"

    gameWnd.appendChild(bullet)
    fireBullet(bullet)
}

//работа над врагами
function enemyMovement(enemy) {
    let enemyID = setInterval(function() {
        if (enemy.offsetLeft <= -100) {
            enemy.remove()
            clearInterval(enemyID)
            createEnemy()
            die()
        }
        enemy.style.left = enemy.offsetLeft - 4 + "px"
    }, 10)
}

function createEnemy() {
    let enemy = document.createElement("div")
    enemy.className = getEnemyType()
    enemy.style.top = getRandom(50, appWnd.clientHeight - 50) + "px"

    gameWnd.appendChild(enemy)
    enemyMovement(enemy)
}

function getEnemyType() {
    let getType = getRandom(0, 2)
    if (getType >= 1) {
        return "enemy type-1"
    } else return "enemy type-2"
}

function appendEnemy() {
    if (score.innerHTML % 5 == 0) {
        createEnemy()
    }
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}
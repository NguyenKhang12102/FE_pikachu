let cellWidth = 50;
let cellHeight = 50;
let gameWidth = 12;
let gameHeight = 12;
let shuffleTimes = [25, 20, 18, 15, 12, 10]
let shuffleIndex
let timeDuration = [5000, 4500, 4000, 3500, 3000, 2500]
let timeIndex
let totalCells = gameHeight * gameWidth;
var DONE = false
const cell_images = [
    "images/pieces1.jpg",
    "images/pieces2.jpg",
    "images/pieces3.jpg",
    "images/pieces4.jpg",
    "images/pieces5.jpg",
    "images/pieces6.jpg",
    "images/pieces7.jpg",
    "images/pieces8.jpg",
    "images/pieces9.jpg",
    "images/pieces10.jpg",
    "images/pieces11.jpg",
    "images/pieces12.jpg",
    "images/pieces13.jpg",
    "images/pieces14.jpg",
    "images/pieces15.jpg",
    "images/pieces16.jpg",
    "images/pieces17.jpg",
    "images/pieces18.jpg",
    "images/pieces19.jpg",
    "images/pieces20.jpg",
    "images/pieces21.jpg",
    "images/pieces22.jpg",
    "images/pieces23.jpg",
    "images/pieces24.jpg",
    "images/pieces25.jpg",
    "images/pieces26.jpg",
    "images/pieces27.jpg",
    "images/pieces28.jpg",
    "images/pieces29.jpg",
    "images/pieces30.jpg",
    "images/pieces31.jpg",
    "images/pieces32.jpg",
    "images/pieces33.jpg",
    "images/pieces34.jpg",
    "images/pieces35.jpg",
    "images/pieces36.jpg",
    "images/pieces37.jpg",
    "images/pieces38.jpg",
    "images/pieces39.jpg",
    "images/pieces40.jpg",
    "images/pieces41.jpg",
    "images/pieces42.jpg",
    "images/pieces43.jpg",
    "images/pieces44.jpg",
    "images/pieces45.jpg",
    "images/pieces46.jpg",
    "images/pieces47.jpg",
    // "images/pieces48.jpg",


    ""


];

let wrapper = document.getElementById("wrapper")
let introFrame = document.getElementById("introFrame")
let gameFrame = document.getElementById("gameFrame")
let score_label = document.getElementById("score")
let score_title = document.getElementById("score_title")

let level_select = document.getElementById("levels")
let level = document.getElementById("level_index")
let shuffle = document.getElementById("shuffle_index")

let content = document.getElementById("content")
let start_button = document.getElementById("startButton")

let end_frame = document.getElementById("end_game")
let end_score = document.getElementById("score_end")
let return_button = document.getElementById("backToMenu")
let retry_button = document.getElementById("tryAgain")
let level_retry
return_button.onclick = function (){
    returnToMenuButton()
}

retry_button.onclick = function (){
    retryThisLevel()
}

var cells = []
const themeAudio = new Audio()
themeAudio.src = "audio/theme.mp3"
themeAudio.volume = 0.8

const scoreAudio = new Audio()
scoreAudio.src = "audio/connect (1).mp3"
scoreAudio.volume = 0.8

//start game-
start_button.onclick = function () {
    init()
    introFrame.style.display = "none"
    gameFrame.style.display = "block"
    timer_bar.style.display = "inline-flex"
    labels.style.display = "inline-flex"
    score_label.style.display = "block"
    content.style.display = "flex"
    clearInterval(countDown)
    timer.style.width = "300px"
    interval = 100
    countDown = null
    levelController()
    shuffle.innerHTML = shuffleIndex
    themeAudio.play()
    level.innerHTML = level_select.options[level_select.selectedIndex].text
}

//level controller
const levelController = () => {
    let level_info = level_select.options[level_select.selectedIndex].text
    switch (level_info) {
        case 'Easy':
            timeIndex = timeDuration[0]
            shuffleIndex = shuffleTimes[0]
            break
        case 'Medium':
            timeIndex = timeDuration[1]
            shuffleIndex = shuffleTimes[1]
            break
        case 'Hard':
            timeIndex = timeDuration[2]
            shuffleIndex = shuffleTimes[2]
            break
        case 'Extreme':
            timeIndex = timeDuration[3]
            shuffleIndex = shuffleTimes[3]
            break
        case 'Terrible':
            timeIndex = timeDuration[4]
            shuffleIndex = shuffleTimes[4]
            break
        case 'Nightmare':
            timeIndex = timeDuration[5]
            shuffleIndex = shuffleTimes[5]
            break
    }
}

//level direction
const levelDirection = () => {
    let level_info = level_select.options[level_select.selectedIndex].text
    switch (level_info) {
        case 'Easy':
            break
        case 'Medium':
            flowToLeft()
            break
        case 'Hard':
            flowToRight()
            break
        case 'Extreme':
            flowToBottom()
            break
        case 'Terrible':
            flowToTop()
            break
        case 'Nightmare':
            moveRightHaftToLeft()
            moveLeftHaftToRight()
            break
    }
}

//return to menu button
const returnToMenuButton = () => {
    location.reload()
}

const retryThisLevel = () => {
    gameFrame.innerHTML = ""
    end_frame.style.display = "none"
    gameFrame.style.display = "block"
    timer_bar.style.display = "inline-flex"
    labels.style.display = "inline-flex"
    levelController()
    init()

}

// timer countdown bar
let timer_bar = document.createElement("div")
let labels = document.createElement("div")
const timerBar = () => {
    timer_bar.style.display = "none"
    //timer
    let timer_wrapper = document.createElement("div")
    timer_wrapper.className = "timer_wrapper"
    let timer = document.createElement("div")
    timer.id = "timer_id"
    timer.className = "timer"

    //pause button
    let pause = document.createElement("div")
    pause.onclick = function () {
        pauseButton()
    }
    pause.className = "pause"
    pause.innerHTML = "<i class=\"fa-solid fa-pause\"></i>"

    //restart game button
    let restart = document.createElement("div")
    restart.className = "restart"
    restart.innerHTML = "<i class=\"fa-solid fa-repeat\"></i>"
    restart.onclick = function () {
        shuffleButton()
    }
    //label
    labels.style.display = "none"
    let pause_label = document.createElement("div")
    pause_label.className = "pause_label"
    pause_label.innerHTML = "Stop"
    let restart_label = document.createElement("div")

    restart_label.className = "restart_label"
    restart_label.innerHTML = "Shuffle"
    let timer_label = document.createElement("div")
    timer_label.className = "timer_label"
    timer_label.innerHTML = "Timer"

    wrapper.append(timer_bar)
    timer_bar.append(pause)
    timer_bar.append(restart)
    timer_bar.append(timer_wrapper)
    timer_wrapper.append(timer)

    wrapper.append(labels)
    labels.append(pause_label)
    labels.append(restart_label)
    labels.append(timer_label)
}
timerBar()

//get random images
let cellsLength

function getRandomImages() {
    let cellImages = [];
    //generate 100 cells = 50 pairs
    for (let i = 0; i < totalCells /3 + 2 ; i++) {
        let randomIndex = Math.floor(Math.random() * cell_images.length);
        let randomImage = cell_images[randomIndex];
        //add 1 pair
        cellImages.push(randomImage);
        cellImages.push(randomImage);
    }
    cellsLength = cellImages.length
    console.log(cellImages.length)
    return cellImages;
}

//shuffle cell images
function shuffleCellImages(cellImages) {
    for (let i = cellImages.length - 2; i > 1; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [cellImages[i], cellImages[j]] = [cellImages[j], cellImages[i]];
    }
    return cellImages;
}

//import images to game frame
const init = () => {
    for (let i = 0; i < gameWidth; i++) {
        let rs = []
        for (let j = 0; j < gameHeight; j++) {
            rs.push(0)
        }
        cells.push(rs)
    }
    let cellImages = shuffleCellImages(getRandomImages());
    let k = 0
    for (let i = 1; i < gameWidth - 1; i++) {
        for (let j = 1; j < gameHeight - 1; j++) {
            let value = cellImages[k]
            cells[i][j] = value
            k = k + 1
        }
    }
    for (let i = 0; i < gameWidth; i++) {
        for (let j = 0; j < gameHeight; j++) {
            draw(i, j, cells[i][j])
        }
    }
}

//update the game frame after changes
const reRender = () => {
    gameFrame.textContent = ""
    for (let i = 0; i < gameWidth; i++) {
        for (let j = 0; j < gameHeight; j++) {
            draw(i, j, cells[i][j])
        }
    }
}

//generate cells by div element to game frame
const draw = (x, y, value) => {
    let cell = document.createElement("div");
    cell.className = "cell cell_" + x + "-" + y;
    cell.style.backgroundImage = `url(${value})`;
    if (value === 0) {
        cell.style.backgroundColor = "#faebd700"
        cell.style.border = "none"
    }
    cell.style.left = `${y * cellWidth}px`;
    cell.style.top = `${x * cellHeight}px`;
    cell.addEventListener("click", (e) => {
        mouseClicked(x, y, e)
    });
    gameFrame.appendChild(cell);
}

//mouse clicked function
let cell1, cell2, div1, div2
let visited = []

//store and check visited cells
const initVisited = () => {
    visited = []
    for (let i = 0; i < gameWidth; i++) {
        let row = []
        for (let j = 0; j < gameHeight; j++) {
            row.push(false)
        }
        visited.push(row)
    }
}

let interval = 100;
let interval_update
let bonus_score
let interval_status = false
let countDown = null
let countdown_value
//stop timer
let timer = document.getElementById("timer_id")
const pauseButton = () => {
    let width_stopped = interval_update
    if (!interval_status) {
        interval_status = true
        timer.style.width = width_stopped + "%"
        clearInterval(countDown)
        countDown = null
        let pause = document.getElementsByClassName("pause")[0]
        let text = document.getElementsByClassName("pause_label")[0]
        text.textContent = "Play"
        gameFrame.style.backgroundImage = "url(\"image/pokestop.jpg\")"
        gameFrame.style.opacity = "0.05"
        pause.innerHTML = "<i class=\"fa-solid fa-play\"></i>"
    } else {
        interval_status = false
        let pause = document.getElementsByClassName("pause")[0]
        gameFrame.style.opacity = "1"
        gameFrame.style.backgroundImage = "none"
        pause.innerHTML = "<i class=\"fa-solid fa-pause\"></i>"
        let text = document.getElementsByClassName("pause_label")[0]
        text.textContent = "Stop"
        countDown = setInterval(() => {
            interval--
            let timer = document.getElementById("timer_id")
            let progressWidth = interval

            if (interval > 0) {
                timer.style.width = progressWidth + "%"
                interval_update = progressWidth

            } else {
                clearInterval(countDown)
                timer.style.width = "0%"
                let alert = `<div class="time_out">
                                <p>TIME OUT!</p>
                             </div>                
                `
                gameFrame.innerHTML += alert
            }
        }, timeIndex)
    }
    countdown_value = countDown
}

//shuffle pokemon
let shuffle_display
const shuffleButton = () => {
    if (shuffleIndex >= 0) {
        for (let i = 1; i < cells.length - 1; i++) {
            for (let j = 1; j < cells[i].length - 1; j++) {
                if (cells[i][j] !== 0) {
                    let c1 = cells[i][j]
                    let i_r = Math.floor(Math.random() * (gameHeight - 2)) + 1
                    let j_r = Math.floor(Math.random() * (gameHeight - 2)) + 1
                    for (let k = 0; k < 10000; k++) {
                        if (cells[i_r][j_r] === 0) {
                            i_r = Math.floor(Math.random() * (gameHeight - 2)) + 1
                            j_r = Math.floor(Math.random() * (gameHeight - 2)) + 1
                        } else {
                            break
                        }
                    }
                    let value_c1 = cells[i][j]
                    cells[i][j] = cells[i_r][j_r]
                    cells[i_r][j_r] = value_c1
                }
            }
        }
        shuffleIndex = shuffleIndex - 1
        shuffle_display = shuffleIndex
        updateShuffle(shuffle_display)
    }
    reRender()
}



//click function
function mouseClicked(x, y, e) {
    if (countDown === null) {
        countDown = setInterval(() => {
            interval--
            // let timer = document.getElementById("timer_id")
            let progressWidth = interval - (interval * 0.0000000025)
            if (interval > 0) {
                timer.style.width = progressWidth + "%"
                interval_update = progressWidth
            } else {
                clearInterval(countDown)
                timer.style.width = "0%"
                let alert = `<div class="time_out">
                                <p>TIME OUT!</p>
                             </div>`
                gameFrame.innerHTML += alert
            }
        }, timeIndex)
    }

    let count = 0
    if (cells[x][y] !== 0) {
        e.target.style.opacity = "0.5"
        let clickedCell = e.target
        if (clickedCell !== cell1) {
            if (!cell1 || cell1 === null) {
                div1 = clickedCell
                cell1 = [x, y]
                count++
            } else if (cell1[0] === x && cell1[1] === y) {
                e.target.style.opacity = "1"
                cell1 = null;
            } else {
                div2 = clickedCell
                cell2 = [x, y]
                finishPath = false
                initVisited()
                let first_cell = cells[cell1[0]][cell1[1]]
                let second_cell = cells[cell2[0]][cell2[1]]
                if (first_cell === second_cell) {
                    pathWay(cell1, cell2)
                }
                if (DONE) {
                    DONE = false
                } else {
                    div1.style.opacity = "1"
                    div2.style.opacity = "1"
                    cell1 = null
                    cell2 = null
                }
            }
        }
    }
}


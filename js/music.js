var song = new Audio('files/mp3/badLiar.mp3')
var progress = document.getElementById("bar")
var shuffle = false
var repeat = false

let currentSong = 0
let songs = []
let oldNumber = null

fetch('files/json/try.json')
    .then((response) => response.json())
    .then(data => {
        songs = data
        let songTotal = songs.length
        songUpdate()
    })

function songUpdate() {
    document.getElementById("title").textContent = songs[currentSong].title
    document.getElementById("artist").textContent = songs[currentSong].artist
    song.src = songs[currentSong].source
    document.getElementById("album").src = songs[currentSong].img
    document.getElementById("circle-path").setAttribute('fill', songs[currentSong].color)
    document.getElementById("bckg-color").setAttribute('fill', songs[currentSong.color2])
    document.getElementById("lyrics-button").setAttribute('href', songs[currentSong].lyrics)
    if (shuffle == true) {
        document.getElementById("shuffle").setAttribute('stroke', songs[currentSong].color)
    }
    if (repeat == true) {
        document.getElementById("repeat").src = "files/svg/repeat-circle-full-svgrepo-com.svg"
    }
}

function convert(input) {
    let minutes = input / 60
    return minutes.toFixed(2)
}

function playButton() {
    if (song.paused) {
        song.play()
        document.getElementById("play").src = "files/svg/pause-button-svgrepo-com.svg"

        song.addEventListener("timeupdate", function() {
            progress.max = song.duration
            progress.value = song.currentTime
        
            document.getElementById("time").textContent = convert(progress.value)
            document.getElementById("max").textContent = convert(progress.max)
        })
        
        progress.addEventListener("input", function() {
            song.currentTime = progress.value
        })
    } else {
        song.pause()
        document.getElementById("play").src = "files/svg/play-button-svgrepo-com.svg"
    }

    song.addEventListener("ended", function() {
        skipForward()
        document.getElementById("play").src = "files/svg/play-button-svgrepo-com.svg"
    })
}

function skipBack() {
    song.currentTime = 0
}

function setSkipPrevious() {
    if (shuffle == true && repeat == false) {
        randomSong()
        songUpdate()
    } else if (repeat == true) {
        song.currentTime = 0
    } else {
    if (currentSong == 0) {
        currentSong = 2
        songUpdate()
    } else {
        currentSong -= 1
        songUpdate()
    }
    }
}

function skipPrevious() {
    if (song.paused == true) {
        setSkipPrevious()
    } else {
        setSkipPrevious()
        song.play()
        document.getElementById("play").src = "files/svg/pause-button-svgrepo-com.svg"
    }
}

function setSkipForward() {
    if (shuffle == true && repeat == false) {
        randomSong()
        songUpdate()
    } else if (repeat == true) {
        song.currentTime = 0
    } else {
    if (currentSong >= 2) {
        currentSong = 0
        songUpdate()
    } else {
        currentSong += 1
        songUpdate()
    }
    }
}

function skipForward() {
    if (song.paused == true) {
        setSkipForward()
    } else {
        setSkipForward()
        song.play()
        document.getElementById("play").src = "files/svg/pause-button-svgrepo-com.svg"
    }
}

function random(min, songTotal){
    min = Math.ceil(min)
    max = Math.floor(songTotal)
    return Math.floor(Math.random() * (songTotal - min + 1)) + min
}

function setShuffle() {
    if (shuffle == false) {
        shuffle = true
        document.getElementById("shuffle").setAttribute('stroke', songs[currentSong].color) 
    } else {
        shuffle = false
        document.getElementById("shuffle").setAttribute('stroke', "#000000")
    }
}

function randomSong() {
    currentSong = random(0, 2)
}

function setRepeat() {
    if (repeat == false) {
        repeat = true
        document.getElementById("repeat").src = "files/svg/repeat-circle-full-svgrepo-com.svg"
    } else {
        repeat = false
        document.getElementById("repeat").src = "files/svg/repeat-circle-svgrepo-com.svg"
    }
}
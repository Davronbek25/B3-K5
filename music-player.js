let audio = document.getElementsByTagName("audio")[0]
let playIcon = document.querySelector("img[src$='spotify_play.png']")
let mute = false 
let prevVolume = 1
let speakerStatus
let range
// let pauseCircle = document

window.addEventListener("DOMContentLoaded", () => {
    range = document.querySelector(".right-media-btm > div:first-child > input[type='range']")

    speakerStatus = range.value < 2 ? 
    "mute" : range.value < 33 ?
    "low" : range.value > 33 && range.value < 66 ? 
    "mid" : "high"

    let volumeStored = localStorage.getItem("prevVolume")
    if(volumeStored) {
        prevVolume = volumeStored
        audio.volume = volumeStored
        range.setAttribute("value", volumeStored * 100)
        volumeIconControl(volumeStored * 100)
    }
})

const playSong = (id) => {
    let song2 = JSON.parse(window.localStorage.getItem("songsStored")).map(artist => artist.find(song => song.id === parseInt(id)))
    song = song2.filter(s => Object.prototype.toString.call(s) === '[object Object]')[0]
    playIcon.src = "./imgs/spotify_pause.png";
    setPlayedBtm(song)
    localStorage.setItem("songId", song.id)
    audio.src = song.preview
    // let circleCard = document.getElementById(id)
    // let playCircle = circleCard.querySelector(".triangle")
    // let pauseCircle = circleCard.querySelector(".twoLine")
    // let anonymous = function() {
    //     if(audio.played.length > 0){
    //         if(audio.paused) {
    //             playIcon.src = "imgs/spotify_pause.png"
    //             pauseCircle.classList.toggle("d-none")
    //             playCircle.classList.toggle("d-none")
    //             audio.play()
    //             console.log('playing')
    //         }else {
    //             playIcon.src = "imgs/spotify_play.png"
    //             playCircle.classList.toggle("d-none")
    //             pauseCircle.classList.toggle("d-none")
    //             audio.pause()
    //             console.log("paused")
    //         }
    //     }else {
    //         playIcon.src = "imgs/spotify_pause.png"
    //         playCircle.classList.toggle("d-none")
    //         pauseCircle.classList.toggle("d-none")
    //         audio.play()
    //         console.log("played a new")
    //     }
    // }
    // async function myFunction() {
    //     audio.src = await song.preview
    //     anonymous()
    // }

    // myFunction()
    audio.play()
}

const setPlayedBtm = (song) => {
    const btmCard = document.querySelector(".left-media-btm > div:first-child > img:first-child")
    btmCard.src = `${song.album.cover_big}`
    const btmCardText = document.getElementsByClassName("left-media-btm-text")[0]
    btmCardText.getElementsByTagName("h6")[0].innerText = `${song.artist.name}`
    btmCardText.getElementsByTagName("p")[0].innerText = `${song.title_short}`
    audio.src = song.preview

    let progressContainer = document.getElementsByClassName("progressContainer")[0]
    let currentTime = progressContainer.querySelector(".currentTime")
    let duration = progressContainer.querySelector(".duration")
    currentTime.innerText = "00:00"
    duration.innerText = ("0" + Math.floor(song.duration / 60)).substr(-2) +
    ":" + ("0" + Math.floor(song.duration % 60)).substr(-2)
}

const handleProgressBarUpdate = (ended = false) => {
    let el = document.querySelector(".progress-bar-in")
    let percentage = (audio.currentTime / audio.duration) * 100

    if(ended){
        el.style.width = "0%"
        playIcon.src = "imgs/spotify_play.png"
    }else el.style.width = percentage.toString() + "%"

    let currentTime = document.querySelector(".progressContainer > .currentTime")
    let minutes = "0" + Math.floor(audio.currentTime / 60)
    let seconds = "0" + Math.floor(audio.currentTime)
    currentTime.innerText = minutes.substr(-2) + ":" + seconds.substr(-2)
}

const handleProgressBarClick = (e) => {
    let el = e.currentTarget.firstElementChild
    let percentage = parseInt(e.offsetX * 100) / e.currentTarget.clientWidth
    el.style.width = percentage.toString() + "%"

    audio.currentTime = (percentage / 100) * audio.duration
}

const volumeIconControl = (v) => {
    let speaker = document.getElementById("spotify-speaker")
    if(v < 2) {
        speaker.src = "imgs/spotify_speaker_mute.png"
        speakerStatus = "mute"
    }else if(v < 33) {
        speaker.src = "imgs/spotify_speaker_low.png"
        speakerStatus = "low"
    }else if(v > 33 && v < 66) {
        speaker.src = "imgs/spotify_speaker_mid.png"
        speakerStatus = "mid"
    }else {
        speaker.src = "imgs/spotify_speaker_high.png"
        speakerStatus = "high"
    }
}

const handleChangeVolume = (e) => {
    let volume = e.target.value / 100
    prevVolume = volume
    localStorage.setItem("prevVolume", volume)
    audio.volume = volume

    volumeIconControl(e.target.value)
}

const handleMute = () => {
    if(mute){
        volumeIconControl(prevVolume * 100)
        mute = false
        audio.volume = prevVolume
        range.setAttribute("value", prevVolume * 100)
    }else {
        document.getElementById("spotify-speaker").src = "imgs/spotify_speaker_mute.png"
        mute = true
        audio.volume = 0
        range.setAttribute("value", '0')
    }
}

const handlePlay = () => {
    if(audio.played.length > 0){
        if(audio.paused) {
            playIcon.src = "imgs/spotify_pause.png"
            audio.play()
        }else {
            playIcon.src = "imgs/spotify_play.png"
            audio.pause()
        }
    }else {
        playIcon.src = "imgs/spotify_pause.png"
        audio.play()
    }
}

audio.ontimeupdate = () => handleProgressBarUpdate()
audio.onended = () => handleProgressBarUpdate(true)


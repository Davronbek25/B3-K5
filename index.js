window.onscroll = function() {
    if(document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
        document.getElementById("nav").classList.replace('transparent-bg', 'nav-bg')
    }else {
        document.getElementById("nav").classList.replace("nav-bg", 'transparent-bg')
    }
}

let eminem = []
let billie = []
let rihanna = []
let songs = []

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'fa8f048e48msh85f2395b701a8e0p1fd1f9jsn4284c7f85337',
		'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
	}
};

window.onload = () => {
    let time = new Date()
    time = time.getHours
    let greeting = document.querySelector(".first-main > h2:first-child")
    if(time > 5) {
        greeting.innerHTML = "Good morning"
    }else if(time > 12) {
        greeting.innerHTML = "Good afternoon"
    }else greeting.innerHTML = "Good evening"

    const fetchEminem = fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q=eminem", options)
    .then(res => res.json())
    const fetchBillie = fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q=billie%20eilish", options)
    .then(res => res.json())
    const fetchRihanna = fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q=rihanna", options)
    .then(res => res.json())

    Promise.all([fetchEminem, fetchBillie, fetchRihanna])
    .then(res => {
        console.log(res)
        console.log(res[0].data)
        console.log(res[1].data)
        console.log(res[2].data)
        eminem = res[0].data
        billie = res[1].data
        rihanna = res[2].data
        songs = [eminem, billie, rihanna]
        if(!res[0].data || !res[1].data || !res[2].data) {
            window.location.reload();
            console.log("hey")
        }else {
            let rows = document.querySelectorAll(".list-cards .row")
            let rows2 = document.querySelectorAll(".second-main .row")
            // console.log(rows)
            rows.forEach((row, index) => {
                for (let i = 0; i < 3; i++) {
                    let random25 = index
                    // console.log(songs[i][random25].album.cover_big)
                    row.innerHTML += `
                    <div class="col">
                        <div class="card mb-3" style="max-width: 540px">
                        <div class="row g-0">
                            <div class="col-md-4">
                            <img
                                src="${songs[i][random25].album.cover_big}"
                                class="img-fluid rounded-start"
                                alt="..."
                            />
                            </div>
                            <div class="col-md-8 d-flex position-relative">
                            <p class="card-text align-self-center ps-3 text-white m-0 w-75">
                            ${songs[i][random25].title.substring(0,20)}
                            </p>
        
                            <div class="play-icon0 shadow-sm">
                                <div class="circle">
                                <div class="triangle"></div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    `
                }
            })
            // console.log(rows)
            rows2.forEach(row => {
                for (let j = 0; j < 2; j++) {
                    for (let i = 0; i < 3; i++) {
                        const random25 = i + j + 2
                        // console.log(songs[i][random25].album.cover_big)
                        row.innerHTML += `
                        <div class="col">
                            <div class="custom-card">
                            <div class="img-holder">
                                <img src="${songs[i][random25].album.cover_big}" alt="" />
                            </div>
                            <div class="text">
                                <h2>${songs[i][random25].artist.name}</h2>
                                <p>${songs[i][random25].title_short}</p>
                            </div>
                            <div class="play-icon">
                                <div class="circle">
                                <div class="triangle"></div>
                                </div>
                            </div>
                            </div>
                        </div>
                        `
                    }
                }
            })
            } 
    }).catch(err => console.log(err))

}
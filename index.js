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
        if(!res[0].data && !res[1].data && !res[2].data) {
            window.location.reload();
        } 
    }).catch(err => console.log(err))
}
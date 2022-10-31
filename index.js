window.onscroll = function() {
    if(document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
        document.getElementById("nav").classList.replace('transparent-bg', 'nav-bg')
    }else {
        document.getElementById("nav").classList.replace("nav-bg", 'transparent-bg')
    }
}

window.onload = () => {
    let time = new Date()
    time = time.getHours
    let greeting = document.querySelector(".first-main > h2:first-child")
    if(time > 5) {
        greeting.innerHTML = "Good morning"
    }else if(time > 12) {
        greeting.innerHTML = "Good afternoon"
    }else greeting.innerHTML = "Good evening"
}
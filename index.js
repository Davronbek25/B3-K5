window.onscroll = function() {
    if(document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
        document.getElementById("nav").classList.replace('transparent-bg', 'nav-bg')
    }else {
        document.getElementById("nav").classList.replace("nav-bg", 'transparent-bg')
    }
}
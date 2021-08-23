var itemHeader = document.querySelectorAll(".header-category__child");
var timeSlider = document.getElementsByClassName("header-line--bottom__main")[0];
var mouseScroll = document.getElementsByClassName("header-right")[0];
let allActiveMain = document.querySelectorAll(".main-child");
var headerTop = document.getElementsByClassName("header")[0];
var headerBottom = document.getElementsByClassName("header-bottom")[0];
var mouseScrollTimeOut;

// Responsive

let closeHeaderMobile = document.getElementsByClassName("header-mobile-close")[0];
let navbarIconMobile = document.getElementsByClassName("header-mobile-navbar-icon")[0];
let overlayFullScreen = document.getElementsByClassName("overlay-fullscreen")[0];
let navbarMobile = document.getElementsByClassName("header-mobile-navbar-main")[0];
// Touch
var xDown = null;
var yDown = null;

// Display Icon Scroll Top-Bottom
function renderMouseScroll() {
    clearTimeout(mouseScrollTimeOut);
    mouseScroll.style.opacity = "0";
    mouseScrollTimeOut = setTimeout(() => {
        mouseScroll.style.opacity = "1";
    }, 5000)
}

// Scroll
function handleMoveSlider(e, xDiff) {
    renderMouseScroll();
    let allActiveMain = document.querySelectorAll(".main-child");
    let active = document.querySelectorAll(".active");
    let currentIndex = active[0].getAttribute("data-set");
    let target;
    if (((e && e.deltaY < 0 && active[1].scrollTop == 0) || xDiff < 0) && parseInt(currentIndex) != 0) {

        target = document.getElementsByClassName("header-category__child")[--currentIndex];
        active[0].classList.remove("active");
        active[1].classList.remove("active");
        document.getElementsByClassName(target.getAttribute("data-menuanchor"))[0].classList.remove("no-active");
        timeSlider.style.width = `${20 * (parseInt(currentIndex) + 1)}%`;
    }
    else if (((e && e.deltaY > 0 && Math.ceil(active[1].scrollTop) >= (active[1].scrollHeight - active[1].clientHeight)) || xDiff > 0) && parseInt(currentIndex) != allActiveMain.length - 1) {
        target = document.getElementsByClassName("header-category__child")[++currentIndex];
        active[0].classList.remove("active");
        active[1].classList.remove("active");
        active[1].classList.add("no-active");
        timeSlider.style.width = `${20 * (parseInt(currentIndex) + 1)}%`;
    }
    else
        return;
    target.classList.add("active");
    document.getElementsByClassName(target.getAttribute("data-menuanchor"))[0].classList.add("active");
    // Check Header Top and Bottom true or false?
    checkHeaderTopAndBottom(document.getElementsByClassName(target.getAttribute("data-menuanchor"))[0])
}

// Check Header Top and Bottom true or false?
function checkHeaderTopAndBottom(item) {
    let maxScroll = item.scrollHeight - item.clientHeight;
    console.log(maxScroll);
    console.log(item.scrollTop);
    if (item.scrollTop == 0)
        headerTop.style.transform = "translateY(0)";
    else
        headerTop.style.transform = "translateY(-100%)";
    if (Math.ceil(item.scrollTop) >= maxScroll)
        headerBottom.style.transform = "translateY(0)";
    else
        headerBottom.style.transform = "translateY(100%)";
}

// Check Header Top and Bottom true or false?
function changeTabHeader(e) {
    renderMouseScroll();
    overlayFullScreen.style.display = "none";
    navbarMobile.classList.remove("header-mobile-interact-animation");
    let active = document.querySelectorAll(".active");
    let nameActive = e.target.getAttribute("data-menuanchor");
    let index = e.target.getAttribute("data-set");
    let indexClone = index;
    active[0].classList.remove("active");
    active[1].classList.remove("active");
    while (indexClone >= 0) {
        allActiveMain[indexClone].classList.remove("active");
        allActiveMain[indexClone].classList.add("no-active")
        indexClone--;
    }
    e.target.classList.add("active");
    // Check Header Top and Bottom true or false?
    checkHeaderTopAndBottom(document.getElementsByClassName(nameActive)[0])
    document.getElementsByClassName(nameActive)[0].classList.add("active");
    timeSlider.style.width = `${20 * (parseInt(index) + 1)}%`;
    while (index <= allActiveMain.length - 1) {
        allActiveMain[index].classList.remove("no-active");
        index++;
    }
}

function getTouches(evt) {
    return evt.touches;
}

// First Touch in Screen
function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
};

// Consider touch up or down with first touch
function handleTouchMove(evt) {
    if (!xDown || !yDown) {
        return;
    }
    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        handleMoveSlider(null, xDiff);
    }
    xDown = null;
    yDown = null;
};

renderMouseScroll();
// initialize header active
itemHeader[0].classList.add("active");
allActiveMain[0].classList.add("active");

itemHeader.forEach((item) => {
    item.addEventListener("click", changeTabHeader)
})

allActiveMain.forEach((item) => {
    item.addEventListener("scroll", e => checkHeaderTopAndBottom(e.target))
})

window.addEventListener("wheel", (e) => {
    handleMoveSlider(e);
});

closeHeaderMobile.addEventListener('click', () => {
    overlayFullScreen.style.display = "none";
    navbarMobile.classList.remove("header-mobile-interact-animation");
})

navbarIconMobile.addEventListener('click', () => {
    overlayFullScreen.style.display = "block";
    navbarMobile.classList.add("header-mobile-interact-animation");
})

// Touchmove
document.addEventListener('touchstart', handleTouchStart);
document.addEventListener('touchmove', handleTouchMove);

// Contact Form
var url = 'https://script.google.com/macros/s/AKfycbw8aTj88yxiYABYOPH6SiKcMgPEwn__R5fZGPez06kpXinNSxU/exec';

$("form").submit((e) => {
    e.preventDefault();
    let data = {
        Name: e.target[0].value,
        Email: e.target[1].value,
        Message: e.target[2].value
    };
    $.ajax({
        url: url,
        method: "GET",
        dataType: "json",
        data: data
    });
    e.target[0].value="";
    e.target[1].value="";
    e.target[2].value="";
})




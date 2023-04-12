import { setSoundButtonsActions, setAudioVolume } from "./play-sound.js";
import { formatNumberToString, toggleElement, toggleElementsArrayClass } from "./utils.js";

let play = document.querySelector('.play');
let reset = document.querySelector('.stop');
let add = document.querySelector('.add');
let remove = document.querySelector('.remove');
let coffee = document.querySelector('.coffee');
let rain = document.querySelector('.rain');
let fireplace = document.querySelector('.fireplace');
let forest = document.querySelector('.forest');
let minutes = document.querySelector('.minutes');
let seconds = document.querySelector('.seconds');
let pause = document.querySelector('.pause');
let coffeeVolume = document.querySelector('#coffee-volume');
let forestVolume = document.querySelector('#forest-volume');
let fireplaceVolume = document.querySelector('#fireplace-volume');
let rainVolume = document.querySelector('#rain-volume');
let textDiv = document.querySelector('.time');
coffeeVolume.volume = 70;
forestVolume.volume = 70;
fireplaceVolume.volume = 70;
rainVolume.volume = 70;
coffeeVolume.name = 'coffee';
rainVolume.name = 'rain';
fireplaceVolume.name = 'fireplace';
forestVolume.name = 'forest';
let isRunning = false;
let isClicking = false;
let clickedBtn;
let themeBtn = document.querySelector('.theme');
let theme = 'light';
let themeIcon = document.querySelector('.theme img');
let coffeeImg = document.querySelector('.coffee img');
let rainImg = document.querySelector('.rain img');
let fireplaceImg = document.querySelector('.fireplace img');
let forestImg = document.querySelector('.forest img');
let slides = document.querySelectorAll('.slide');
let slidebars = document.querySelectorAll('.slidebar');
let playImg = document.querySelector('.play img');
let pauseImg = document.querySelector('.stop img');
let addImg = document.querySelector('.add img');
let removeImg = document.querySelector('.remove img');

themeBtn.addEventListener('click', () => {
    toggleElementsArrayClass([
        play,
        reset,
        pause,
        add,
        remove,
        coffee,
        forest,
        fireplace,
        rain,
        textDiv,
        ...slides,
        ...slidebars
    ], 'dark')
    
    if (theme === 'light') {
        document.body.style.backgroundColor = 'black';
        theme = 'dark';
        themeIcon.src = '../assets/images/dark-theme.svg';
        coffeeImg.src = "../assets/images/coffee-dark.svg";
        rainImg.src = "../assets/images/rain-dark.svg";
        forestImg.src = "../assets/images/forest-dark.svg";
        fireplaceImg.src = "../assets/images/fireplace-dark.svg";
        playImg.src = "../assets/images/play-dark.svg";
        pauseImg.src = "../assets/images/stop-dark.svg";
        addImg.src = "../assets/images/add-dark.svg";
        removeImg.src = "../assets/images/remove-dark.svg";
        return;
    }
    document.body.style.backgroundColor = 'white';
    theme = 'light';
    themeIcon.src = '../assets/images/light-theme.svg';
    coffeeImg.src = "../assets/images/coffee.svg";
    rainImg.src = "../assets/images/rain.svg";
    forestImg.src = "../assets/images/forest.svg";
    fireplaceImg.src = "../assets/images/fireplace.svg";
    playImg.src = "../assets/images/play.svg";
    pauseImg.src = "../assets/images/stop.svg";
    addImg.src = "../assets/images/add.svg";
    removeImg.src = "../assets/images/remove.svg";
})

setSoundButtonsActions([
    {
        handle: coffee,
        name: 'coffee'
    },
    {
        handle: rain,
        name: 'rain'
    },
    {
        handle: fireplace,
        name: 'fireplace'
    },
    {
        handle: forest,
        name: 'forest'
    },
]);

const toggleButtons = () => {
    toggleElement(pause);
    toggleElement(play);
}

const countDown = () => {
    let sec = Number(seconds.innerHTML);
    let min = Number(minutes.innerHTML);
    if (min === 0 && sec === 0) {
        pauseTimeAction();
        return;
    }
    sec-=1;
    if (sec < 0) {
        sec = 59;
        if (min > 0) {
            min-=1;
            minutes.innerHTML = formatNumberToString(min);
        }
    }
    seconds.innerHTML = formatNumberToString(sec);
}

const runTime = () => {
    if (isRunning) {
        countDown();
        setTimeout(runTime, 1000);
    }
}

const playTimeAction = () => {
    if(!isRunning) {
        isRunning = true;
        setTimeout(runTime, 1000);
        toggleButtons();
    }
}

const pauseTimeAction = () => {
    isRunning = false;
    toggleButtons();
}

const resetTimeAction = () => {
    if (isRunning) pauseTimeAction();
    minutes.innerHTML = '30';
    seconds.innerHTML = '00';
}

const addTimeAction = () => {
    let v = Number(minutes.innerHTML) + 5;
    minutes.innerHTML = formatNumberToString(v);
}

const removeTimeAction = () => {
    let v = Number(minutes.innerHTML) - 5;
    if(v < 0) v += 5;
    minutes.innerHTML = formatNumberToString(v);
}

play.addEventListener('click', playTimeAction);
pause.addEventListener('click', pauseTimeAction);
reset.addEventListener('click', resetTimeAction);
add.addEventListener('click', addTimeAction);
remove.addEventListener('click', removeTimeAction);

const setVolume = () => {
    clickedBtn.style.left = `calc(${clickedBtn.volume}% - .5rem)`;
    setAudioVolume(clickedBtn.name, clickedBtn.volume/100);
}

document.addEventListener('mousemove', e => {
    if (isClicking) {
        clickedBtn.volume += e.movementX;
        if (clickedBtn.volume > 100) clickedBtn.volume = 100;
        if (clickedBtn.volume < 0) clickedBtn.volume = 0;
        setVolume();
    }
})

const setVolumeBtnAction = (btn) => {
    isClicking = true;
    clickedBtn = btn;
}

rainVolume.addEventListener('mousedown', () => setVolumeBtnAction(rainVolume));
forestVolume.addEventListener('mousedown', () => setVolumeBtnAction(forestVolume));
coffeeVolume.addEventListener('mousedown', () => setVolumeBtnAction(coffeeVolume));
fireplaceVolume.addEventListener('mousedown', () => setVolumeBtnAction(fireplaceVolume));

document.addEventListener('mouseup', () => {
    isClicking = false;
})

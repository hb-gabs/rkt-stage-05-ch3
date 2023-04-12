const coffee = new Audio("../assets/audios/Cafeteria.wav");
const rain = new Audio("../assets/audios/Chuva.wav");
const forest = new Audio("../assets/audios/Floresta.wav");
const fireplace = new Audio("../assets/audios/Lareira.wav");

const sounds = {
    coffee,
    rain,
    forest,
    fireplace
}

export const setSoundButtonsActions = (list) => {
    list.map(({
        handle,
        name
    }) => {
        handle.addEventListener('mousedown', e => clickSoundButton(handle, name, e));
    })
}

const clickSoundButton = (btn, name, e) => {
    if (!e.target.classList.contains('slide') && !e.target.classList.contains('slidebar')) {
        btn.classList.toggle('selected');
        
        if (isPlaying(btn)) {
            sounds[name].play();
            return;
        }
        sounds[name].pause();
    }
}

export const setAudioVolume = (name, volume) => {
    sounds[name].volume = volume;
}

const isPlaying = (btn) => {
    return btn.classList.contains('selected');
}
recording = false;
const track = [];


document.addEventListener("keypress", (event) => {
    onKeyPressed(event);
    recordKey(event);
})
function onKeyPressed(event) {
    const key = event.key;
    const sound = whichSound(key);
    playSound(sound);
}
function whichSound(key) {
    switch (key) {
        case "w": {
            return "boom";
        }
        case "a": {
            return "clap";
        }
        case "s": {
            return "hihat";
        }
        case "d": {
            return "kick";
        }
        case "h": {
            return "openhat";
        }
        case "j": {
            return "ride";
        }
        case "k": {
            return "snare";
        }
        case "l": {
            return "tink";
        }
        case "g": {
            return "tom";
        }
        default: {
            break;
        }
    }
}
function playSound(sound) {
    const audioTag = document.querySelector("#" + sound)
    audioTag.currentTime = 0;
    audioTag.play();
}

function startRecord() {
    if (recording === true) {
        return;
    }
    else {
        recording = true;
        track.push({ key: "", time: Date.now() })
    }

}
function recordKey(event) {
    while (recording === true) {
        const sound = {
            key: event.key,
            time: Date.now()
        }
        track.push(sound)
        break;
    }

}
function stopRecord() {
    recording = false;
}
function play() {
    let lastTime;
    track.forEach((el) => {

        if (el === track[0]) {
            lastTime = el.time;
        }

        if (el.key) {
            setTimeout(() => {
                sound = whichSound(el.key);
                playSound(sound);
            }, el.time - lastTime);
        }
        
    })
}
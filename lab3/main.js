recording = false;
let track = {
   1: [],
   2: [],
   3: [],
   4: []
};

const linePicker = document.getElementById("line");
let lineNumber = linePicker.value;
linePicker.addEventListener('change', () => {
    lineNumber = linePicker.value;
});


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
    const audioTag = document.getElementById(sound)
    audioTag.currentTime = 0;
    audioTag.play();
}



function startRecord(button) {

    if (recording === true) {
        recording = false;
        button.innerHTML = 'Record'
    }
    else {
        recording = true;
        button.innerHTML = 'Stop'
        track[lineNumber].push({ key: "", time: Date.now() })
    }
}
function recordKey(event) {
    while (recording === true) {
        const sound = {
            key: event.key,
            time: Date.now()
        }
        track[lineNumber].push(sound)
        break;
    }

}

function play() {
    for(i = 1; i <= Object.keys(track).length; i++ ){
        playLine(i)
    }
}
function playLine(line = lineNumber){
    let lastTime;

    track[line].forEach((sound) => {

        if (sound === track[line][0]) {
            lastTime = sound.time;
        }
        
        if (sound.key) {
            setTimeout(() => {
                sound = whichSound(sound.key);
                playSound(sound);
            }, sound.time - lastTime);
        }
        
    })

}
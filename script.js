const morseCodeMap = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....', 
    'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 
    'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 
    'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-', 
    '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.', ' ': '/'
};

const reverseMorseCodeMap = Object.entries(morseCodeMap).reduce((acc, [letter, code]) => {
    acc[code] = letter;
    return acc;
}, {});

function translateToMorse() {
    const text = document.getElementById("text-input").value.toUpperCase();
    const morse = text.split("").map(char => morseCodeMap[char] || char).join(" ");
    document.getElementById("output").textContent = morse;
}

function translateToText() {
    const morse = document.getElementById("text-input").value.trim().split(" ");
    const text = morse.map(code => reverseMorseCodeMap[code] || "").join("");
    document.getElementById("output").textContent = text;
}

// Play Morse Code with Beeping Sound
function playMorseCode() {
    const morse = document.getElementById("output").textContent;
    const audio = new Audio('morse-sound.mp3'); 
    let i = 0;
    const outputElement = document.getElementById("output");

    function playBeep() {
        if (i < morse.length) {
            outputElement.style.color = morse[i] === '.' || morse[i] === '-' ? '#ff0000' : '#33ff00';
            if (morse[i] === '.') {
                audio.play();
                setTimeout(playBeep, 300);
            } else if (morse[i] === '-') {
                audio.play();
                setTimeout(playBeep, 600);
            } else {
                setTimeout(playBeep, 200);
            }
            i++;
        } else {
            outputElement.style.color = '#33ff00';
        }
    }

    playBeep();
}

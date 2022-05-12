import '../assets/styles/css.css';
import '../assets/styles/style.scss';

const WRAPPER = document.createElement('div');
const BODY = document.querySelector('body');
WRAPPER.className = 'wrapper';

BODY.appendChild(WRAPPER);

const TITLE = document.createElement('h1');
TITLE.className = 'title';
TITLE.innerText = 'VIRTUAL KEYBOARD';

WRAPPER.appendChild(TITLE);

const TEXTAREA = document.createElement('textarea');
TEXTAREA.className = 'textarea';
TEXTAREA.rows = '10';
TEXTAREA.cols = '50';
TEXTAREA.focus();

WRAPPER.appendChild(TEXTAREA);

const KEYBOARD = document.createElement('div');
KEYBOARD.className = 'keyboard';

WRAPPER.appendChild(KEYBOARD);
    
const ROW = ["Backquote", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0", "Minus", "Equal", "Backspace",
                "Tab", "KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "BracketLeft", "BracketRight", "Backslash", "Delete",
                "CapsLock", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon", "Quote", "Enter",
                "ShiftLeft", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", "Slash", "ArrowUp", "ShiftRight",
                "ControlLeft", "MetaLeft", "AltLeft", "Space", "AltRight", "ArrowLeft", "ArrowDown", "ArrowRight", "ControlRight"];

const rowText = ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
                    'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Del',
                    'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter', 
                    'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '&uarr;', 'Shift', 
                    'CTRL', 'Win', 'Alt', '', 'Alt', '&larr;', '&darr;', '&rarr;', 'CTRL'];

const rowTextEn = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 
                'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']','\\', 'Del', 
                'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';',"'", 'Enter', 
                'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.','/', '&uarr;', 'Shift', 
                'CTRL', 'Win', 'Alt', '', 'Alt', '&larr;','&darr;','&rarr;','CTRL'];

const keyboardRow = document.createElement('div');
keyboardRow.className = 'keyboard-row';
KEYBOARD.appendChild(keyboardRow);

const createElement = () => {
    for (let i = 0; i < 64; i++) {
        const key = document.createElement('div');
        const keyEn = document.createElement('div');
        key.className = 'key ' + `${ROW[i]}`;
        key.innerHTML = rowText[i];
        keyboardRow.appendChild(key);
        keyEn.className = 'keyEn ' + `${ROW[i]}`;
        keyEn.innerHTML = rowTextEn[i];
        keyboardRow.appendChild(keyEn);
        keyEn.classList.add('hidden');
        if ((key.innerHTML === 'Backspace') || (keyEn.innerHTML === 'Backspace') || (key.innerHTML === 'CapsLock') || (keyEn.innerHTML === 'CapsLock')) {
            key.style.width = '120px';
            keyEn.style.width = '120px';
        }

        if ((key.innerHTML === 'Enter') || (keyEn.innerHTML === 'Enter') || (key.innerHTML === 'Shift') || (keyEn.innerHTML === 'Shift') || (key.innerHTML === 'CTRL') || (keyEn.innerHTML === 'CTRL')) {
            key.style.width = '100px';
            keyEn.style.width = '100px';
        }

        if ((key.innerHTML === '') || (keyEn.innerHTML === '')) {
            key.style.width = '280px';
            keyEn.style.width = '280px';
        }
    }
}

createElement();
const keys = document.querySelectorAll('.key');
const keysEn = document.querySelectorAll('.keyEn');
const capsLock = document.querySelector('.CapsLock');

capsLock.addEventListener('click', () => {
    keys.forEach(k => {
        k.classList.toggle('key-caps');
    })
})

capsLock.addEventListener('click', () => {
    keysEn.forEach(k => {
        k.classList.toggle('key-caps');
    })
})

const getItem = (item) => {
    if (item.innerHTML === 'CapsLock') {
        return;
    } 

    if (item.innerHTML === 'Backspace') {
        TEXTAREA.innerHTML =  TEXTAREA.innerHTML.substring(0, TEXTAREA.innerHTML.length - 1);
        return;
    }

    if (item.innerHTML === 'Tab') {
        TEXTAREA.innerHTML +=  '        ';
        return;
    }

    if (item.innerHTML === '') {
        TEXTAREA.innerHTML +=  ' ';
        return;
    }

    if (item.innerHTML === 'Enter') {
        TEXTAREA.innerHTML +=  '\n';
        return;
    }

    if ((item.innerHTML === 'CTRL') || (item.innerHTML === 'Shift') || (item.innerHTML === 'Alt') || (item.innerHTML === 'Del') || (item.innerHTML === 'Win')) {
        return;
    }

    TEXTAREA.innerHTML += item.innerText;
}

keys.forEach (item => {
    item.addEventListener('click', () => {
        getItem (item);
    })
})

keysEn.forEach (item => {
    item.addEventListener('click', () => {
        getItem (item);
    })
})

    let eventCode = '';

    document.addEventListener('keydown', (event) => {
        eventCode = event.code;

        keys.forEach((e, k) => {
            e.classList.remove('active-key');
            if (eventCode === ROW[k]) {
                e.classList.add('active-key');
            }
        })

        if (event.shiftKey && event.code === 'AltLeft') {
            keysEn.forEach(item => {
                item.classList.toggle('hidden');
            })

            keys.forEach(item => {
                item.classList.toggle('hidden');
            })
        }
    })

    document.addEventListener('keyup', (event) => {
        eventCode = event.code;

        if (eventCode === 'CapsLock') {
            keys.forEach(n => {
                n.classList.toggle('key-caps');
            })
        }

        keys.forEach((e, k) => {
            e.classList.remove('active-key');
            if (eventCode === ROW[k]) {
                e.classList.remove('active-key');
            }
        })
    }) 

    // TEXTAREA.onfocus = getKey();
    // getKey();
    
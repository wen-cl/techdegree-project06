const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const overlayDiv = document.querySelector('.start');
let missed = 0;
const phrases = ['chocolate',
                 'marshmellow',
                 'nougat',
                 'lolipop',
                 'kitkat'];

function getRandomPhraseAsArray(phrases) {
    const randomNumber = Math.floor(Math.random()*5);
    return phrases[randomNumber].split('');
}

function addPhraseToDisplay (phrase){
    const ul = document.querySelector('#phrase ul');

    for (let Index = 0; Index < phrase.length; Index++){
        const li = document.createElement('li');
        li.textContent = phrase[Index];
        li.className = 'letter';
        ul.appendChild(li);
    }
}

function checkLetter(selectedLetter) {
    const ul = document.querySelector('#phrase ul');
    const lis = ul.children;
    let letter = null;
    
    for (let Index = 0; Index < lis.length; Index++){    
        if (lis[Index].textContent === selectedLetter){
            lis[Index].classList.add('show');
            letter = selectedLetter;
        }
    }
    return letter;
}

function checkWin() {
    const letters = document.querySelectorAll('.letter');
    const show = document.querySelectorAll('.show');
    if (missed >= 5){
        overlayDiv.clasName = 'lose';
        overlayDiv.style.display = '';
        const title = overlayDiv.getElementsByClassName('title')[0];
        title.textContent = 'Game Over';
        const reset = overlayDiv.getElementsByClassName('btn__reset')[0];
        reset.textContent = 'Reset Game';
    }else if (show){
        console.log(letters.length);
        console.log(show.length);
        if (show.length === letters.length) {
            overlayDiv.className = 'win';
            overlayDiv.style.display = '';
            const title = overlayDiv.getElementsByClassName('title')[0];
            title.textContent = 'You Won!';
            const reset = overlayDiv.getElementsByClassName('btn__reset')[0];
            reset.textContent = 'Reset Game';
        };
    }
}

overlayDiv.addEventListener('click', (e)=>{
    if (e.target.textContent === 'Start Game'){
        overlayDiv.style.display = 'none';
        overlayDiv.className = 'start';
        const phraseArray = getRandomPhraseAsArray(phrases);
        console.log(phraseArray);
        addPhraseToDisplay(phraseArray);
    }else if(e.target.textContent === 'Reset Game'){
        console.log('reset game');
        location.reload();
    }

});

document.addEventListener('keyup', (e)=>{
    if (overlayDiv.style.display === 'none'){
        const buttons = qwerty.getElementsByTagName('button');
        for (let index = 0; index < buttons.length; index++){
            if(buttons[index].textContent === e.key && !buttons[index].disabled){
                buttons[index].className = 'chosen';
                buttons[index].disabled = true;
                const letterFound = checkLetter(e.key);
                if(!letterFound && missed <= 5){
                    missed++;
                    const ol = document.querySelector('#scoreboard ol');
                    const firstChild = ol.firstElementChild;
                    ol.removeChild(firstChild);
                    const li = document.createElement('li');
                    li.className = 'tries';
                    li.innerHTML = `<img src="images/lostHeart.png" height="35px" width="30px">`;
                    ol.appendChild(li);
                }
            }
        }
        checkWin();
    }
});



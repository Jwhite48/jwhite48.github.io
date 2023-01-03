import { main } from './main.js';

window.addEventListener("keydown", function(e) {
    if(["ArrowUp","ArrowDown"].indexOf(e.code) > -1){
        e.preventDefault();
    }
}, false);

let myDiv = document.getElementById('StartupGame');
myDiv.addEventListener('keypress', function (e) {
    if (e.key == "Enter") {
        const name = document.getElementById('CharacterNameInput').value;
        if(name.length == 0){
            document.getElementById('StartupInfoText').innerText = 'Your character needs a name (3 - 10 characters).';
            document.getElementById('CharacterNameInput').value = '';
            return;
        }
        else if(name.length < 3 || name.length > 10){
            document.getElementById('StartupInfoText').innerText = 'Must be 3 - 10 characters.';
            document.getElementById('CharacterNameInput').value = '';
            return;
        }else if(!name.match(/^[A-Za-z]+$/)){
            document.getElementById('StartupInfoText').innerText = 'Can only contain letters.';
            document.getElementById('CharacterNameInput').value = '';
            return;
        }

        document.getElementById('StartupGame').style.display = 'none';
        document.getElementById('Game').style.display = 'flex';
        document.getElementById('GameButtons').style.display = 'flex';
        document.getElementById('EnterInnButton').style.display = 'none';
        document.getElementById('EnterCaveButton').style.display = 'none';
        document.getElementById('ThankYou').style.display = 'block';
        main(name);
    }
});

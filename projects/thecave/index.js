import{main}from"./main.js";window.addEventListener("keydown",function(e){["ArrowUp","ArrowDown"].indexOf(e.code)>-1&&e.preventDefault()},!1);let myDiv=document.getElementById("StartupGame");myDiv.addEventListener("keypress",function(e){if("Enter"==e.key){const e=document.getElementById("CharacterNameInput").value;if(0==e.length)return document.getElementById("StartupInfoText").innerText="Your character needs a name (3 - 10 characters).",void(document.getElementById("CharacterNameInput").value="");if(e.length<3||e.length>10)return document.getElementById("StartupInfoText").innerText="Must be 3 - 10 characters.",void(document.getElementById("CharacterNameInput").value="");if(!e.match(/^[A-Za-z]+$/))return document.getElementById("StartupInfoText").innerText="Can only contain letters.",void(document.getElementById("CharacterNameInput").value="");document.getElementById("StartupGame").style.display="none",document.getElementById("Game").style.display="flex",document.getElementById("GameButtons").style.display="flex",document.getElementById("EnterInnButton").style.display="none",document.getElementById("EnterCaveButton").style.display="none",document.getElementById("ThankYou").style.display="block",main(e)}});
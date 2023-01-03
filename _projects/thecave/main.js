import { Map } from './map.js';
import { Player } from './player.js';
import { Wolf, Bear, Snake, Boss } from './monster.js';
import { Claw, Pelt, Scale } from './item.js';

export function main(name){
    const canvas = document.getElementById('MapCanvas');
    const ctx = canvas.getContext('2d');
    const tileSize = 48;

    const map = new Map(tileSize);
    const player = new Player(name);
    const infoElem = document.getElementById('InfoBox');

    let sleep = function(ms){
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    let waitForPressResolve;
    let waitForPress = function(){
        return new Promise(resolve => waitForPressResolve = resolve);
    }

    let choiceAttack = false;
    let choiceFlee = false;
    document.getElementById('AttackButton').addEventListener('click', async (e) => {
        if (waitForPressResolve){
            waitForPressResolve();
            choiceAttack = true;
        } 
    });
    document.getElementById('FleeButton').addEventListener('click', (e) => {
        if (waitForPressResolve){
            waitForPressResolve();
            choiceFlee = true;
        } 
    });

    let isKeyDown = false;
    let keyDownFunction = (e) => {
        if(e.key == 'ArrowUp' && !isKeyDown){
            if(map.playerMovement(1, player)){
                isKeyDown = true;
                encounterChance();
            }
        }else if(e.key == 'ArrowDown' && !isKeyDown){
            if(map.playerMovement(2, player)){
                isKeyDown = true;
                encounterChance();
            }
        }else if(e.key == 'ArrowRight' && !isKeyDown){
            if(map.playerMovement(3, player)){
                isKeyDown = true;
                encounterChance();
            }
        }else if(e.key == 'ArrowLeft' && !isKeyDown){
            if(map.playerMovement(4, player)){
                isKeyDown = true;
                encounterChance();
            }
        }
    };
    let keyUpFunction = (e) => {
        if(e.key == 'ArrowUp' || e.key == 'ArrowDown' || 
               e.key == 'ArrowRight' || e.key == 'ArrowLeft'){
                isKeyDown = false;
        }

        if(map.currentTile == 'Inn'){
            document.getElementById('EnterInnButton').style.display = 'flex';
        }else if(map.currentTile == 'Cave'){
            document.getElementById('EnterCaveButton').style.display = 'flex';
        }else{
            document.getElementById('EnterInnButton').style.display = 'none';
            document.getElementById('EnterCaveButton').style.display = 'none';
        }
    };
    document.addEventListener('keydown', keyDownFunction);
    document.addEventListener('keyup', keyUpFunction);

    let enteredInn = false;
    document.getElementById('EnterInnButton').addEventListener('click', async (e) => {
        document.removeEventListener('keydown', keyDownFunction);
        document.removeEventListener('keyup', keyUpFunction);

        enteredInn = true;
        player.heal();
        await sleep(1250);

        enteredInn = false;
        document.addEventListener('keydown', keyDownFunction);
        document.addEventListener('keyup', keyUpFunction);
    });

    let enteredCave = false;
    document.getElementById('EnterCaveButton').addEventListener('click', (e) => {
        document.removeEventListener('keydown', keyDownFunction);
        document.removeEventListener('keyup', keyUpFunction);
        document.getElementById('GameButtons').style.display = 'none';

        enteredCave = true;
        bossFight(new Boss());
    });

    let isInventoryButtonPressed = false;
    document.getElementById('InventoryButton').addEventListener('click', (e) => {
        document.removeEventListener('keydown', keyDownFunction);
        document.removeEventListener('keyup', keyUpFunction);

        document.getElementById('GameButtons').style.display = 'none';
        document.getElementById('BackButtonDiv').style.display = 'flex';
        document.getElementById('CraftableButtons').style.display = 'flex';
        document.getElementById('RemoveItemsDiv').style.display = 'flex';
        isInventoryButtonPressed = true;
    });
    document.getElementById('CraftSwordButton').addEventListener('click', (e) => {
        if(player.noSword) player.craftable({claws: 2, pelts: 1, scales: 0});
    });
    document.getElementById('CraftShieldButton').addEventListener('click', (e) => {
        if(player.noShield) player.craftable({claws: 0, pelts: 1, scales: 2});
    });
    document.getElementById('CraftBoatButton').addEventListener('click', (e) => {
        if(player.noBoat) player.craftable({claws: 0, pelts: 3, scales: 0});
    });

    let isStatusButtonPressed = false;
    document.getElementById('PlayerStatusButton').addEventListener('click', (e) => {
        document.removeEventListener('keydown', keyDownFunction);
        document.removeEventListener('keyup', keyUpFunction);

        document.getElementById('GameButtons').style.display = 'none';
        document.getElementById('BackButtonDiv').style.display = 'flex';
        isStatusButtonPressed = true;
    });

    document.getElementById('BackButton').addEventListener('click', (e) => {
        document.addEventListener('keydown', keyDownFunction);
        document.addEventListener('keyup', keyUpFunction);

        document.getElementById('CraftableButtons').style.display = 'none';
        document.getElementById('BackButtonDiv').style.display = 'none';
        document.getElementById('RemoveItemsDiv').style.display = 'none';
        document.getElementById('GameButtons').style.display = 'flex';
        isInventoryButtonPressed = false; isStatusButtonPressed = false;
    });

    document.getElementById('RemoveClawButton').addEventListener('click', (e) => {
        player.removeInventory('Claw');
    });
    document.getElementById('RemovePeltButton').addEventListener('click', (e) => {
        player.removeInventory('Pelt');
    });
    document.getElementById('RemoveScaleButton').addEventListener('click', (e) => {
        player.removeInventory('Scale');
    });

    let choiceBossAttack = false;
    let choiceBossDefend = false;
    document.getElementById('BossAttackButton').addEventListener('click', async (e) => {
        if (waitForPressResolve){
            waitForPressResolve();
            choiceBossAttack = true;
        } 
    });
    document.getElementById('BossDefendButton').addEventListener('click', (e) => {
        if (waitForPressResolve){
            waitForPressResolve();
            choiceBossDefend = true;
        } 
    });

    let inBattle = false;
    let battle = async function(mon){
        document.removeEventListener('keydown', keyDownFunction);
        document.removeEventListener('keyup', keyUpFunction);
        document.getElementById('GameButtons').style.display = 'none';

        let fleed = false;

        while(true){
            infoElem.innerHTML = `The wild ${mon.name} attacks!`;
            await sleep(750);
            infoElem.innerHTML += `\nThe ${mon.name} does ${player.takeDamage(mon.fight())} damage!`;
            await sleep(750);
            if(player.isDead()){
                infoElem.innerHTML += `\nYOU DIED!`;
                await sleep(1500);
                document.getElementById('Game').style.display = 'none';
                document.getElementById('GameOverScreen').style.display = 'block';
                return;
            }

            infoElem.innerHTML += `\nYou're at ${player.hp} HP. What do you do?`;
            document.getElementById('BattleButtons').style.display = 'flex';
            await waitForPress();
            document.getElementById('BattleButtons').style.display = 'none';
            if(choiceAttack){
                choiceAttack = false;
                infoElem.innerHTML = 'You attack!'
                await sleep(750);
                infoElem.innerHTML += `\nThe ${mon.name} takes ${mon.takeDamage(player.fight())} damage!`;
                await sleep(750);
                if(mon.isDead()){
                    infoElem.innerHTML += `\nYou have bested the ${mon.name}!`;
                    await sleep(750);
                    infoElem.innerHTML += `\nYou gained ${mon.exp} exp!`;
                    await sleep(750);
                    if(player.gainExp(mon.exp)){
                        infoElem.innerHTML += `\nYou leveled up to LV ${player.lvl}!`;
                        await sleep(1250);
                    }
                    break;
                }
                infoElem.innerHTML += `\nThe ${mon.name} has ${mon.hp} HP left!`;
                await sleep(1250);
            }else if(choiceFlee){
                choiceFlee = false;
                let rnd = Math.floor(Math.random() * 10);
                let chance = 9 - (mon.spd - player.spd);
                if(chance > rnd){
                    fleed = true;
                    infoElem.innerHTML = 'You succesfully ran away!';
                    await sleep(1250);
                    break;
                }else{
                    infoElem.innerHTML = "You couldn't run away!";
                    await sleep(1250);
                }
            }
        }

        if(!fleed){
            fleed = false;
            let drop = Math.floor(Math.random() * 10);
            switch(mon.name){
                case 'Wolf':
                    if(drop <= 4 && player.addInventory(new Claw())){
                        infoElem.innerHTML += `\nThe ${mon.name} dropped a claw!`;
                        await sleep(1250);
                    }
                    break;
                case 'Bear':
                    if(drop <= 2 && player.addInventory(new Pelt())){
                        infoElem.innerHTML += `\nThe ${mon.name} dropped a pelt!`;
                        await sleep(1250);
                    }
                    break;
                case 'Snake':
                    if(drop <= 2 && player.addInventory(new Scale())){
                        infoElem.innerHTML += `\nThe ${mon.name} dropped a scale!`;
                        await sleep(1250);
                    }
                    break;
            }
        }

        inBattle = false;
        document.addEventListener('keydown', keyDownFunction);
        document.addEventListener('keyup', keyUpFunction);
        document.getElementById('GameButtons').style.display = 'flex';
    };

    let encounterChance = async function(){
        let rnd = Math.floor(Math.random() * 10);
        if(map.currentTile == 'Forest' && rnd <= 1){
            inBattle = true; isKeyDown = false;
            let rndWoB = Math.floor(Math.random() * 10);
            if(rndWoB <= 6){
                await battle(new Wolf());
            }else{
                await battle(new Bear());
            }
        }else if(map.currentTile == 'Desert' && rnd <= 1){
            inBattle = true; isKeyDown = false;
            await battle(new Snake());
        }
    };

    let bossFight = async function(mon){
        infoElem.innerHTML = "You wander through the pitch black cave, running your hands on the nearby wall for support."
        await sleep(2500);
        infoElem.innerHTML += "\nSuddenly..."
        await sleep(1000);
        infoElem.innerHTML += "\nBOOM: A giant pillar of light erupts in front of you, revealing a floating mask. It flashes a wicked smile..."
        await sleep(3000);

        let defending = false; let charging = false;
        while(true){
            defending = false;
            infoElem.innerHTML += `\nYou're at ${player.hp} HP. What do you do?`;
            document.getElementById('BossButtons').style.display = 'flex';
            await waitForPress();
            document.getElementById('BossButtons').style.display = 'none';

            if(choiceBossAttack){
                choiceBossAttack = false;
                infoElem.innerHTML = 'You attack!'
                await sleep(750);
                infoElem.innerHTML += `\nThe Floating Mask takes ${mon.takeDamage(player.fight())} damage!`;
                await sleep(750);
                if(mon.isDead()){
                    infoElem.innerHTML += '\nWith one last blow, The Floating Mask crumbles to the floor, revealing a bright light behind it.';
                    await sleep(3000);
                    infoElem.innerHTML += '\nYou walk towards it...and emerge on a remote island. Your once ravaged ship has been rebuilt. You can now go home!';
                    await sleep(3000);
                    infoElem.innerHTML += '\n\n\nCreated By: Jesse White';
                    await sleep(5000);
                    document.getElementById('Game').style.display = 'none';
                    document.getElementById('WinnerScreen').style.display = 'block';
                    return;
                }
                infoElem.innerHTML += `\nThe Floating Mask has ${mon.hp} HP left!`;
                await sleep(1250);
            }else if(choiceBossDefend){
                choiceBossDefend = false;
                if(player.noShield){
                    infoElem.innerHTML = 'You have nothing to defend with, but nevertheless, brace for the upcoming attack!';
                    await sleep(2000);
                }else{
                    defending = true;
                    infoElem.innerHTML = 'You raise your shield and brace for the upcoming attack!'
                    await sleep(2000);
                }
            }

            if(charging){
                charging = false;
                infoElem.innerHTML = 'The Floating Mask unleashes a beam of energy!'
                await sleep(1500);
                if(defending){
                    infoElem.innerHTML += '\nYou deflect the beam back at The Floating Mask with the shield!'
                    await sleep(1250);
                    infoElem.innerHTML += `\nThe Floating Mask takes ${mon.takeDamage(75)} damage!`;
                    await sleep(1250);
                    if(mon.isDead()){
                        infoElem.innerHTML = 'With one last blow, The Floating Mask crumbles to the floor, revealing a bright light behind it.';
                        await sleep(3000);
                        infoElem.innerHTML += '\nYou walk towards it...and emerge on a remote island. Your once ravaged ship has been rebuilt. You can now go home!';
                        await sleep(3000);
                        infoElem.innerHTML += '\n\n\nCreated By: Jesse White';
                        await sleep(5000);
                        document.getElementById('Game').style.display = 'none';
                        document.getElementById('WinnerScreen').style.display = 'block';
                        return;
                    }
                    infoElem.innerHTML += `\nThe Floating Mask has ${mon.hp} HP left!`;
                    await sleep(1250);
                    continue;
                }else{
                    infoElem.innerHTML += `\nThe Floating Mask does ${player.takeDamage(75)} damage!`
                    await sleep(1250);
                    if(player.isDead()){
                        infoElem.innerHTML += `\nYOU DIED!`;
                        await sleep(3000);
                        document.getElementById('Game').style.display = 'none';
                        document.getElementById('GameOverScreen').style.display = 'block';
                        return;
                    }else{
                        continue;
                    }
                }
            }
            
            if(Math.floor(Math.random() * 100) <= 29 && !charging){
                charging = true;
                infoElem.innerHTML = `The Floating Mask is charging up`;
                await sleep(500);
                infoElem.innerHTML += '.'; await sleep(500);
                infoElem.innerHTML += '.'; await sleep(500);
                infoElem.innerHTML += '.'; await sleep(500);
                await sleep(1000);
            }else{
                infoElem.innerHTML = `The Floating Mask grins and attacks!`;
                await sleep(750);
                infoElem.innerHTML += `\nThe Floating Mask does ${player.takeDamage(mon.fight())} damage!`;
                await sleep(750);
            }

            if(player.isDead()){
                infoElem.innerHTML += `\nYOU DIED!`;
                await sleep(3000);
                document.getElementById('Game').style.display = 'none';
                document.getElementById('GameOverScreen').style.display = 'block';
                return;
            }
        }
    };

    let gameLoop = function(){
        map.draw(canvas, ctx);

        if(isInventoryButtonPressed){
            infoElem.innerHTML = player.displayInventory();
        }else if(isStatusButtonPressed){
            infoElem.innerHTML = player.status();
        }else if(enteredCave){
            infoElem.innerHTML += '';
        }else if(enteredInn){
            infoElem.innerHTML = "You have been healed to full health!";
        }else if(!inBattle){
            infoElem.innerHTML = 
            `Current Tile: ${map.currentTile}
            Use the arrow keys to move around.`;
        }
    };
    
    setInterval(gameLoop, 1000/60);
}

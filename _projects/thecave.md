---
layout: page
title: The Cave
description: What's in the dark cave? Traverse a hostile environment to find out!
img: assets/img/cave.jpg
importance: 0
category: Personal
---

<div id="StartupGame">
    <h2 id="StartupInfoText">
    Enter your character's name (3 - 10 characters).
    </h2>
    <input type="text" id="CharacterNameInput" />
</div>

<div id="GameOverScreen">
    <h2>GAME OVER!</h2>
</div>

<div id="WinnerScreen">
    <h2>Congratulations! You Won!</h2>
</div>

<div id="Game">
    <canvas id="MapCanvas"></canvas>
    <textarea id="InfoBox" cols="30" readonly></textarea>
</div>

<div class="ButtonDivClass" id="GameButtons">
    <button id="PlayerStatusButton">Status</button>
    <div class="divider"></div>
    <button id="InventoryButton">Inventory</button>
    <div class="divider"></div>
    <button id="EnterInnButton">Enter Inn</button>
    <div class="divider"></div>
    <button id="EnterCaveButton">Enter Cave</button>
</div>

<div class="ButtonDivClass" id="BattleButtons">
    <button id="AttackButton">Attack</button>
    <div class="divider"></div>
    <button id="FleeButton">Flee</button>
</div>

<div class="ButtonDivClass" id="BossButtons">
    <button id="BossAttackButton">Attack</button>
    <div class="divider"></div>
    <button id="BossDefendButton">Defend</button>
</div>

<div class="ButtonDivClass" id="BackButtonDiv">
    <button id="BackButton">Back</button>
</div>

<div class="ButtonDivClass" id="CraftableButtons">
    <button id="CraftSwordButton">Craft Sword</button>
    <div class="divider"></div>
    <button id="CraftShieldButton">Craft Shield</button>
    <div class="divider"></div>
    <button id="CraftBoatButton">Craft Boat</button>
</div>

<div class="ButtonDivClass" id="RemoveItemsDiv">
    <button id="RemoveClawButton">Remove Claw</button>
    <div class="divider"></div>
    <button id="RemovePeltButton">Remove Pelt</button>
    <div class="divider"></div>
    <button id="RemoveScaleButton">Remove Scale</button>
</div>
<div class="divider"></div>
<p class="thankyouwrap">
    <b id="ThankYou" style="display: none">
        Thank you to <a href="https://sondanielson.itch.io/gameboy-simple-rpg-tileset" target="_blank" rel="noopener noreferrer">sonDanielson</a> for the free pixel art!
    </b>
</p>

<style>
    h1{
        text-align: center;
    }

    .thankyouwrap {
        text-align: center;
    }

    #StartupGame {
        text-align: center;
    }

    #GameOverScreen {
        display: none;
        text-align: center;
    }

    #WinnerScreen {
        display: none;
        text-align: center;
    }

    #Game {
        display: none;
        justify-content: center;
    }
    canvas {
        padding-right: 10px;
    }
    textarea {
        white-space: pre-line;
        resize: none;
    }

    .ButtonDivClass {
        display: none;
        padding-top: 10px;
        justify-content: center;
    }
    button {
        background-color: grey;
        border: 2px solid black;
        color: white;
        padding: 8px 16px;
        text-align: center;
        font-size: 16px;
        border-radius: 8px;
    }
    button:hover {
        background-color: #FFFFFF;
        color: black;
    }
    button:active {
        background-color: rgb(85, 85, 85);
        border: 1px solid black;
    }

    .divider {
        width: 5px;
        height: auto;
        display: inline-block;
    }
</style>

<script type="module" src="./index.js"></script>

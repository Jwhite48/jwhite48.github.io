---
layout: page
title: 15 Puzzle Game
description: The pieces are all scrambled! Can you put them in order?
img: assets/img/puzzle.jpg
importance: 1
category: Personal
---

<canvas id="game"></canvas>
<br>
<p class="btnwrap">
    <button id="3puzzle">3 X 3</button>
    <button id="4puzzle">4 X 4</button> 
    <button id="5puzzle">5 X 5</button>
</p>
<h1 id="moves"></h1>
<h1 id="gameInfo">Use W | A | S | D to move!</h1>

<style>
    h1{
        justify-content: center;
        text-align: center;
    }
    .btnwrap {
        text-align: center;
    }
    #game{
        box-shadow: 10px 10px 15px black;
        padding-left: 0;
        padding-right: 0;
        margin-left: auto;
        margin-right: auto;
        display: block;
    }
    button{
        background-color: #555555;
        color: white;
        padding: 15px 32px;
        display: inline-block;
        margin: 4px 2px;
        cursor: pointer;
        border-radius: 12px;
        transition-duration: 0.2s;
    }
    button:hover {
        background-color: #FFFFFF;
        color: black;
    }
    button:active {
        background-color: #FFFFFF;
        box-shadow: 0 5px #666;
        -webkit-border-radius: 12px #666;
        -moz-border-radius: 12px #666;
        border-radius: 12px;
        transform: translateY(4px);
    }
</style>

<script src="./game.js" type=module></script>
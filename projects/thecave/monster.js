export function Monster(t){let n=t[0],o=t[1],e=t[2],r=t[3],a=t[4],f=t[5],i=t[6];this.fight=function(){let t=Math.floor(Math.random()*a+1);return o+t},this.takeDamage=function(t){let n=Math.floor(Math.random()*a+1);return t-(e+n)>0?(f-=t-(e+n),t-(e+n)):0},this.isDead=function(){return f<=0},Object.defineProperties(this,{name:{get:function(){return n}},att:{get:function(){return o},set:function(t){o=t}},def:{get:function(){return e},set:function(t){e=t}},spd:{get:function(){return r},set:function(t){r=t}},hp:{get:function(){return f},set:function(t){f=t}},exp:{get:function(){return i},set:function(t){i=t}}})};export function Bear(){Monster.call(this,["Bear",16,8,13,Math.floor(3*Math.random()+1),25,30+Math.floor(6*Math.random())])};export function Snake(){Monster.call(this,["Snake",18,5,15,Math.floor(3*Math.random()+1),15,20+Math.floor(6*Math.random())])};export function Wolf(){Monster.call(this,["Wolf",14,6,11,Math.floor(3*Math.random()+1),10,15+Math.floor(6*Math.random())])};export function Boss(){Monster.call(this,["Anon",25,15,25,1,100,0])};
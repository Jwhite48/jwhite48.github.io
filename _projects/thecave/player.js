import { Monster } from './monster.js';

export function Player(n){
    Monster.call(this, [n, 10, 10, 10, Math.floor(Math.random() * 4 + 1), 75, 0]);
    let topHp = 75, lvl = 1, inv = [], noSword = true, noShield = true, noBoat = true;

    this.status = function(){
        let txt = `Name: ${this.name}
                  Att: ${this.att}
                  Def: ${this.def}
                  Spd: ${this.spd}
                  Hp: ${this.hp}
                  Lvl: ${lvl}
                  Equipment: `;
        if(!noSword) txt += 'Sword, ';
        if(!noShield) txt += 'Shield, ';
        if(!noBoat) txt += 'Boat, ';
        if(noSword && noShield && noBoat) txt += 'None';
        txt = txt.replace(/,\s*$/, '');

        return txt;
    }
    this.gainExp = function(e){
        if(lvl == 5) return false;

        this.exp += e;
        if(this.exp >= Math.floor(30 * Math.pow(lvl + 1, 1.1))){
            lvl++; this.exp = 0;
            topHp += 5 * Math.floor(Math.random() * 2 + 1); this.hp = topHp;
            let rnd = Math.floor(Math.random() * 3);
            if(rnd == 0) {this.att += 2; this.def++; this.spd++;}
            else if(rnd == 1) {this.att++; this.def += 2; this.spd++;}
            else if(rnd == 2) {this.att++; this.def++; this.spd += 2;}
            return true;
        }

        return false;
    }
    this.addInventory = function(a){
        let total = 0;
        for (const elem of inv){
            total += elem.weight;
        }
        if(a.weight + total <= 60){
            inv.push(a);
            return true;
        }

        return false;
    }
    this.removeInventory = function(n){
        n = n.charAt(0).toUpperCase() + n.substring(1).toLowerCase();
        for(let i = 0; i < inv.length; i++){
            if(inv[i].name == n){
                inv.splice(i, 1);
                break;
            }
        }
    }
    this.displayInventory = function(){
        if(inv.length == 0) return 'There are no items in your pack.';
        
        let claw = 0, scale = 0, pelt = 0, totalWeight = 0;
        for(const elem of inv){
            totalWeight += elem.weight;
            if(elem.name == 'Claw') claw++;
            else if(elem.name == 'Scale') scale++;
            else if(elem.name == 'Pelt') pelt++;
        }

        let ret = `Claws: ${claw}x\nPelts: ${pelt}x\nScales: ${scale}x\n`;
        ret += `(MAX 60) Total Weight: ${totalWeight}\n`
        return ret;
    }
    this.craftable = function(items){
        let claws = 0, pelts = 0, scales = 0;
        for (const elem of inv){
            if(elem.name == 'Claw') claws++;
            else if(elem.name == 'Pelt') pelts++;
            else if(elem.name == 'Scale') scales++;
        }

        if(noSword && items.claws == 2 && items.pelts == 1 && claws >= 2 && pelts >= 1){
            this.removeInventory('Claw'); this.removeInventory('Claw'); this.removeInventory('Pelt');
            this.att += 2;
            noSword = false;
        }else if(noShield && items.scales == 2 && items.pelts == 1 && scales >= 2 && pelts >= 1){
            this.removeInventory('Scale'); this.removeInventory('Scale'); this.removeInventory('Pelt');
            noShield = false;
        }else if(noBoat && items.pelts == 3 && pelts >= 3){
            this.removeInventory('Pelt'); this.removeInventory('Pelt'); this.removeInventory('Pelt');
            noBoat = false;
        }
    }
    this.heal = function(){
        this.hp = topHp;
    }

    Object.defineProperties(this, {
        topHp: {
            set: function(val) { topHp = val; }
        },
        lvl: {
            get: function() { return lvl; },
            set: function(val) { lvl = val; }
        },
        inv: {
            get: function() { return inv; }
        },
        noSword: {
            get: function() { return noSword; },
            set: function(val) { noSword = val; }
        },
        noShield: {
            get: function() { return noShield; },
            set: function(val) { noShield = val; }
        },
        noBoat: {
            get: function() { return noBoat; },
            set: function(val) { noBoat = val; }
        }
    });
}

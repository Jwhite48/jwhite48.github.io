export function Monster(arr){
    let name = arr[0];
    let att = arr[1];
    let def = arr[2];
    let spd = arr[3];
    let luck = arr[4];
    let hp = arr[5];
    let exp = arr[6];

    this.fight = function(){
        let rnd = Math.floor(Math.random() * luck + 1);
        return att + rnd;
    };
    this.takeDamage = function(a){
        let rnd = Math.floor(Math.random() * luck + 1);
        if(a - (def + rnd) > 0){
            hp -= a - (def + rnd);
            return a - (def + rnd);
        }

        return 0;
    };
    this.isDead = function(){
        return hp <= 0;
    }

    Object.defineProperties(this, {
        name: {
            get: function(){ return name; }
        },
        att: {
            get: function() { return att; },
            set: function(val) { att = val; }
        },
        def: {
            get: function() { return def; },
            set: function(val) { def = val; }
        },
        spd: {
            get: function(){ return spd; },
            set: function(val) { spd = val; }
        },
        hp: {
            get: function(){ return hp; },
            set: function(val){ hp = val; }
        },
        exp: {
            get: function(){ return exp; },
            set: function(val){ exp = val; }
        }
    });
}

export function Bear(){
    Monster.call(this, ['Bear', 16, 8, 13, Math.floor(Math.random() * 3 + 1), 25, 30 + Math.floor(Math.random() * 6)]);
}

export function Snake(){
    Monster.call(this, ['Snake', 18, 5, 15, Math.floor(Math.random() * 3 + 1), 15, 20 + Math.floor(Math.random() * 6)]);
}

export function Wolf(){
    Monster.call(this, ['Wolf', 14, 6, 11, Math.floor(Math.random() * 3 + 1), 10, 15 + Math.floor(Math.random() * 6)]);
}

export function Boss(){
    Monster.call(this, ['Anon', 25, 15, 25, 1, 100, 0]);
}

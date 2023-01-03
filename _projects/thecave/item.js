function Item(arr){
    let name = arr[0];
    let weight = arr[1];

    Object.defineProperties(this, {
        name: {
            get: function(){ return name; }
        },
        weight: {
            get: function(){ return weight; }
        }
    });
}

export function Pelt(){
    Item.call(this, ['Pelt', 20]);
}

export function Scale(){
    Item.call(this, ['Scale', 3]);
}

export function Claw(){
    Item.call(this, ['Claw', 5]);
}

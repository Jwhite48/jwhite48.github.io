export function Map(ts) {
    const tileSize = ts;
    const m = [
        ["C","^","&","&","~","&","&","^","^"],
        ["~","^","&","~","~","~","&","I","^"],
        ["~","^","&","&","~","~","&","^","^"],
        ["~","~","&","&","&","&","&","&","&"],
        ["&","&","&","&","&","&","&","&","&"],
        ["&","&","&","&","&","&","&","&","&"],
        ["&","&","&","_","_","&","&","&","~"],
        ["&","_","_","_","_","&","&","~","~"],
        ["_","_","_","&","&","&","~","~","~"]
    ];
    let row = 4, col = 4, currentTile = 'Forest';

    Object.defineProperties(this, {
        currentTile: {
            get: function(){ return currentTile; }
        },
    });

    let image = function(fileName){
        const img = new Image();
        img.src = `tiles/${fileName}`;
        return img;
    };
    const forestTile = image('forest.png'), desertTile = image('desert.png'),
    caveTile = image('cave.png'), innTile = image('inn.png'), 
    waterTile = image('water.png'), boulderTile = image('boulder.png'),
    playerTile = image('player.png');

    let setCanvasSize = function(canvas){
        canvas.height = m.length * tileSize;
        canvas.width = m[0].length * tileSize;
    };
    let clearCanvas = function(canvas, ctx){
        ctx.fillStyle = 'green';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    let drawMap = function(ctx){
        for(let i = 0; i < m.length; i++){
            for(let j = 0; j< m[i].length; j++){
                let img = null;
                switch (m[i][j]){
                    case '&': img = forestTile; break;
                    case '_': img = desertTile; break;
                    case 'I': img = innTile; break;
                    case 'C': img = caveTile; break;
                    case '~': img = waterTile; break;
                    case '^': img = boulderTile; break;
                }
                if (img != null) ctx.drawImage(img, j * tileSize, i * tileSize, tileSize, tileSize);

                if(row == i && col == j){
                    ctx.drawImage(playerTile, j * tileSize + tileSize/4, i * tileSize + tileSize/4, tileSize/2, tileSize/2);
                } 
            }
        }
    };

    this.draw = function(canvas, ctx){
        setCanvasSize(canvas);
        clearCanvas(canvas, ctx);
        drawMap(ctx);
    };

    this.playerMovement = function(move, player){
        if(move == 1){
            if(row - 1 < 0) return false;
            else if((player.noBoat && m[row-1][col] == '~') || m[row-1][col] == '^') return false;
            row -= 1;
        }else if(move == 2){
            if(row + 1 == m.length) return false;
            else if((player.noBoat && m[row+1][col] == '~') || m[row+1][col] == '^') return false;
            row += 1;
        }else if(move == 3){
            if(col + 1 == m[0].length) return false;
            else if((player.noBoat && m[row][col+1] == '~') || m[row][col+1] == '^') return false;
            col += 1;
        }else {
            if(col - 1 < 0) return false;
            else if((player.noBoat && m[row][col-1] == '~') || m[row][col-1] == '^') return false;
            col -= 1;
        }

        switch(m[row][col]){
            case '&': currentTile = 'Forest'; break;
            case '_': currentTile = 'Desert'; break;
            case 'I': currentTile = 'Inn'; break;
            case 'C': currentTile = 'Cave'; break;
            case '~': currentTile = 'Water'; break;
        }

        return true;
    }
}
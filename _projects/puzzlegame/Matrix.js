export default class Matrix {
    constructor(pieceSize) {
        this.pieceSize = pieceSize;
        this.piece1 = this.image("1.jpg"); this.piece2 = this.image("2.jpg"); this.piece3 = this.image("3.jpg");
        this.piece4 = this.image("4.jpg"); this.piece5 = this.image("5.jpg"); this.piece6 = this.image("6.jpg");
        this.piece7 = this.image("7.jpg"); this.piece8 = this.image("8.jpg"); this.piece9 = this.image("9.jpg");
        this.piece10 = this.image("10.jpg"); this.piece11 = this.image("11.jpg"); this.piece12 = this.image("12.jpg");
        this.piece13 = this.image("13.jpg"); this.piece14 = this.image("14.jpg"); this.piece15 = this.image("15.jpg");
        this.piece16 = this.image("16.jpg"); this.piece17 = this.image("17.jpg"); this.piece18 = this.image("18.jpg");
        this.piece19 = this.image("19.jpg"); this.piece20 = this.image("20.jpg"); this.piece21 = this.image("21.jpg");
        this.piece22 = this.image("22.jpg"); this.piece23 = this.image("23.jpg"); this.piece24 = this.image("24.jpg");
        this.matrix; this.win; this.moves;
        
        this.setup(4);
    }

    image(fileName) {
        const img = new Image();
        img.src = `pieces/${fileName}`;
        return img;
    }

    setup(dim) {
        let arr = Array.from(Array(dim * dim).keys());
        do {
            arr = this.shuffle(arr);
        } while (!this.checkSolvability(arr, dim));

        const pieces = [];
        while (arr.length) pieces.push(arr.splice(0, dim));
        this.matrix = pieces;
        this.moves = 0; this.win = false;
    }

    shuffle(arr) {
        var a = arr.length, b, c;
        while (a) {
            c = Math.floor(Math.random() * a--);
            b = arr[a];
            arr[a] = arr[c];
            arr[c] = b;
        }
        return arr;
    }

    checkSolvability(arr, dim) {
        let inversions = 0;
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = i + 1; j < arr.length; j++) {
                if (arr[i] && arr[j] && arr[i] > arr[j]) inversions++;
            }
        }

        if (dim % 2 == 0) {
            let x = 0;
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] == 0) {
                    if (i >= 4 && i < 8) x = 1;
                    else if (i < 12) x = 2;
                    else if (i < 16) x = 3;
                    break;
                }
            }
            if ((x == 2 || x == 0) && !(inversions % 2 == 0)) return true;
            else if ((x == 3 || x == 1) && (inversions % 2 == 0)) return true;
        } else {
            if (inversions % 2 == 0) return true;
        }

        return false;
    }

    draw(canvas, ctx) {
        this.setCanvasSize(canvas);
        this.clearCanvas(canvas, ctx);
        this.drawBoard(ctx);
    }

    setCanvasSize(canvas) {
        canvas.height = this.matrix.length * this.pieceSize;
        canvas.width = this.matrix[0].length * this.pieceSize;
    }

    clearCanvas(canvas, ctx) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    drawBoard(ctx) {
        for (let row = 0; row < this.matrix.length; row++) {
            for (let col = 0; col < this.matrix[row].length; col++) {
                const piece = this.matrix[row][col];
                let image = null;
                switch (piece) {
                    case 1: image = this.piece1; break;
                    case 2: image = this.piece2; break;
                    case 3: image = this.piece3; break;
                    case 4: image = this.piece4; break;
                    case 5: image = this.piece5; break;
                    case 6: image = this.piece6; break;
                    case 7: image = this.piece7; break;
                    case 8: image = this.piece8; break;
                    case 9: image = this.piece9; break;
                    case 10: image = this.piece10; break;
                    case 11: image = this.piece11; break;
                    case 12: image = this.piece12; break;
                    case 13: image = this.piece13; break;
                    case 14: image = this.piece14; break;
                    case 15: image = this.piece15; break;
                    case 16: image = this.piece16; break;
                    case 17: image = this.piece17; break;
                    case 18: image = this.piece18; break;
                    case 19: image = this.piece19; break;
                    case 20: image = this.piece20; break;
                    case 21: image = this.piece21; break;
                    case 22: image = this.piece22; break;
                    case 23: image = this.piece23; break;
                    case 24: image = this.piece24; break;
                }
                if (image != null) ctx.drawImage(image, col * this.pieceSize, row * this.pieceSize, this.pieceSize, this.pieceSize);
            }
        }
    }

    move(key) {
        var r = 0, c = 0;
        for (let i = 0; i < this.matrix.length; i++) {
            for (let j = 0; j < this.matrix[i].length; j++) {
                if (this.matrix[i][j] == 0) {
                    r = i, c = j; 
                    break;
                }
            }
        }

        if (key == "w" && r != this.matrix.length - 1) {
            this.matrix[r][c] = this.matrix[r+1][c];
            this.matrix[r+1][c] = 0;
            this.moves++;
        } else if (key == "a" && c != this.matrix[0].length - 1) {
            this.matrix[r][c] = this.matrix[r][c+1];
            this.matrix[r][c+1] = 0;
            this.moves++;
        } else if (key == "s" && r != 0) {
            this.matrix[r][c] = this.matrix[r-1][c];
            this.matrix[r-1][c] = 0;
            this.moves++;
        } else if (key == "d" && c != 0){
            this.matrix[r][c] = this.matrix[r][c-1];
            this.matrix[r][c-1] = 0;
            this.moves++;
        }

        if(this.matrix[this.matrix.length-1][this.matrix.length-1]==0) this.winCond();
    }

    winCond(){
        var num = 1;
        for(let i=0; i<this.matrix.length; i++){
            for(let j=0; j<this.matrix[i].length; j++){
                if(i==this.matrix.length-1&&j==this.matrix.length-1) num = 0;
                if(this.matrix[i][j]!=num) return;
                num++;
            }
        }
        this.win = true;
    }
}
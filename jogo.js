console.log('Flappy Bird');

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

const background = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    posX: 0,
    posY: canvas.height - 204,

    desenha() {
        contexto.fillStyle = '#70C5CE';
        contexto.fillRect(0, 0, canvas.width, canvas.height)

        contexto.drawImage(
            sprites,
            background.spriteX, background.spriteY,   // Sprite X, Sprite Y - dentro do arquivo
            background.largura, background.altura,  // Tamanho do recorte na sprite
            background.posX, background.posY,   // Cordenadas x, y dentro do canvas
            background.largura, background.altura  // Tamanho no canvas
        );
        contexto.drawImage(
            sprites,
            background.spriteX, background.spriteY,   // Sprite X, Sprite Y - dentro do arquivo
            background.largura, background.altura,  // Tamanho do recorte na sprite
            (background.posX + background.largura), background.posY,   // Cordenadas x, y dentro do canvas
            background.largura, background.altura  // Tamanho no canvas
        );
    }
}

const solo = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    posX: 0,
    posY: canvas.height - 112,

    desenha() {
        contexto.drawImage(
            sprites,
            solo.spriteX, solo.spriteY,   // Sprite X, Sprite Y - dentro do arquivo
            solo.largura, solo.altura,  // Tamanho do recorte na sprite
            solo.posX, solo.posY,   // Cordenadas x, y dentro do canvas
            solo.largura, solo.altura  // Tamanho no canvas
        );
        contexto.drawImage(
            sprites,
            solo.spriteX, solo.spriteY,   // Sprite X, Sprite Y - dentro do arquivo
            solo.largura, solo.altura,  // Tamanho do recorte na sprite
            (solo.posX + solo.largura), solo.posY,   // Cordenadas x, y dentro do canvas
            solo.largura, solo.altura  // Tamanho no canvas
        );
    }
}

const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    posX: 10,
    posY:50,

    desenha() {
        contexto.drawImage(
            sprites,
            flappyBird.spriteX, flappyBird.spriteY,   // Sprite X, Sprite Y - dentro do arquivo
            flappyBird.largura, flappyBird.altura,  // Tamanho do recorte na sprite
            flappyBird.posX, flappyBird.posY,   // Cordenadas x, y dentro do canvas
            flappyBird.largura, flappyBird.altura  // Tamanho no canvas
        );
    }
}


function loop() {
    background.desenha();
    solo.desenha();
    flappyBird.desenha();

    // flappyBird.posY = flappyBird.posY + 1

    requestAnimationFrame(loop);
}

loop();

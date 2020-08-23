console.log('Flappy Bird');

const som_HIT = new Audio();
som_HIT.src = './efeitos/hit.wav'

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

function fazColisao(flappyBird, solo) {
    const flappyBirdY = flappyBird.posY + flappyBird.altura;
    const soloY = solo.posY;

    if (flappyBirdY >= soloY) {
        return true;
    }
    return false;
}

function criaFlappyBird() {
    const flappyBird = {
        spriteX: 0,
        spriteY: 0,
        largura: 33,
        altura: 24,
        posX: 10,
        posY: 50,
        pulo: 4.6,
        
        pula() {
            flappyBird.velocidade = - flappyBird.pulo;
        },
    
        gravidade: 0.25,
        velocidade: 0,
    
        atualiza() {
            if (fazColisao(flappyBird, solo)){
                som_HIT.play()

                setTimeout(() => {
                    mudaTela(Telas.INICIO)
                }, 500)
            }
    
            flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade
            flappyBird.posY = flappyBird.posY + flappyBird.velocidade
        },
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

    return flappyBird;
}

const messageGetReady = {
    spriteX: 134,
    spriteY: 0,
    largura: 174,
    altura: 152,
    posX: (canvas.width / 2) - 174 / 2,
    posY:50,
    
    desenha() {
        contexto.drawImage(
            sprites,
            messageGetReady.spriteX, messageGetReady.spriteY,   // Sprite X, Sprite Y - dentro do arquivo
            messageGetReady.largura, messageGetReady.altura,  // Tamanho do recorte na sprite
            messageGetReady.posX, messageGetReady.posY,   // Cordenadas x, y dentro do canvas
            messageGetReady.largura, messageGetReady.altura  // Tamanho no canvas
        );
    }
}

//
//  Telas
//

const globais = {};
let telaAtiva = {};

function mudaTela(novaTela) {
    telaAtiva = novaTela;

    if (telaAtiva.inicializa) {
        telaAtiva.inicializa();
    }
};

const Telas = {
    INICIO: {
        inicializa() {
            globais.flappyBird = criaFlappyBird();
        },
        desenha() {
            background.desenha();
            solo.desenha();
            globais.flappyBird.desenha();
            messageGetReady.desenha();
        },
        click() {
            mudaTela(Telas.JOGO)
        },
        atualiza() {

        }
    },

    JOGO: {
        desenha() {
            background.desenha();
            solo.desenha();
            globais.flappyBird.desenha();
        },
        click() {
            globais.flappyBird.pula();
        },
        atualiza(){
            globais.flappyBird.atualiza();
        }
    }
};

function loop() {
    telaAtiva.desenha();
    telaAtiva.atualiza();

    requestAnimationFrame(loop);

}

window.addEventListener('click', function(){
    if(telaAtiva.click){
        telaAtiva.click();
    }
});

mudaTela(Telas.INICIO)
loop();

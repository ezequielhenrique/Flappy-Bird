console.log('Flappy Bird');

let frames = 0;
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

function criaSolo() {
    const solo = {
        spriteX: 0,
        spriteY: 610,
        largura: 224,
        altura: 112,
        posX: 0,
        posY: canvas.height - 112,
        atualiza() {
            const movimentoDoSolo = 1;
            const repeteEm = solo.largura / 2;
            const movimentacao = solo.posX - movimentoDoSolo;
            solo.posX = solo.posX - movimentoDoSolo;
            // console.log('[solo.posX]', solo.posX);
            // console.log('[repeteEm]',repeteEm);
            // console.log('[movimentacao]', movimentacao % repeteEm);
            
            solo.posX = movimentacao % repeteEm;
        },
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
    return solo;
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
        pulo: 4.0,
        
        pula() {
            flappyBird.velocidade = - flappyBird.pulo;
        },
    
        gravidade: 0.20,
        velocidade: 0,
    
        atualiza() {
            if (fazColisao(flappyBird, globais.solo)){
                som_HIT.play()
                mudaTela(Telas.GAME_OVER)
            }
    
            flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade
            flappyBird.posY = flappyBird.posY + flappyBird.velocidade
        },
        movimentos: [
            {spriteX: 0, spriteY: 0, }, // Asa para cima
            {spriteX: 0, spriteY: 26, }, // Asa no meio
            {spriteX: 0, spriteY: 52, }, // Asa para baixo
        ],
        frameAtual: 0,
        atualizaFrameAtual() {
            const intervaloDeFrames = 10;
            const passouOIntervalo = frames % intervaloDeFrames === 0;

            if (passouOIntervalo) {
                const baseDoIncremento = 1;
                const incremento = baseDoIncremento + flappyBird.frameAtual;
                const baseRepeticao = flappyBird.movimentos.length
                flappyBird.frameAtual = incremento % baseRepeticao;
            }
        },
        desenha() {
            flappyBird.atualizaFrameAtual();
            const {spriteX, spriteY} = flappyBird.movimentos[flappyBird.frameAtual]
            contexto.drawImage(
                sprites,
                spriteX, spriteY,   // Sprite X, Sprite Y - dentro do arquivo
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

// Mensagem Game Over

const mensagemGameOver = {
    spriteX: 134,
    spriteY: 153,
    largura: 226,
    altura: 200,
    posX: (canvas.width / 2) - 226 / 2,
    posY:50,
    
    desenha() {
        contexto.drawImage(
            sprites,
            mensagemGameOver.spriteX, mensagemGameOver.spriteY,   // Sprite X, Sprite Y - dentro do arquivo
            mensagemGameOver.largura, mensagemGameOver.altura,  // Tamanho do recorte na sprite
            mensagemGameOver.posX, mensagemGameOver.posY,   // Cordenadas x, y dentro do canvas
            mensagemGameOver.largura, mensagemGameOver.altura  // Tamanho no canvas
        );
    }
}

function criaCanos() {
    const canos = {
        largura: 52,
        altura: 400,
        chao: {
            spriteX: 0,
            spriteY: 169,
        },
        ceu: {
            spriteX: 52,
            spriteY: 169,
        },
        espaco: 80,
        desenha() {
            canos.pares.forEach(function(par) {
                const yRandom = par.y;
                const espacamentoCanos = 90;

                const canoCeuX = par.x;
                const canoCeuY = yRandom;
                contexto.drawImage(
                    sprites,
                    canos.ceu.spriteX, canos.ceu.spriteY,
                    canos.largura, canos.altura,
                    canoCeuX, canoCeuY,
                    canos.largura, canos.altura,
                )

                const canoChaoX = par.x;
                const canoChaoY = canos.altura + espacamentoCanos + yRandom;
                contexto.drawImage(
                    sprites,
                    canos.chao.spriteX, canos.chao.spriteY,
                    canos.largura, canos.altura,
                    canoChaoX, canoChaoY,
                    canos.largura, canos.altura,
                )

                par.canoCeu = {
                    x: canoCeuX,
                    y: canos.altura + canoCeuY,
                },
                par.canoChao = {
                    x: canoChaoX,
                    y: canoChaoY,
                }
            })
        },
        temColisao(par) {
            const topoFlappy = globais.flappyBird.posY;
            const baseFlappy = globais.flappyBird.posY + globais.flappyBird.altura;

            if ((globais.flappyBird.posX + globais.flappyBird.largura-10) >= par.x) {
                if (topoFlappy <= par.canoCeu.y) {
                    return true;
                }
                if (baseFlappy >= par.canoChao.y) {
                    return true;
                }
            }
        },
        pares: [],
        atualiza () {
            const passou100Frames = frames % 100 === 0;
            if (passou100Frames) {
                canos.pares.push({
                    x: canvas.width,
                    y: -150 * (Math.random() + 1),
                });
            }

            canos.pares.forEach(function(par) {
                par.x = par.x - 2;

                if (canos.temColisao(par)) {
                    som_HIT.play();
                    mudaTela(Telas.GAME_OVER);
                }

                if(par.x + canos.largura <= 0) {
                    canos.pares.shift();
                }
            });
        },
    }
    return canos;
}

function criaPlacar() {
    const placar = {
        pontuacao: 0,
        desenha() {
            contexto.font = '15px "Press Start 2P"';
            contexto.textAlign = 'right';
            contexto.fillStyle = 'white';
            contexto.fillText(`${placar.pontuacao}`, canvas.width-10, 35);
        },
        atualiza() {
            const intervaloDeFrames = 10;
            const passouOIntervalo = frames % intervaloDeFrames === 0;

            if(passouOIntervalo) {
                placar.pontuacao = placar.pontuacao + 1;
            }
        }
    }
    return placar;
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
            globais.solo = criaSolo();
            globais.canos = criaCanos();
        },
        desenha() {
            background.desenha();
            globais.flappyBird.desenha();
            globais.solo.desenha();
            messageGetReady.desenha();
        },
        click() {
            mudaTela(Telas.JOGO);
        },
        atualiza() {
            globais.solo.atualiza();
        }
    },

    JOGO: {
        inicializa() {
            globais.placar = criaPlacar();
        },
        desenha() {
            background.desenha();
            globais.canos.desenha();
            globais.solo.desenha();
            globais.flappyBird.desenha();
            globais.placar.desenha();
        },
        click() {
            globais.flappyBird.pula();
        },
        atualiza(){
            globais.flappyBird.atualiza();
            globais.canos.atualiza();
            globais.solo.atualiza();
            globais.placar.atualiza();
        }
    }
};

Telas.GAME_OVER = {
    desenha() {
        mensagemGameOver.desenha();
    },
    atualiza() {

    },
    click() {
        mudaTela(Telas.INICIO);
    }
};

function loop() {
    telaAtiva.desenha();
    telaAtiva.atualiza();

    frames += 1;

    requestAnimationFrame(loop);
}

window.addEventListener('click', function(){
    if(telaAtiva.click){
        telaAtiva.click();
    }
});

mudaTela(Telas.INICIO)
loop();

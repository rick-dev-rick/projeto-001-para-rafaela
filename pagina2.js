/* =========================================================
   PROJETO #001
   PARA RAFAELA ❤️

   Jardim de flores luminosas
   Canvas + JavaScript
========================================================= */


const canvas = document.getElementById("jardimCanvas");

const ctx = canvas.getContext("2d");


/* =========================================================
   CONFIGURAÇÃO
========================================================= */

let largura = 0;
let altura = 0;

let flores = [];

let tempo = 0;


/* =========================================================
   AJUSTA O CANVAS
========================================================= */

function ajustarCanvas() {

    const dpr = Math.min(
        window.devicePixelRatio || 1,
        2
    );

    largura = canvas.clientWidth;

    altura = canvas.clientHeight;

    canvas.width = largura * dpr;

    canvas.height = altura * dpr;

    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );
}


/* =========================================================
   FUNÇÃO ALEATÓRIA
========================================================= */

function aleatorio(min, max) {

    return Math.random() * (max - min) + min;
}


/* =========================================================
   CRIA UMA FLOR
========================================================= */

function criarFlor(
    x,
    baseY,
    tamanho,
    atraso,
    inclinacao
) {

    return {

        x: x,

        baseY: baseY,

        tamanho: tamanho,

        atraso: atraso,

        inclinacao: inclinacao,

        crescimento: 0,

        brilho: aleatorio(0.75, 1.15),

        fase: aleatorio(0, Math.PI * 2),

        folhas: Math.floor(
            aleatorio(3, 6)
        )
    };
}


/* =========================================================
   CRIA O JARDIM
========================================================= */

function criarJardim() {

    flores = [];

    /*
       Flores do fundo
    */

    const floresFundo = 7;


    for (let i = 0; i < floresFundo; i++) {

        const x = aleatorio(
            20,
            largura - 20
        );

        const tamanho = aleatorio(
            0.32,
            0.55
        );

        flores.push(
            criarFlor(
                x,
                altura - aleatorio(10, 45),
                tamanho,
                i * 0.25,
                aleatorio(-0.20, 0.20)
            )
        );
    }


    /*
       Flores intermediárias
    */

    const floresMeio = 5;


    for (let i = 0; i < floresMeio; i++) {

        const x = aleatorio(
            20,
            largura - 20
        );

        const tamanho = aleatorio(
            0.52,
            0.75
        );

        flores.push(
            criarFlor(
                x,
                altura - aleatorio(5, 25),
                tamanho,
                1.2 + i * 0.35,
                aleatorio(-0.18, 0.18)
            )
        );
    }


    /*
       Flor principal
    */

    flores.push(
        criarFlor(
            largura / 2,
            altura + 5,
            1,
            2.7,
            0
        )
    );
}


/* =========================================================
   DESENHA O CAULE
========================================================= */

function desenharCaule(flor) {

    const tamanho = flor.tamanho;

    const crescimento = flor.crescimento;

    const alturaCaule =
        300 * tamanho * crescimento;


    if (alturaCaule <= 0) {
        return;
    }


    const x = flor.x;

    const y = flor.baseY;


    const inclinacao =
        flor.inclinacao *
        alturaCaule;


    /*
       Brilho atrás do caule
    */

    ctx.save();

    ctx.shadowBlur =
        12 * flor.brilho;

    ctx.shadowColor =
        "rgba(80, 255, 100, 0.25)";


    /*
       Caule
    */

    const gradiente =
        ctx.createLinearGradient(
            x,
            y,
            x + inclinacao,
            y - alturaCaule
        );


    gradiente.addColorStop(
        0,
        "#162516"
    );

    gradiente.addColorStop(
        0.5,
        "#315a28"
    );

    gradiente.addColorStop(
        1,
        "#638b38"
    );


    ctx.strokeStyle = gradiente;

    ctx.lineWidth =
        Math.max(
            2,
            5 * tamanho
        );

    ctx.lineCap = "round";


    ctx.beginPath();

    ctx.moveTo(
        x,
        y
    );

    ctx.quadraticCurveTo(
        x + inclinacao * 0.3,
        y - alturaCaule * 0.45,

        x + inclinacao,
        y - alturaCaule
    );

    ctx.stroke();

    ctx.restore();


    /*
       Folhas
    */

    desenharFolhas(
        flor,
        alturaCaule,
        inclinacao
    );
}


/* =========================================================
   DESENHA FOLHAS
========================================================= */

function desenharFolhas(
    flor,
    alturaCaule,
    inclinacao
) {

    const tamanho =
        flor.tamanho;

    const quantidade =
        flor.folhas;


    for (
        let i = 0;
        i < quantidade;
        i++
    ) {

        const progresso =
            0.18 +
            (i / quantidade) * 0.65;


        const x =
            flor.x +
            inclinacao * progresso;


        const y =
            flor.baseY -
            alturaCaule * progresso;


        const lado =
            i % 2 === 0
                ? -1
                : 1;


        const tamanhoFolha =
            35 *
            tamanho *
            (1 - progresso * 0.35);


        ctx.save();


        ctx.translate(
            x,
            y
        );


        ctx.rotate(
            lado *
            (0.35 + progresso * 0.5)
        );


        /*
           Brilho suave
        */

        ctx.shadowBlur = 8;

        ctx.shadowColor =
            "rgba(80, 200, 60, 0.35)";


        /*
           Gradiente da folha
        */

        const gradiente =
            ctx.createLinearGradient(
                0,
                0,
                tamanhoFolha,
                0
            );


        gradiente.addColorStop(
            0,
            "#18351b"
        );

    gradiente.addColorStop(
        0.55,
        "#376b2b"
    );

    gradiente.addColorStop(
        1,
        "#638d3b"
    );


    ctx.fillStyle =
        gradiente;


    /*
       Forma da folha
    */

    ctx.beginPath();

    ctx.moveTo(
        0,
        0
    );

    ctx.quadraticCurveTo(
        tamanhoFolha * 0.45,
        -tamanhoFolha * 0.75,

        tamanhoFolha,
        -tamanhoFolha * 0.15
    );

    ctx.quadraticCurveTo(
        tamanhoFolha * 0.45,
        tamanhoFolha * 0.05,

        0,
        0
    );

    ctx.fill();


    /*
       Nervura
    */

    ctx.strokeStyle =
        "rgba(190, 230, 130, 0.25)";

    ctx.lineWidth = 1;

    ctx.beginPath();

    ctx.moveTo(
        0,
        0
    );

    ctx.lineTo(
        tamanhoFolha * 0.8,
        -tamanhoFolha * 0.18
    );

    ctx.stroke();


    ctx.restore();
    }
}


/* =========================================================
   DESENHA A FLOR
========================================================= */

function desenharFlor(flor) {

    const crescimento =
        flor.crescimento;


    if (crescimento <= 0) {
        return;
    }


    const tamanho =
        flor.tamanho;


    const alturaCaule =
        300 *
        tamanho *
        crescimento;


    const topoX =
        flor.x +
        flor.inclinacao *
        alturaCaule;


    const topoY =
        flor.baseY -
        alturaCaule;


    /*
       A flor cresce depois do caule
    */

    const abertura =
        Math.min(
            1,
            Math.max(
                0,
                (crescimento - 0.55) / 0.45
            )
        );


    if (abertura <= 0) {
        return;
    }


    ctx.save();


    ctx.translate(
        topoX,
        topoY
    );


    /*
       Pequena oscilação natural
    */

    const movimento =
        Math.sin(
            tempo * 0.001 +
            flor.fase
        ) * 0.025;


    ctx.rotate(
        flor.inclinacao +
        movimento
    );


    const escala =
        tamanho *
        (0.75 + abertura * 0.25);


    ctx.scale(
        escala,
        escala
    );


    /*
       Brilho externo
    */

    const brilho =
        25 +
        Math.sin(
            tempo * 0.002 +
            flor.fase
        ) * 8;


    ctx.shadowBlur =
        brilho;


    ctx.shadowColor =
        "rgba(255, 95, 25, 0.9)";


    /*
       Halo da flor
    */

    const halo =
        ctx.createRadialGradient(
            0,
            0,
            4,
            0,
            0,
            75
        );


    halo.addColorStop(
        0,
        "rgba(255, 220, 90, 0.35)"
    );

    halo.addColorStop(
        0.35,
        "rgba(255, 100, 30, 0.16)"
    );

    halo.addColorStop(
        1,
        "rgba(255, 50, 0, 0)"
    );


    ctx.fillStyle =
        halo;


    ctx.beginPath();

    ctx.arc(
        0,
        0,
        75,
        0,
        Math.PI * 2
    );

    ctx.fill();


    /*
       Desenha as pétalas
    */

    const quantidadePetalas = 8;


    for (
        let i = 0;
        i < quantidadePetalas;
        i++
    ) {

        const angulo =
            (Math.PI * 2 / quantidadePetalas) *
            i;


        desenharPetala(
            angulo,
            abertura
        );
    }


    /*
       Centro luminoso
    */

    ctx.shadowBlur = 30;

    ctx.shadowColor =
        "rgba(255, 220, 50, 1)";


    const centro =
        ctx.createRadialGradient(
            0,
            0,
            1,
            0,
            0,
            24
        );


    centro.addColorStop(
        0,
        "#fffbd0"
    );

    centro.addColorStop(
        0.25,
        "#fff36a"
    );

    centro.addColorStop(
        0.65,
        "#ffb51e"
    );

    centro.addColorStop(
        1,
        "#ff6515"
    );


    ctx.fillStyle =
        centro;


    ctx.beginPath();

    ctx.arc(
        0,
        0,
        20,
        0,
        Math.PI * 2
    );

    ctx.fill();


    /*
       Pontinhos de luz no centro
    */

    ctx.shadowBlur = 10;

    ctx.fillStyle =
        "#fff8b0";


    for (
        let i = 0;
        i < 7;
        i++
    ) {

        const angulo =
            i * 0.9 +
            flor.fase;


        const raio =
            8 +
            (i % 3) * 4;


        ctx.beginPath();

        ctx.arc(
            Math.cos(angulo) * raio,
            Math.sin(angulo) * raio,
            2,
            0,
            Math.PI * 2
        );

        ctx.fill();
    }


    ctx.restore();
}


/* =========================================================
   PETALA
========================================================= */

function desenharPetala(
    angulo,
    abertura
) {

    ctx.save();


    ctx.rotate(
        angulo
    );


    /*
       A pétala se abre conforme
       a flor cresce
    */

    const largura =
        24 +
        abertura * 10;


    const comprimento =
        65 +
        abertura * 18;


    /*
       Gradiente da pétala
    */

    const gradiente =
        ctx.createLinearGradient(
            0,
            0,
            0,
            -comprimento
        );


    gradiente.addColorStop(
        0,
        "#ff9a22"
    );

    gradiente.addColorStop(
        0.35,
        "#ff681b"
    );

    gradiente.addColorStop(
        0.72,
        "#e83c18"
    );

    gradiente.addColorStop(
        1,
        "#8e1d22"
    );


    ctx.fillStyle =
        gradiente;


    ctx.shadowBlur = 18;

    ctx.shadowColor =
        "rgba(255, 90, 25, 0.75)";


    /*
       Pétala alongada
    */

    ctx.beginPath();

    ctx.moveTo(
        0,
        4
    );


    ctx.bezierCurveTo(

        -largura,
        -comprimento * 0.20,

        -largura * 0.9,
        -comprimento * 0.78,

        0,
        -comprimento

    );


    ctx.bezierCurveTo(

        largura * 0.9,
        -comprimento * 0.78,

        largura,
        -comprimento * 0.20,

        0,
        4

    );


    ctx.closePath();

    ctx.fill();


    /*
       Luz no centro da pétala
    */

    const luz =
        ctx.createLinearGradient(
            0,
            0,
            0,
            -comprimento
        );


    luz.addColorStop(
        0,
        "rgba(255, 240, 130, 0.40)"
    );

    luz.addColorStop(
        0.4,
        "rgba(255, 190, 60, 0.12)"
    );

    luz.addColorStop(
        1,
        "rgba(255, 100, 20, 0)"
    );


    ctx.fillStyle =
        luz;


    ctx.beginPath();

    ctx.moveTo(
        0,
        2
    );


    ctx.bezierCurveTo(

        -largura * 0.25,
        -comprimento * 0.25,

        -largura * 0.18,
        -comprimento * 0.70,

        0,
        -comprimento * 0.90

    );


    ctx.bezierCurveTo(

        largura * 0.18,
        -comprimento * 0.70,

        largura * 0.25,
        -comprimento * 0.25,

        0,
        2

    );


    ctx.fill();


    ctx.restore();
}


/* =========================================================
   CHÃO / SOMBRAS
========================================================= */

function desenharChao() {

    const gradiente =
        ctx.createLinearGradient(
            0,
            altura - 120,
            0,
            altura
        );


    gradiente.addColorStop(
        0,
        "rgba(5, 12, 6, 0)"
    );

    gradiente.addColorStop(
        1,
        "rgba(2, 5, 3, 0.95)"
    );


    ctx.fillStyle =
        gradiente;


    ctx.fillRect(
        0,
        altura - 150,
        largura,
        150
    );
}


/* =========================================================
   ANIMAÇÃO
========================================================= */

function animar() {

    tempo = performance.now();


    /*
       Limpa o canvas
    */

    ctx.clearRect(
        0,
        0,
        largura,
        altura
    );


    /*
       Fundo muito escuro
    */

    const fundo =
        ctx.createRadialGradient(
            largura / 2,
            altura * 0.45,
            10,
            largura / 2,
            altura * 0.45,
            altura * 0.8
        );


    fundo.addColorStop(
        0,
        "#140914"
    );

    fundo.addColorStop(
        0.45,
        "#07070b"
    );

    fundo.addColorStop(
        1,
        "#010204"
    );


    ctx.fillStyle =
        fundo;


    ctx.fillRect(
        0,
        0,
        largura,
        altura
    );


    /*
       Pequenos pontos luminosos
    */

    desenharParticulas();


    /*
       Atualiza e desenha as flores
    */

    flores.forEach(
        function (flor) {

            const tempoFlor =
                tempo * 0.00018 -
                flor.atraso;


            /*
               Crescimento suave
            */

            const crescimento =
                Math.min(
                    1,
                    Math.max(
                        0,
                        tempoFlor
                    )
                );


            /*
               Suavização
            */

            flor.crescimento =
                crescimento *
                crescimento *
                (3 - 2 * crescimento);


            desenharCaule(flor);

            desenharFlor(flor);
        }
    );


    /*
       Escuridão na base
    */

    desenharChao();


    requestAnimationFrame(
        animar
    );
}


/* =========================================================
   PARTÍCULAS
========================================================= */

const particulas = [];


function criarParticulas() {

    particulas.length = 0;


    const quantidade =
        window.innerWidth < 600
            ? 20
            : 32;


    for (
        let i = 0;
        i < quantidade;
        i++
    ) {

        particulas.push({

            x: Math.random(),

            y: Math.random(),

            tamanho: aleatorio(
                0.5,
                1.8
            ),

            velocidade:
                aleatorio(
                    0.00001,
                    0.000035
                ),

            brilho:
                aleatorio(
                    0.2,
                    0.8
                ),

            fase:
                aleatorio(
                    0,
                    Math.PI * 2
                )
        });
    }
}


function desenharParticulas() {

    particulas.forEach(
        function (particula) {

            particula.y -=
                particula.velocidade *
                16;


            if (particula.y < 0) {

                particula.y = 1;

                particula.x =
                    Math.random();
            }


            const brilho =
                particula.brilho *
                (
                    0.5 +
                    Math.sin(
                        tempo * 0.002 +
                        particula.fase
                    ) *
                    0.5
                );


            ctx.fillStyle =
                `rgba(255,190,110,${brilho})`;


            ctx.shadowBlur = 8;

            ctx.shadowColor =
                "rgba(255,150,60,0.8)";


            ctx.beginPath();

            ctx.arc(
                particula.x * largura,
                particula.y * altura,
                particula.tamanho,
                0,
                Math.PI * 2
            );

            ctx.fill();
        }
    );


    ctx.shadowBlur = 0;
}


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

function iniciar() {

    ajustarCanvas();

    criarParticulas();

    criarJardim();

    animar();
}


/* =========================================================
   REDIMENSIONAMENTO
========================================================= */

window.addEventListener(
    "resize",
    function () {

        const novaLargura =
            canvas.clientWidth;

        const novaAltura =
            canvas.clientHeight;


        /*
           Ignora mudanças causadas apenas
           pela barra do navegador no celular.
        */

        if (
            novaLargura === largura &&
            novaAltura === altura
        ) {
            return;
        }


        ajustarCanvas();

        criarParticulas();

        criarJardim();
    }
);


iniciar();

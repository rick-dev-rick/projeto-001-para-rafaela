/* ========================================= */
/* PROJETO #001 - PARA RAFAELA ❤️ */
/* FLOR DE LUZ - JAVASCRIPT */
/* ========================================= */

const canvas = document.getElementById("florCanvas");
const ctx = canvas.getContext("2d");

let largura;
let altura;
let escala;


/* ========================================= */
/* AJUSTAR CANVAS */
/* ========================================= */

function ajustarCanvas() {

    const dpr = window.devicePixelRatio || 1;

    const rect = canvas.getBoundingClientRect();

    largura = rect.width;
    altura = rect.height;

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

    escala = Math.min(
        largura / 400,
        altura / 500
    );
}


/* ========================================= */
/* DESENHAR UMA PÉTALA */
/* ========================================= */

function desenharPetala(
    x,
    y,
    tamanho,
    larguraPetala,
    rotacao,
    cor1,
    cor2,
    brilho
) {

    ctx.save();

    ctx.translate(x, y);

    ctx.rotate(rotacao);

    /*
     * A sombra luminosa da pétala.
     */

    ctx.shadowColor = cor1;
    ctx.shadowBlur = brilho;


    /*
     * Gradiente da pétala.
     */

    const gradiente = ctx.createRadialGradient(
        0,
        tamanho * 0.75,
        5,
        0,
        tamanho * 0.3,
        tamanho
    );

    gradiente.addColorStop(
        0,
        "#fffde8"
    );

    gradiente.addColorStop(
        0.18,
        cor1
    );

    gradiente.addColorStop(
        0.55,
        cor2
    );

    gradiente.addColorStop(
        1,
        "rgba(255,70,110,0.15)"
    );


    ctx.fillStyle = gradiente;


    /*
     * Forma orgânica da pétala.
     */

    ctx.beginPath();

    ctx.moveTo(
        0,
        0
    );


    ctx.bezierCurveTo(
        -larguraPetala,
        -tamanho * 0.28,

        -larguraPetala * 0.85,
        -tamanho * 0.78,

        0,
        -tamanho
    );


    ctx.bezierCurveTo(
        larguraPetala * 0.85,
        -tamanho * 0.78,

        larguraPetala,
        -tamanho * 0.28,

        0,
        0
    );


    ctx.closePath();

    ctx.fill();


    /*
     * Reflexo luminoso dentro da pétala.
     */

    ctx.globalAlpha = 0.45;

    ctx.shadowBlur = 0;

    const reflexo = ctx.createRadialGradient(
        0,
        -tamanho * 0.55,
        2,
        0,
        -tamanho * 0.55,
        larguraPetala
    );

    reflexo.addColorStop(
        0,
        "rgba(255,255,255,0.9)"
    );

    reflexo.addColorStop(
        1,
        "rgba(255,255,255,0)"
    );

    ctx.fillStyle = reflexo;

    ctx.beginPath();

    ctx.ellipse(
        0,
        -tamanho * 0.58,
        larguraPetala * 0.35,
        tamanho * 0.25,
        0,
        0,
        Math.PI * 2
    );

    ctx.fill();


    ctx.restore();
}


/* ========================================= */
/* DESENHAR CAULE */
/* ========================================= */

function desenharCaule(
    x,
    y,
    comprimento
) {

    ctx.save();

    ctx.lineCap = "round";


    const gradiente =
        ctx.createLinearGradient(
            x - 10,
            0,
            x + 10,
            0
        );


    gradiente.addColorStop(
        0,
        "#123719"
    );

    gradiente.addColorStop(
        0.45,
        "#55a94d"
    );

    gradiente.addColorStop(
        0.55,
        "#83d76b"
    );

    gradiente.addColorStop(
        1,
        "#163c1c"
    );


    ctx.strokeStyle = gradiente;

    ctx.lineWidth = 13;

    ctx.shadowColor =
        "rgba(100,220,100,0.5)";

    ctx.shadowBlur = 15;


    ctx.beginPath();

    ctx.moveTo(x, y);

    ctx.quadraticCurveTo(
        x - 5,
        y + comprimento * 0.45,

        x + 3,
        y + comprimento
    );

    ctx.stroke();


    ctx.restore();
}


/* ========================================= */
/* DESENHAR FOLHA */
/* ========================================= */

function desenharFolha(
    x,
    y,
    tamanho,
    rotacao
) {

    ctx.save();

    ctx.translate(x, y);

    ctx.rotate(rotacao);


    const gradiente =
        ctx.createLinearGradient(
            0,
            0,
            tamanho,
            0
        );


    gradiente.addColorStop(
        0,
        "#1c5c2b"
    );

    gradiente.addColorStop(
        0.5,
        "#69c95b"
    );

    gradiente.addColorStop(
        1,
        "#b0ef79"
    );


    ctx.fillStyle = gradiente;

    ctx.shadowColor =
        "rgba(100,220,100,0.45)";

    ctx.shadowBlur = 15;


    ctx.beginPath();

    ctx.moveTo(0, 0);

    ctx.bezierCurveTo(
        tamanho * 0.35,
        -tamanho * 0.65,

        tamanho * 0.9,
        -tamanho * 0.55,

        tamanho,
        0
    );

    ctx.bezierCurveTo(
        tamanho * 0.65,
        tamanho * 0.35,

        tamanho * 0.25,
        tamanho * 0.3,

        0,
        0
    );

    ctx.closePath();

    ctx.fill();


    /*
     * Veia central da folha.
     */

    ctx.shadowBlur = 0;

    ctx.strokeStyle =
        "rgba(220,255,200,0.55)";

    ctx.lineWidth = 2;

    ctx.beginPath();

    ctx.moveTo(3, 0);

    ctx.lineTo(
        tamanho * 0.85,
        -2
    );

    ctx.stroke();


    ctx.restore();
}


/* ========================================= */
/* PARTÍCULAS */
/* ========================================= */

const particulas = [];


function criarParticulas() {

    particulas.length = 0;


    for (let i = 0; i < 32; i++) {

        particulas.push({

            angulo:
                Math.random() *
                Math.PI *
                2,

            distancia:
                100 +
                Math.random() * 120,

            tamanho:
                1 +
                Math.random() * 3,

            velocidade:
                0.0004 +
                Math.random() * 0.001,

            fase:
                Math.random() *
                Math.PI *
                2
        });
    }
}


/* ========================================= */
/* DESENHAR PARTÍCULAS */
/* ========================================= */

function desenharParticulas(
    centroX,
    centroY,
    tempo
) {

    for (const particula of particulas) {

        const angulo =
            particula.angulo +
            tempo * particula.velocidade;


        const distancia =
            particula.distancia *
            escala;


        const x =
            centroX +
            Math.cos(angulo) *
            distancia;


        const y =
            centroY +
            Math.sin(angulo) *
            distancia;


        const pulsar =
            0.5 +
            Math.sin(
                tempo * 0.003 +
                particula.fase
            ) * 0.5;


        ctx.save();


        ctx.globalAlpha =
            0.2 +
            pulsar * 0.8;


        ctx.fillStyle =
            "#fff5a8";


        ctx.shadowColor =
            "#ffe76a";

        ctx.shadowBlur =
            12;


        ctx.beginPath();

        ctx.arc(
            x,
            y,
            particula.tamanho *
            (0.7 + pulsar),
            0,
            Math.PI * 2
        );

        ctx.fill();


        ctx.restore();
    }
}


/* ========================================= */
/* DESENHAR LUZ CENTRAL */
/* ========================================= */

function desenharAura(
    x,
    y,
    raio,
    intensidade
) {

    const aura =
        ctx.createRadialGradient(
            x,
            y,
            0,
            x,
            y,
            raio
        );


    aura.addColorStop(
        0,
        `rgba(255,255,220,${intensidade})`
    );

    aura.addColorStop(
        0.2,
        `rgba(255,220,70,${intensidade * 0.65})`
    );

    aura.addColorStop(
        0.5,
        `rgba(255,120,50,${intensidade * 0.25})`
    );

    aura.addColorStop(
        1,
        "rgba(255,60,100,0)"
    );


    ctx.fillStyle = aura;

    ctx.beginPath();

    ctx.arc(
        x,
        y,
        raio,
        0,
        Math.PI * 2
    );

    ctx.fill();
}


/* ========================================= */
/* DESENHAR CORAÇÃO */
/* ========================================= */

function desenharCoracao(
    x,
    y,
    tamanho
) {

    ctx.save();

    ctx.translate(x, y);

    ctx.scale(
        tamanho,
        tamanho
    );


    ctx.fillStyle =
        "#ff507d";


    ctx.shadowColor =
        "#ffffff";

    ctx.shadowBlur =
        10;


    ctx.beginPath();

    ctx.moveTo(0, 0.3);

    ctx.bezierCurveTo(
        -0.5,
        -0.35,
        -1,
        0.05,
        -0.5,
        0.5
    );

    ctx.bezierCurveTo(
        -0.25,
        0.75,
        0,
        0.95,
        0,
        1
    );

    ctx.bezierCurveTo(
        0,
        1,
        0.25,
        0.75,
        0.5,
        0.5
    );

    ctx.bezierCurveTo(
        1,
        0.05,
        0.5,
        -0.35,
        0,
        0.3
    );

    ctx.fill();


    ctx.restore();
}


/* ========================================= */
/* FLOR COMPLETA */
/* ========================================= */

function desenharFlor(tempo) {

    ctx.clearRect(
        0,
        0,
        largura,
        altura
    );


    const centroX =
        largura / 2;


    const centroY =
        altura * 0.38;


    const s =
        escala;


    /*
     * Aura geral.
     */

    desenharAura(
        centroX,
        centroY,
        175 * s,
        0.65
    );


    desenharAura(
        centroX,
        centroY,
        110 * s,
        0.85
    );


    /*
     * Partículas.
     */

    desenharParticulas(
        centroX,
        centroY,
        tempo
    );


    /*
     * Caule primeiro,
     * para ficar atrás da flor.
     */

    desenharCaule(
        centroX,
        centroY + 25 * s,
        145 * s
    );


    /*
     * Folhas.
     */

    desenharFolha(
        centroX - 5 * s,
        centroY + 115 * s,
        85 * s,
        -0.45
    );


    desenharFolha(
        centroX + 5 * s,
        centroY + 150 * s,
        75 * s,
        Math.PI + 0.4
    );


    /*
     * Pétalas externas.
     */

    const quantidadeExterna = 12;


    for (
        let i = 0;
        i < quantidadeExterna;
        i++
    ) {

        const angulo =
            (
                Math.PI * 2 /
                quantidadeExterna
            ) * i;


        desenharPetala(
            centroX,
            centroY,
            105 * s,
            52 * s,
            angulo,
            "#fff176",
            "#ff7650",
            25
        );
    }


    /*
     * Pétalas intermediárias.
     */

    const quantidadeMeio = 9;


    for (
        let i = 0;
        i < quantidadeMeio;
        i++
    ) {

        const angulo =
            (
                Math.PI * 2 /
                quantidadeMeio
            ) * i
            +
            Math.PI / 9;


        desenharPetala(
            centroX,
            centroY,
            82 * s,
            43 * s,
            angulo,
            "#fff9ad",
            "#ff9d45",
            30
        );
    }


    /*
     * Pétalas internas.
     */

    const quantidadeInterna = 7;


    for (
        let i = 0;
        i < quantidadeInterna;
        i++
    ) {

        const angulo =
            (
                Math.PI * 2 /
                quantidadeInterna
            ) * i;


        desenharPetala(
            centroX,
            centroY,
            58 * s,
            34 * s,
            angulo,
            "#ffffff",
            "#ffd34e",
            35
        );
    }


    /*
     * Luz central.
     */

    const pulsacao =
        1 +
        Math.sin(
            tempo * 0.002
        ) * 0.08;


    desenharAura(
        centroX,
        centroY,
        65 * s * pulsacao,
        1
    );


    /*
     * Núcleo.
     */

    ctx.save();

    ctx.shadowColor =
        "#fff5a0";

    ctx.shadowBlur =
        25;


    const centro =
        ctx.createRadialGradient(
            centroX - 8 * s,
            centroY - 10 * s,
            2,
            centroX,
            centroY,
            38 * s
        );


    centro.addColorStop(
        0,
        "#ffffff"
    );

    centro.addColorStop(
        0.3,
        "#fff8a0"
    );

    centro.addColorStop(
        0.65,
        "#ffc928"
    );

    centro.addColorStop(
        1,
        "#e96b18"
    );


    ctx.fillStyle = centro;


    ctx.beginPath();

    ctx.arc(
        centroX,
        centroY,
        32 * s,
        0,
        Math.PI * 2
    );

    ctx.fill();


    ctx.restore();


    /*
     * Pequeno coração luminoso.
     */

    desenharCoracao(
        centroX,
        centroY - 3 * s,
        15 * s
    );
}


/* ========================================= */
/* ANIMAÇÃO */
/* ========================================= */

function animar(tempo) {

    desenharFlor(tempo);

    requestAnimationFrame(animar);
}


/* ========================================= */
/* INICIAR */
/* ========================================= */

window.addEventListener(
    "resize",
    function () {

        ajustarCanvas();

        criarParticulas();
    }
);


ajustarCanvas();

criarParticulas();

requestAnimationFrame(animar);

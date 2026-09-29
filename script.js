// =========================================
// MÚSICA - CONTINUIDADE ENTRE AS PÁGINAS
// =========================================

document.addEventListener("DOMContentLoaded", function () {

    const musica = document.getElementById("musica");

    if (musica) {

        musica.volume = 0.2;

        // Recuperar a posição da música
        const tempoSalvo = sessionStorage.getItem("musicaTempo");

        if (tempoSalvo !== null) {

            musica.currentTime = parseFloat(tempoSalvo);

        }

        // Salvar continuamente a posição da música
        musica.addEventListener("timeupdate", function () {

            if (!musica.paused) {

                sessionStorage.setItem(
                    "musicaTempo",
                    musica.currentTime
                );

            }

        });

        // Tentar continuar a música
        musica.play().catch(function () {

            // O Safari pode bloquear reprodução automática.
            // Nesse caso, ela continuará quando houver
            // uma interação do usuário.

        });
    }


    // =========================================
    // SALVAR A MÚSICA ANTES DE TROCAR DE PÁGINA
    // =========================================

    const links = document.querySelectorAll("a");

    links.forEach(function (link) {

        link.addEventListener("click", function () {

            if (musica && !musica.paused) {

                sessionStorage.setItem(
                    "musicaTempo",
                    musica.currentTime
                );

            }

        });

    });

});


// =========================================
// BOTÃO DA SURPRESA
// =========================================

function mostrarMensagem() {

    let musica = document.getElementById("musica");

    // Música
    if (musica) {

        musica.volume = 0.2;

        musica.play().catch(function () {

            // Se o navegador bloquear, o próprio
            // toque no botão normalmente libera.

        });

    }


    let mensagem = document.getElementById("mensagem");

    let botao = document.getElementById("botaoMensagem");


    // =========================================
    // MOSTRAR MENSAGEM
    // =========================================

    if (mensagem.textContent === "") {

        mensagem.textContent =
            "Você é o amor da minha vida, Rafaela! ❤️";

        mensagem.style.opacity = "1";

        botao.textContent =
            "Esconder mensagem ❤️";


        // =========================================
        // CRIAR VÁRIOS CORAÇÕES
        // =========================================

        let quantidade = 22;


        for (let i = 0; i < quantidade; i++) {

            setTimeout(function () {

                // Criar o coração
                let coracao =
                    document.createElement("div");

                coracao.textContent = "❤️";


                // Posição do coração
                coracao.style.position = "fixed";

                coracao.style.left =
                    Math.random() * 100 + "%";

                coracao.style.top = "100%";


                // Tamanho
                coracao.style.fontSize =
                    Math.random() * 50 + 100 + "px";


                // Animação
                coracao.style.opacity = "0";

                coracao.style.transition =
                    "opacity 3s, transform 3s";


                // Colocar na página
                document.body.appendChild(coracao);


                // Fazer o coração subir
                setTimeout(function () {

                    coracao.style.opacity = "1";

                    coracao.style.transform =
                        "translate(" +
                        (Math.random() * 200 - 100) +
                        "px, -" +
                        (window.innerHeight + 300) +
                        "px) rotate(" +
                        Math.random() * 720 +
                        "deg) scale(1.2)";

                }, 100);


                // Remover depois
                setTimeout(function () {

                    coracao.remove();

                }, 3100);

            }, i * 300);

        }

    } else {

        mensagem.style.opacity = "0";

        botao.textContent =
            "Clique aqui ❤️";


        setTimeout(function () {

            mensagem.textContent = "";

        }, 500);

    }

}

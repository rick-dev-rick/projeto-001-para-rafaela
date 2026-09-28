function mostrarMensagem() {
	let musica = document.getElementById("musica");

musica.volume = 0.2;

musica.play();
    if (document.getElementById("mensagem").textContent === "") {

        document.getElementById("mensagem").textContent =
            "Você é o amor da minha vida, Rafaela! ❤️";

        document.getElementById("mensagem").style.opacity = "1";

        document.getElementById("botaoMensagem").textContent =
            "Esconder mensagem ❤️";


        // Criar vários corações
        let quantidade = 22;

        for (let i = 0; i < quantidade; i++) {

            setTimeout(function() {

                // Criar o coração
                let coracao = document.createElement("div");

                coracao.textContent = "❤️";


                // Posição do coração
                coracao.style.position = "fixed";

                coracao.style.left =
                    Math.random() * 100 + "%";

                coracao.style.top = "100%";


                // Tamanho entre 100px e 150px
                coracao.style.fontSize =
                    Math.random() * 50 + 100 + "px";


                // Animação
                coracao.style.opacity = "0";

                coracao.style.transition =
                    "opacity 3s, transform 3s";


                // Colocar na página
                document.body.appendChild(coracao);


                // Fazer aparecer, subir,
                // andar para os lados,
                // girar e crescer
                setTimeout(function() {

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


                // Remover depois da animação
                setTimeout(function() {

                    coracao.remove();

                }, 3100);

            }, i * 300);
        }


    } else {

        document.getElementById("mensagem").style.opacity = "0";

        document.getElementById("botaoMensagem").textContent =
            "Clique aqui ❤️";


        setTimeout(function() {

            document.getElementById("mensagem").textContent = "";

        }, 500);
    }
}
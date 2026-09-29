function mostrarMensagem() {
    let musica = document.getElementById("musica");
    // Música
    musica.volume = 0.2;
    musica.play();
    let mensagem = document.getElementById("mensagem");
    let botao = document.getElementById("botaoMensagem");
    if (mensagem.textContent === "") {
        mensagem.textContent =
            "Você é o amor da minha vida, Rafaela! ❤️";
        mensagem.style.opacity = "1";
        botao.textContent =
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
        mensagem.style.opacity = "0";
        botao.textContent =
            "Clique aqui ❤️";
        setTimeout(function() {
            mensagem.textContent = "";
        }, 500);
    }
}
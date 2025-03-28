<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Jogo com Setas do Teclado</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        overflow: hidden;
        position: relative;
      }
      canvas {
        display: block;
        background-color: #f0f0f0;
        margin: 0 auto;
        border: 2px solid black;
        z-index: 1;
      }
      img {
        object-fit: cover;
        position: absolute; /* Faz a imagem ocupar a tela toda */
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 2;
      }
      .mostrar {
        background-color: orange;
        height: 100%;
        width: 100%;
        z-index: 100;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      }

      .hidden {
        display: none;
      }
    </style>

  </head>
  <body>
    <canvas id="jogoCanvas"> </canvas>
    <h1>Pontos: <span id="pontos">0</span></h1>
    <div id="scary"></div>
    <div id="reload" class="hidden">
      <h1>Você perdeu!</h1>
      <h1>Pontos: <span>0</span></h1>
      <button onclick="reiniciarJogo()">Reiniciar</button>
    </div>
    <script>
      // Definir o tamanho da tela de jogo
      const canvas = document.getElementById("jogoCanvas");
      const ctx = canvas.getContext("2d");
      let pontos_cont = 0; // Contador de pontos
      canvas.width = 800;
      canvas.height = 600;

      // Variáveis do jogador
      const jogador = {
        x: canvas.width / 2 - 25, // Posição inicial no centro
        y: canvas.height - 50,
        largura: 30,
        altura: 30,
        velocidade: 2,
      };

      // Variáveis do obstáculo
      const obstaculo = {
        x: Math.random() * (canvas.width - 30), // Posição aleatória
        y: 0,
        largura: 30,
        altura: 30,
        velocidade: 2,
      };

      // Variáveis do ponto
      const pontos = {
        x: Math.random() * (canvas.width - 30), // Posição aleatória
        y: 0,
        largura: 30,
        altura: 30,
        velocidade: 2,
      };

      // Função para desenhar o jogador
      function desenharJogador() {
        ctx.fillStyle = "#3498db"; // Cor do jogador
        ctx.fillRect(jogador.x, jogador.y, jogador.largura, jogador.altura);
      }

      // Função para desenhar o obstáculo
      function desenharObstaculo() {
        ctx.fillStyle = "#e74c3c"; // Cor do obstáculo
        ctx.fillRect(
          obstaculo.x,
          obstaculo.y,
          obstaculo.largura,
          obstaculo.altura
        );
      }

      // Função para desenhar o ponto
      function ponto() {
        ctx.fillStyle = "#c8ff00"; // Cor do ponto
        ctx.fillRect(pontos.x, pontos.y, pontos.largura, pontos.altura);
      }

      // Função para atualizar a posição do obstáculo e do ponto
      function atualizarObstaculo() {
        obstaculo.y += obstaculo.velocidade;
        pontos.y += pontos.velocidade;

        // Se o obstáculo sair da tela, reinicia sua posição
        if (obstaculo.y > canvas.height) {
          obstaculo.y = 0;
          obstaculo.x = Math.random() * (canvas.width - obstaculo.largura);
          obstaculo.velocidade += 0.5;
          jogador.velocidade += 1;
        }

        // Se o ponto sair da tela ou o jogador pegar, reinicia sua posição
        if (pontos.y > canvas.height || pontos.y == jogador.y) {
          pontos.y = 0;
          pontos.x = Math.random() * (canvas.width - pontos.largura);
        }

        if (pontos_cont == 7) {
          document.getElementById("scary").innerHTML =
            '<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStzqLCLmxEdt96-Btb_n2EVSkUO8W3VWf5Tw&s" /> <button onClick="reiniciarJogo()">Reiniciar</button>';
        }
      }

      // Função para verificar se houve colisão entre o jogador e o obstáculo
      function verificarColisao() {
        if (
          jogador.x < obstaculo.x + obstaculo.largura &&
          jogador.x + jogador.largura > obstaculo.x &&
          jogador.y < obstaculo.y + obstaculo.altura &&
          jogador.y + jogador.altura > obstaculo.y
        ) {
          return true; // Colisão ocorreu
        }
        return false; // Nenhuma colisão
      }

      // Função para verificar colisão entre o jogador e o ponto
      function verificarColisaoyellow() {
        if (
          jogador.x < pontos.x + pontos.largura &&
          jogador.x + jogador.largura > pontos.x &&
          jogador.y < pontos.y + pontos.altura &&
          jogador.y + jogador.altura > pontos.y
        ) {
          pontos_cont += 1; // Aumenta o contador de pontos
          document.getElementById("pontos").textContent = pontos_cont; // Atualiza o display de pontos
          pontos.y = 0; // Reinicia a posição do ponto
          pontos.x = Math.random() * (canvas.width - pontos.largura); // Nova posição aleatória do ponto
          return true; // Colisão com o ponto ocorreu
        }
        return false; // Nenhuma colisão com o ponto
      }

      // Função para mover o jogador com as setas do teclado
      function moverJogador(e) {
        if (e.key === "ArrowLeft" && jogador.x > 0) {
          jogador.x -= jogador.velocidade; // Move para a esquerda
        } else if (
          e.key === "ArrowRight" &&
          jogador.x + jogador.largura < canvas.width
        ) {
          jogador.x += jogador.velocidade; // Move para a direita
        }
      }

      // Função principal do jogo
      function atualizarJogo() {
        // Limpar a tela a cada frame
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Atualizar e desenhar tudo
        desenharJogador();
        desenharObstaculo();
        ponto();
        atualizarObstaculo();
        verificarColisaoyellow(); // Verificar colisão com o ponto

        // Verificar colisão com o obstáculo
        if (verificarColisao()) {
          document
            .querySelector("#reload")
            .classList.replace("hidden", "mostrar");
        }
        // Solicitar o próximo frame
        requestAnimationFrame(atualizarJogo);
      }

      // Iniciar o movimento do jogador
      window.addEventListener("keydown", moverJogador);
      function reiniciarJogo() {
        window.location.reload();
      }
      // Iniciar o jogo
      atualizarJogo();
    </script>

  </body>
</html>

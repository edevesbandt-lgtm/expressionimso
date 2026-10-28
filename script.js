const perguntas = [
    {
        pergunta: "Qual era uma das principais intenções do Expressionismo?",
        opcoes: ["Copiar a realidade com perfeição", "Expressar sentimentos e emoções", "Pintar somente paisagens bonitas"],
        correta: 1,
        explicacao: "Isso mesmo! A expressão dos sentimentos era mais importante do que representar tudo de forma realista."
    },
    {
        pergunta: "Em qual país o Expressionismo ganhou força no início do século XX?",
        opcoes: ["Alemanha", "Brasil", "Portugal"],
        correta: 0,
        explicacao: "A Alemanha foi um dos principais centros do Expressionismo."
    },
    {
        pergunta: "Qual artista austríaco ficou conhecido por autorretratos e linhas marcantes?",
        opcoes: ["Iberê Camargo", "Anita Malfatti", "Egon Schiele"],
        correta: 2,
        explicacao: "Egon Schiele explorou autorretratos, poses expressivas e contornos fortes."
    },
    {
        pergunta: "Qual artista ajudou a renovar a arte brasileira e participou do contexto modernista?",
        opcoes: ["Ernst Ludwig Kirchner", "Anita Malfatti", "Egon Schiele"],
        correta: 1,
        explicacao: "Anita Malfatti foi uma figura importante para a renovação da arte no Brasil."
    },
    {
        pergunta: "Que tema aparece em obras conhecidas de Iberê Camargo?",
        opcoes: ["Ciclistas e movimento", "Somente cenas mitológicas", "Retratos de reis medievais"],
        correta: 0,
        explicacao: "A série dos ciclistas é uma das referências marcantes da produção de Iberê."
    },
    {
        pergunta: "Qual característica combina com muitas obras expressionistas?",
        opcoes: ["Cores e formas usadas para intensificar emoções", "Ausência total de emoção", "Obrigação de imitar fotografias"],
        correta: 0,
        explicacao: "Cores intensas, distorções e formas expressivas ajudam a comunicar emoções."
    }
];

let atual = 0;
let pontos = 0;
let respondida = false;

const perguntaEl = document.getElementById("pergunta");
const opcoesEl = document.getElementById("opcoes");
const feedbackEl = document.getElementById("feedback");
const proximaBtn = document.getElementById("proxima");
const progressoEl = document.getElementById("progresso");
const barraEl = document.getElementById("barra");
const resultadoEl = document.getElementById("resultado");

function mostrarPergunta() {
    respondida = false;
    const item = perguntas[atual];
    perguntaEl.textContent = item.pergunta;
    progressoEl.textContent = `Pergunta ${atual + 1} de ${perguntas.length}`;
    barraEl.style.width = `${(atual / perguntas.length) * 100}%`;
    feedbackEl.textContent = "";
    opcoesEl.innerHTML = "";
    proximaBtn.disabled = true;
    proximaBtn.textContent = atual === perguntas.length - 1 ? "Ver resultado →" : "Próxima pergunta →";

    item.opcoes.forEach((opcao, indice) => {
        const botao = document.createElement("button");
        botao.type = "button";
        botao.className = "opcao";
        botao.textContent = opcao;
        botao.addEventListener("click", () => escolherResposta(indice, botao));
        opcoesEl.appendChild(botao);
    });
}

function escolherResposta(indice, botaoEscolhido) {
    if (respondida) return;
    respondida = true;
    const item = perguntas[atual];
    const botoes = opcoesEl.querySelectorAll("button");
    botoes.forEach((botao, i) => {
        botao.disabled = true;
        if (i === item.correta) botao.classList.add("correta");
    });

    if (indice === item.correta) {
        pontos++;
        feedbackEl.textContent = "Resposta correta! " + item.explicacao;
        feedbackEl.className = "feedback certo";
    } else {
        botaoEscolhido.classList.add("errada");
        feedbackEl.textContent = "Quase! " + item.explicacao;
        feedbackEl.className = "feedback errado";
    }
    proximaBtn.disabled = false;
    barraEl.style.width = `${((atual + 1) / perguntas.length) * 100}%`;
}

proximaBtn.addEventListener("click", () => {
    if (!respondida) return;
    atual++;
    if (atual < perguntas.length) {
        mostrarPergunta();
    } else {
        perguntaEl.hidden = true;
        opcoesEl.hidden = true;
        feedbackEl.hidden = true;
        proximaBtn.hidden = true;
        progressoEl.textContent = "Desafio concluído!";
        barraEl.style.width = "100%";
        let mensagem = "Continue explorando as páginas dos artistas e tente novamente!";
        if (pontos === perguntas.length) mensagem = "Perfeito! Você dominou o conteúdo.";
        else if (pontos >= 4) mensagem = "Muito bem! Você já entendeu vários pontos importantes.";
        resultadoEl.hidden = false;
        resultadoEl.innerHTML = `<p class="etiqueta">SEU RESULTADO</p><strong>${pontos} / ${perguntas.length}</strong><h2>${mensagem}</h2><button class="botao" id="reiniciar" type="button">Jogar novamente ↻</button>`;
        document.getElementById("reiniciar").addEventListener("click", () => {
            atual = 0;
            pontos = 0;
            perguntaEl.hidden = false;
            opcoesEl.hidden = false;
            feedbackEl.hidden = false;
            proximaBtn.hidden = false;
            resultadoEl.hidden = true;
            mostrarPergunta();
        });
    }
});

mostrarPergunta();

/* =========================
   DARK / LIGHT MODE
========================= */
const toggleBtn = document.getElementById("toggle-theme");

function aplicarTemaSalvo() {
    const temaSalvo = localStorage.getItem("theme");

    if (temaSalvo === "light") {
        document.body.classList.add("light");
        toggleBtn.textContent = "🌞";
    } else {
        document.body.classList.remove("light");
        toggleBtn.textContent = "🌙";
    }
}

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");

    const temaAtual = document.body.classList.contains("light") ? "light" : "dark";
    localStorage.setItem("theme", temaAtual);

    toggleBtn.textContent =
        temaAtual === "light" ? "🌞" : "🌙";
});

aplicarTemaSalvo();

/* =========================
   DADOS DOS PROJETOS
========================= */
const projetos = [
    {
        nome: "Portfólio Profissional",
        descricao: "Site pessoal para apresentar meus projetos e habilidades.",
        tecnologias: ["HTML", "CSS", "JavaScript"],
        categoria: "frontend",
        link: "https://github.com/lostanjo00/reposit-rio-"
    },
    {
        nome: "Homelab Linux Ubuntu",
        descricao: "Laboratório prático utilizando Ubuntu Server. Configuração de SSH, Nginx, monitoramento, firewall UFW e publicação via Cloudflare Tunnel.",
        tecnologias: ["Linux", "Ubuntu", "Nginx", "Cloudflare", "Redes"],
        categoria: "infra",
        link: "https://github.com/lostanjo00"
    },
    {
        nome: "Sistema de Cadastro",
        descricao: "Projeto focado em lógica e estrutura de dados.",
        tecnologias: ["JavaScript"],
        categoria: "backend",
        link: "https://github.com/lostanjo00"
    },
    {
        nome: "Projeto em Estudo",
        descricao: "Aplicação para praticar conceitos fundamentais.",
        tecnologias: ["HTML", "CSS"],
        categoria: "frontend",
        link: "https://github.com/lostanjo00"
    }
];

/* =========================
   RENDERIZAÇÃO DE PROJETOS
========================= */
const sectionProjetos = document.getElementById("projetos");

// Criar estrutura base uma vez
sectionProjetos.innerHTML = `
    <h2>Projetos</h2>
    <div class="filtros">
        <button data-filter="all" class="ativo">Todos</button>
        <button data-filter="frontend">Frontend</button>
        <button data-filter="backend">Backend</button>
        <button data-filter="infra">Infraestrutura</button>
    </div>
    <div id="projetos-grid" style="width: 100%;"></div>
`;

const projetosGrid = document.getElementById("projetos-grid");

function renderizarProjetos(lista) {
    projetosGrid.innerHTML = "";

    lista.forEach(projeto => {
        const article = document.createElement("article");
        article.classList.add("projeto", "animate");

        article.innerHTML = `
            <h3>${projeto.nome}</h3>
            <p>${projeto.descricao}</p>
            <p><strong>Tecnologias:</strong> ${projeto.tecnologias.join(", ")}</p>
            <a href="${projeto.link}" target="_blank">Ver no GitHub</a>
        `;

        projetosGrid.appendChild(article);
    });

    observarAnimacoes();
}

/* =========================
   FILTRO DE PROJETOS
========================= */
function aplicarFiltro() {
    document.querySelectorAll(".filtros button").forEach(botao => {
        botao.addEventListener("click", () => {
            // Remove active
            document.querySelectorAll(".filtros button").forEach(b => b.classList.remove("ativo"));
            // Add active
            botao.classList.add("ativo");

            const filtro = botao.dataset.filter;

            if (filtro === "all") {
                renderizarProjetos(projetos);
            } else {
                const filtrados = projetos.filter(
                    projeto => projeto.categoria === filtro
                );
                renderizarProjetos(filtrados);
            }
        });
    });
}

// Inicializa os filtros
aplicarFiltro();

/* =========================
   ANIMAÇÕES AO ROLAR
========================= */
function observarAnimacoes() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    });

    document.querySelectorAll(".animate").forEach(el =>
        observer.observe(el)
    );
}

/* =========================
   CHATBOT MOCK IA
========================= */
const chatBtn = document.getElementById('chatbot-btn');
const chatWindow = document.getElementById('chatbot-window');
const closeChatBtn = document.getElementById('close-chat');
const chatBody = document.getElementById('chat-body');
const chatInput = document.getElementById('chat-input');
const sendMsgBtn = document.getElementById('send-msg');

chatBtn.addEventListener('click', () => {
    chatWindow.classList.add('open');
});

closeChatBtn.addEventListener('click', () => {
    chatWindow.classList.remove('open');
});

function addMessage(text, type) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', type);
    msgDiv.innerHTML = text;
    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function processUserMessage(msg) {
    const lowerMsg = msg.toLowerCase();
    
    // Simulate thinking delay
    setTimeout(() => {
        if (lowerMsg.includes('projeto')) {
            addMessage('Meus projetos incluem este Portfólio Profissional, um Homelab com Linux Ubuntu, um Sistema de Cadastro e um Projeto em Estudo. Você pode vê-los detalhados na seção Projetos!', 'ai-msg');
        } else if (lowerMsg.includes('contato') || lowerMsg.includes('email') || lowerMsg.includes('linkedin')) {
            addMessage('Você pode falar comigo pelo email mauriciojr918@gmail.com ou me chamar no LinkedIn. Todos os links estão na seção de Contato.', 'ai-msg');
        } else if (lowerMsg.includes('habilidade') || lowerMsg.includes('experiência') || lowerMsg.includes('sobre')) {
            addMessage('Sou estudante de Engenharia de Software e ADS. Tenho foco em Infraestrutura, Cloud Computing (AWS), Linux e Redes, além de conhecimentos em programação.', 'ai-msg');
        } else if (lowerMsg.includes('olá') || lowerMsg.includes('oi') || lowerMsg.includes('bom dia') || lowerMsg.includes('boa tarde')) {
            addMessage('Olá! Como posso ajudar você a conhecer melhor o trabalho do Maurício?', 'ai-msg');
        } else {
            addMessage('Desculpe, sou um bot simples e ainda estou aprendendo. Tente me perguntar sobre "projetos", "contatos" ou "sobre mim".', 'ai-msg');
        }
    }, 600);
}

sendMsgBtn.addEventListener('click', () => {
    const msg = chatInput.value.trim();
    if (msg !== '') {
        addMessage(msg, 'user-msg');
        chatInput.value = '';
        processUserMessage(msg);
    }
});

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMsgBtn.click();
    }
});

/* =========================
   INICIALIZAÇÃO
========================= */
renderizarProjetos(projetos);

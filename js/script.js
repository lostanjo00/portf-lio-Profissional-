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
        nome: "Taranis Sales AI — Copiloto B2B",
        descricao: "Plataforma de Inteligência Artificial para equipes comerciais B2B. Inclui copiloto de contorno de objeções com cálculo dinâmico de TCO, gerador de e-mails consultivos, calculadora interativa com gráficos Plotly e simulador roleplay de negociação. Desenvolvido no Challenge Oracle ONE (G11) & Alura.",
        tecnologias: ["Python", "Streamlit", "GenAI", "Plotly", "Prompt Engineering"],
        categoria: "ia",
        link: "https://github.com/lostanjo00/Taranis-Sales-AI",
        linkDemo: "https://taranis-sales-ai.streamlit.app/"
    },
    {
        nome: "Portfólio Profissional",
        descricao: "Site pessoal para apresentar meus projetos e habilidades com suporte a modo escuro/claro e assistente virtual integrado.",
        tecnologias: ["HTML", "CSS", "JavaScript"],
        categoria: "frontend",
        link: "https://github.com/lostanjo00/portf-lio-Profissional-"
    },
    {
        nome: "Homelab Linux Ubuntu",
        descricao: "Laboratório prático utilizando Ubuntu Server. Configuração de SSH, Nginx, monitoramento de sistemas, firewall UFW e publicação de aplicações via Cloudflare Tunnel.",
        tecnologias: ["Linux", "Ubuntu", "Nginx", "Cloudflare", "Redes"],
        categoria: "infra",
        link: "https://github.com/lostanjo00"
    },
    {
        nome: "Sistema de Cadastro",
        descricao: "Projeto focado em lógica de programação e estrutura de dados.",
        tecnologias: ["JavaScript", "Lógica"],
        categoria: "backend",
        link: "https://github.com/lostanjo00"
    },
    {
        nome: "Projeto em Estudo",
        descricao: "Aplicação prática para consolidar conceitos fundamentais de desenvolvimento web.",
        tecnologias: ["HTML", "CSS"],
        categoria: "frontend",
        link: "https://github.com/lostanjo00"
    }
];

/* =========================
   RENDERIZAÇÃO DE PROJETOS
========================= */
const sectionProjetos = document.getElementById("projetos");

// Criar estrutura base uma vez com novo filtro de IA
sectionProjetos.innerHTML = `
    <h2>Projetos</h2>
    <div class="filtros">
        <button data-filter="all" class="ativo">Todos</button>
        <button data-filter="ia">Inteligência Artificial</button>
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
            <div class="projeto-links" style="display: flex; gap: 1.2rem; flex-wrap: wrap; margin-top: 1.2rem; align-items: center;">
                <a href="${projeto.link}" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github"></i> Ver no GitHub</a>
                ${projeto.linkDemo ? `<a href="${projeto.linkDemo}" target="_blank" rel="noopener noreferrer" style="color: #10b981; font-weight: 700;"><i class="fa-solid fa-arrow-up-right-from-square"></i> Testar App ao Vivo</a>` : ''}
            </div>
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
        if (lowerMsg.includes('projeto') || lowerMsg.includes('projetos') || lowerMsg.includes('ia') || lowerMsg.includes('taranis') || lowerMsg.includes('sales')) {
            addMessage('Meus principais projetos são:<br><br>🚀 <strong>Taranis Sales AI</strong>: Copiloto de Vendas B2B com IA Generativa e Streamlit (você pode testar ao vivo na web!);<br>🐧 <strong>Homelab Linux Ubuntu</strong>: Infraestrutura com Nginx, firewall UFW e Cloudflare Tunnel;<br>💻 <strong>Portfólio Profissional</strong>: Este site responsivo com tema dinâmico;<br>⚡ <strong>Sistema de Cadastro</strong> em JavaScript.<br><br>Dê uma olhada na seção <strong>Projetos</strong> para filtrar ou testar os links!', 'ai-msg');
        } else if (lowerMsg.includes('contato') || lowerMsg.includes('email') || lowerMsg.includes('linkedin')) {
            addMessage('Você pode falar comigo pelo e-mail <strong>mauriciojr918@gmail.com</strong> ou me chamar no LinkedIn. Todos os links estão na seção de Contato.', 'ai-msg');
        } else if (lowerMsg.includes('habilidade') || lowerMsg.includes('experiência') || lowerMsg.includes('sobre')) {
            addMessage('Sou estudante de Engenharia de Software e ADS. Tenho foco em Infraestrutura, Cloud Computing (AWS), Linux e Redes, além de soluções práticas em Inteligência Artificial Generativa e Frontend.', 'ai-msg');
        } else if (lowerMsg.includes('olá') || lowerMsg.includes('oi') || lowerMsg.includes('bom dia') || lowerMsg.includes('boa tarde')) {
            addMessage('Olá! Como posso ajudar você a conhecer melhor o trabalho do Maurício? Pergunte sobre <strong>projetos</strong>, <strong>IA</strong> ou <strong>contato</strong>!', 'ai-msg');
        } else {
            addMessage('Desculpe, sou um bot simples e ainda estou aprendendo. Tente me perguntar sobre "projetos", "IA", "contato" ou "sobre mim".', 'ai-msg');
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

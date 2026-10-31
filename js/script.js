/* =========================================================
   PORTFÓLIO PROFISSIONAL — MAURÍCIO RIBEIRO
   Tema: Dark Futurista / Quantum Tech
   JavaScript: Interatividade, Menu Mobile, Filtros & Chatbot IA
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. TEMA CLARO / ESCURO (PERSISTENTE EM LOCALSTORAGE)
    ===================================================== */
    const toggleBtn = document.getElementById("toggle-theme");
    const themeIcon = toggleBtn ? toggleBtn.querySelector("i") : null;

    function aplicarTemaSalvo() {
        const temaSalvo = localStorage.getItem("portfolio_theme") || "dark";

        if (temaSalvo === "light") {
            document.body.classList.add("light");
            if (themeIcon) {
                themeIcon.className = "fa-solid fa-sun";
            }
        } else {
            document.body.classList.remove("light");
            if (themeIcon) {
                themeIcon.className = "fa-solid fa-bolt-lightning";
            }
        }
    }

    if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {
            const isLight = document.body.classList.toggle("light");
            const novoTema = isLight ? "light" : "dark";
            localStorage.setItem("portfolio_theme", novoTema);

            if (themeIcon) {
                themeIcon.className = isLight ? "fa-solid fa-sun" : "fa-solid fa-bolt-lightning";
            }
        });
    }

    aplicarTemaSalvo();

    /* =====================================================
       2. MENU HAMBÚRGUER RESPONSIVO (MOBILE DRAWER)
    ===================================================== */
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const navLinks = document.getElementById("nav-links");
    const menuOverlay = document.getElementById("menu-overlay");

    function toggleMenu() {
        const isOpen = navLinks.classList.toggle("active");
        hamburgerBtn.classList.toggle("active");
        menuOverlay.classList.toggle("active");
        hamburgerBtn.setAttribute("aria-expanded", isOpen);
        document.body.style.overflow = isOpen ? "hidden" : "";
    }

    function fecharMenu() {
        navLinks.classList.remove("active");
        hamburgerBtn.classList.remove("active");
        menuOverlay.classList.remove("active");
        hamburgerBtn.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
    }

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener("click", toggleMenu);
    }

    if (menuOverlay) {
        menuOverlay.addEventListener("click", fecharMenu);
    }

    // Fechar menu mobile ao clicar em qualquer link de navegação
    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", fecharMenu);
    });

    /* =====================================================
       3. DESTAQUE DO LINK ATIVO NA NAVEGAÇÃO AO ROLAR
    ===================================================== */
    const sections = document.querySelectorAll("section[id]");

    function destacarLinkAtivo() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 130;
            const sectionId = current.getAttribute("id");
            const navLink = document.querySelector(`.nav-links a[href*="${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                if (navLink) navLink.classList.add("active");
            } else {
                if (navLink) navLink.classList.remove("active");
            }
        });
    }

    window.addEventListener("scroll", destacarLinkAtivo);

    /* =====================================================
       4. DADOS DOS PROJETOS (COMPLETO & DETALHADO)
    ===================================================== */
    const projetos = [
        {
            nome: "Taranis Sales AI — Copiloto B2B",
            badge: "⭐ Destaque IA & Negócios",
            destaque: true,
            descricao: "Plataforma de Inteligência Artificial para equipes comerciais B2B. Inclui copiloto de contorno de objeções com grounding factual em catálogo, calculadora dinâmica de TCO, gerador de e-mails consultivos e simulador roleplay. Desenvolvido para o Challenge Oracle ONE (G11) & Alura.",
            tecnologias: ["Python", "Streamlit", "GenAI", "Plotly", "Prompt Engineering"],
            categoria: "ia",
            link: "https://github.com/lostanjo00/Taranis-Sales-AI",
            linkDemo: "https://taranis-sales-ai.streamlit.app/"
        },
        {
            nome: "Homelab Linux Ubuntu Server",
            badge: "🐧 Infraestrutura & Cloud",
            destaque: false,
            descricao: "Laboratório prático de infraestrutura utilizando Ubuntu Server. Configurações de SSH seguro, Nginx como proxy reverso, monitoramento, firewall UFW e publicação de aplicações na internet por meio do Cloudflare Tunnel.",
            tecnologias: ["Linux", "Ubuntu", "Nginx", "Cloudflare", "SSH", "Redes"],
            categoria: "infra",
            link: "https://github.com/lostanjo00",
            linkDemo: null
        },
        {
            nome: "Portfólio Profissional Quantum",
            badge: "💻 Frontend & UI/UX",
            destaque: false,
            descricao: "Interface web de alta performance sob estética Dark Futurista, suporte a tema escuro/claro, menu hambúrguer responsivo para celular, filtros dinâmicos e assistente virtual inteligente integrado.",
            tecnologias: ["HTML5", "CSS3", "JavaScript", "Quantum Glass", "Mobile-First"],
            categoria: "frontend",
            link: "https://github.com/lostanjo00/portf-lio-Profissional-",
            linkDemo: "https://lostanjo00.github.io/portf-lio-Profissional-/"
        },
        {
            nome: "Sistema de Cadastro & Lógica",
            badge: "⚡ Backend & Dados",
            destaque: false,
            descricao: "Aplicação focada em lógica de programação estruturada, manipulação de dados e regras de validação cadastrais.",
            tecnologias: ["JavaScript", "Lógica", "Estrutura de Dados"],
            categoria: "backend",
            link: "https://github.com/lostanjo00",
            linkDemo: null
        },
        {
            nome: "Laboratório de Práticas Frontend",
            badge: "🌐 Prática Contínua",
            destaque: false,
            descricao: "Projetos práticos e experimentos para consolidar conceitos de responsividade, CSS Grid, Flexbox e acessibilidade na web.",
            tecnologias: ["HTML5", "CSS3", "JavaScript", "DOM"],
            categoria: "frontend",
            link: "https://github.com/lostanjo00",
            linkDemo: null
        }
    ];

    /* =====================================================
       5. RENDERIZAÇÃO DA GRADE DE PROJETOS
    ===================================================== */
    const projetosGrid = document.getElementById("projetos-grid");

    function renderizarProjetos(lista) {
        if (!projetosGrid) return;
        projetosGrid.innerHTML = "";

        lista.forEach(projeto => {
            const article = document.createElement("article");
            article.classList.add("projeto-card", "card-quantum");
            if (projeto.destaque) {
                article.classList.add("destaque");
            }

            const tagsHtml = projeto.tecnologias
                .map(tech => `<span class="projeto-tag">${tech}</span>`)
                .join("");

            const demoBtnHtml = projeto.linkDemo
                ? `<a href="${projeto.linkDemo}" target="_blank" rel="noopener noreferrer" class="link-btn link-demo">
                     <i class="fa-solid fa-arrow-up-right-from-square"></i> Testar App ao Vivo
                   </a>`
                : "";

            article.innerHTML = `
                <div>
                    <span class="projeto-badge">${projeto.badge}</span>
                    <h3 style="margin-top: 0.9rem; margin-bottom: 0.5rem;">${projeto.nome}</h3>
                    <p>${projeto.descricao}</p>
                </div>

                <div>
                    <div class="projeto-tags" style="margin-bottom: 1.2rem;">
                        ${tagsHtml}
                    </div>
                    <div class="projeto-links">
                        <a href="${projeto.link}" target="_blank" rel="noopener noreferrer" class="link-btn">
                            <i class="fa-brands fa-github"></i> Ver no GitHub
                        </a>
                        ${demoBtnHtml}
                    </div>
                </div>
            `;

            projetosGrid.appendChild(article);
        });

        // Animação de entrada suave
        observarCards();
    }

    function observarCards() {
        const cards = document.querySelectorAll(".projeto-card");
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                }
            });
        }, { threshold: 0.08 });

        cards.forEach(card => observer.observe(card));
    }

    /* =====================================================
       6. FILTROS DE CATEGORIA
    ===================================================== */
    const filtroBotoes = document.querySelectorAll(".filtro-btn");

    filtroBotoes.forEach(botao => {
        botao.addEventListener("click", () => {
            filtroBotoes.forEach(b => b.classList.remove("ativo"));
            botao.classList.add("ativo");

            const filtro = botao.dataset.filter;

            if (filtro === "all") {
                renderizarProjetos(projetos);
            } else {
                const filtrados = projetos.filter(p => p.categoria === filtro);
                renderizarProjetos(filtrados);
            }
        });
    });

    // Render inicial dos projetos
    renderizarProjetos(projetos);

    /* =====================================================
       7. CHATBOT ASSISTENTE VIRTUAL IA (HOLOGRÁFICO)
    ===================================================== */
    const chatBtn = document.getElementById("chatbot-btn");
    const chatWindow = document.getElementById("chatbot-window");
    const closeChatBtn = document.getElementById("close-chat");
    const chatBody = document.getElementById("chat-body");
    const chatInput = document.getElementById("chat-input");
    const sendMsgBtn = document.getElementById("send-msg");

    if (chatBtn && chatWindow) {
        chatBtn.addEventListener("click", () => {
            chatWindow.classList.add("open");
            if (chatInput) chatInput.focus();
        });
    }

    if (closeChatBtn && chatWindow) {
        closeChatBtn.addEventListener("click", () => {
            chatWindow.classList.remove("open");
        });
    }

    function addMessage(text, type) {
        const msgDiv = document.createElement("div");
        msgDiv.classList.add("message", type);
        msgDiv.innerHTML = text;
        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function processUserMessage(msg) {
        const lowerMsg = msg.toLowerCase().trim();

        // Feedback visual de processamento
        const typingIndicator = document.createElement("div");
        typingIndicator.classList.add("message", "ai-msg");
        typingIndicator.innerHTML = '<span class="terminal-prefix">&gt; PROCESSING_QUERY...</span>';
        chatBody.appendChild(typingIndicator);
        chatBody.scrollTop = chatBody.scrollHeight;

        setTimeout(() => {
            typingIndicator.remove();

            if (lowerMsg.includes("projeto") || lowerMsg.includes("taranis") || lowerMsg.includes("ia") || lowerMsg.includes("app")) {
                addMessage(`
                    <span class="terminal-prefix">&gt; QUERY_RESULT: PROJETOS</span>
                    🚀 <strong>Taranis Sales AI</strong>: Copiloto Comercial com IA Generativa, cálculo dinâmico de TCO e Streamlit no ar!<br>
                    🐧 <strong>Homelab Linux Ubuntu</strong>: Infraestrutura de servidores com Nginx, UFW e Cloudflare Tunnel;<br>
                    💻 <strong>Portfólio Profissional</strong>: Interface Quantum Tech com alta responsividade.<br><br>
                    Você pode selecionar o filtro <strong>Inteligência Artificial</strong> na seção Projetos para testar ao vivo!
                `, "ai-msg");
            } else if (lowerMsg.includes("contato") || lowerMsg.includes("email") || lowerMsg.includes("linkedin") || lowerMsg.includes("falar")) {
                addMessage(`
                    <span class="terminal-prefix">&gt; QUERY_RESULT: CONTACT_LINK</span>
                    📧 <strong>E-mail:</strong> mauriciojr918@gmail.com<br>
                    💼 <strong>LinkedIn:</strong> linkedin.com/in/mauriciiojr<br>
                    🐙 <strong>GitHub:</strong> github.com/lostanjo00<br><br>
                    Estou disponível para oportunidades de estágio e projetos na área de tecnologia!
                `, "ai-msg");
            } else if (lowerMsg.includes("habilidade") || lowerMsg.includes("tecnologia") || lowerMsg.includes("stack") || lowerMsg.includes("experiencia") || lowerMsg.includes("sobre")) {
                addMessage(`
                    <span class="terminal-prefix">&gt; QUERY_RESULT: TECH_STACK</span>
                    Estudante de <strong>Engenharia de Software</strong> e <strong>ADS</strong>.<br><br>
                    • <strong>IA & Dados:</strong> Python, IA Generativa, Streamlit, Plotly e Prompt Engineering;<br>
                    • <strong>Infraestrutura:</strong> Linux (Ubuntu Server), Nginx, Cloudflare Tunnel, Redes e AWS;<br>
                    • <strong>Frontend:</strong> HTML5, CSS3 moderno, JavaScript e Responsividade total.
                `, "ai-msg");
            } else if (lowerMsg.includes("ola") || lowerMsg.includes("olá") || lowerMsg.includes("oi") || lowerMsg.includes("bom dia") || lowerMsg.includes("boa tarde") || lowerMsg.includes("boa noite")) {
                addMessage(`
                    <span class="terminal-prefix">&gt; STATUS: 200_OK</span>
                    Olá! Prazer em falar com você! 👋<br><br>
                    Como posso te ajudar a conhecer melhor o trabalho e as competências do Maurício? Pergunte sobre <strong>projetos</strong>, <strong>IA</strong> ou <strong>contato</strong>!
                `, "ai-msg");
            } else {
                addMessage(`
                    <span class="terminal-prefix">&gt; TERMINAL_INFO:</span>
                    Sou o assistente de IA do Maurício e posso detalhar seus <strong>projetos</strong> (como o Taranis Sales AI e Homelab Linux), sua <strong>matriz tecnológica</strong> ou fornecer os canais de <strong>contato</strong> direto!
                `, "ai-msg");
            }
        }, 500);
    }

    function enviarMensagem() {
        if (!chatInput) return;
        const texto = chatInput.value.trim();
        if (texto !== "") {
            addMessage(texto, "user-msg");
            chatInput.value = "";
            processUserMessage(texto);
        }
    }

    if (sendMsgBtn) {
        sendMsgBtn.addEventListener("click", enviarMensagem);
    }

    if (chatInput) {
        chatInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                enviarMensagem();
            }
        });
    }

});

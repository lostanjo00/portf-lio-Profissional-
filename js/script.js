/* =========================
   DARK / LIGHT MODE
========================= */
const toggleBtn = document.getElementById("toggle-theme");

function aplicarTemaSalvo() {
    const temaSalvo = localStorage.getItem("theme");

    if (temaSalvo === "light") {
        document.body.classList.add("light");
        toggleBtn.textContent = "🌞 Modo claro";
    } else {
        document.body.classList.remove("light");
        toggleBtn.textContent = "🌙 Modo escuro";
    }
}

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");

    const temaAtual = document.body.classList.contains("light") ? "light" : "dark";
    localStorage.setItem("theme", temaAtual);

    toggleBtn.textContent =
        temaAtual === "light" ? "🌞 Modo claro" : "🌙 Modo escuro";
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

function renderizarProjetos(lista) {
    sectionProjetos.innerHTML = `
        <h2>Projetos</h2>

        <div class="filtros">
            <button data-filter="all">Todos</button>
            <button data-filter="frontend">Frontend</button>
            <button data-filter="backend">Backend</button>
        </div>
    `;

    lista.forEach(projeto => {
        const article = document.createElement("article");
        article.classList.add("projeto", "animate");

        article.innerHTML = `
            <h3>${projeto.nome}</h3>
            <p>${projeto.descricao}</p>
            <p><strong>Tecnologias:</strong> ${projeto.tecnologias.join(", ")}</p>
            <a href="${projeto.link}" target="_blank">Ver no GitHub</a>
        `;

        sectionProjetos.appendChild(article);
    });

    aplicarFiltro();
    observarAnimacoes();
}

/* =========================
   FILTRO DE PROJETOS
========================= */
function aplicarFiltro() {
    document.querySelectorAll(".filtros button").forEach(botao => {
        botao.addEventListener("click", () => {
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
   INICIALIZAÇÃO
========================= */
renderizarProjetos(projetos);

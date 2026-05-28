// Base de dados de produtos
const produtos = [
    // LATTAFA
    { id: 1, nome: "ASAD ELIXIR", marca: "LATTAFA", atacado: 190.00, varejo: 200.00 },
    { id: 2, nome: "ASAD PRETO", marca: "LATTAFA", atacado: 165.00, varejo: 175.00 },
    { id: 3, nome: "ASAD BOURBON", marca: "LATTAFA", atacado: 190.00, varejo: 200.00 },
    { id: 4, nome: "YARA ROSA", marca: "LATTAFA", atacado: 165.00, varejo: 175.00 },
    { id: 5, nome: "YARA CANDE", marca: "LATTAFA", atacado: 155.00, varejo: 165.00 },
    { id: 6, nome: "FAKHAR BLACK", marca: "LATTAFA", atacado: 175.00, varejo: 185.00 },
    { id: 7, nome: "FAKHAR GOLD", marca: "LATTAFA", atacado: 165.00, varejo: 175.00 },
    { id: 8, nome: "FAKHAR ROSA", marca: "LATTAFA", atacado: 230.00, varejo: 240.00 },
    
    // AL WATANIAH
    { id: 9, nome: "SABAH AL WARD", marca: "AL WATANIAH", atacado: 135.00, varejo: 145.00 },
    { id: 10, nome: "SABAH AL WARD SUGAR", marca: "AL WATANIAH", atacado: 150.00, varejo: 160.00 },
    { id: 11, nome: "AMEERATI", marca: "AL WATANIAH", atacado: 130.00, varejo: 140.00 },
    { id: 12, nome: "DURRAT AL AROOS", marca: "AL WATANIAH", atacado: 135.00, varejo: 145.00 },
    { id: 13, nome: "SHAGAF AL WARD", marca: "AL WATANIAH", atacado: 155.00, varejo: 165.00 },
    { id: 14, nome: "ATTAR AL WESAL", marca: "AL WATANIAH", atacado: 145.00, varejo: 155.00 },
    
    // ARMAF
    { id: 15, nome: "CLUP DE NUIT WOMAN", marca: "ARMAF", atacado: 190.00, varejo: 200.00 },
    { id: 16, nome: "CLUP DE NUIT INTENSE", marca: "ARMAF", atacado: 200.00, varejo: 210.00 },
    
    // ARQUS
    { id: 17, nome: "LA BELLA EAU DE PARFUM", marca: "ARQUS", atacado: 155.00, varejo: 165.00 },
    { id: 18, nome: "AL PINE HOMEM SPORT", marca: "ARQUS", atacado: 165.00, varejo: 175.00 },
    
    // MAISON ALHAMBRA
    { id: 19, nome: "SALVO INTENSE EAU DE PARFUM", marca: "MAISON ALHAMBRA", atacado: 150.00, varejo: 160.00 },
    { id: 20, nome: "YEAH! MAN EAU DE PARFUM", marca: "MAISON ALHAMBRA", atacado: 165.00, varejo: 175.00 },
    { id: 21, nome: "VICTORIOSO NERO EAU DE PARFUM", marca: "MAISON ALHAMBRA", atacado: 165.00, varejo: 175.00 }
];

let filtroAtual = 'todos';
let produtoSelecionado = null;

// Carregar produtos ao iniciar
document.addEventListener('DOMContentLoaded', () => {
    renderizarProdutos(produtos);
});

// Renderizar produtos na grid
function renderizarProdutos(lista) {
    const grid = document.getElementById('gridProdutos');
    grid.innerHTML = '';
    
    lista.forEach(produto => {
        const card = document.createElement('div');
        card.className = 'card-produto';
        card.innerHTML = `
            <div class="card-header">
                <h3>${produto.nome}</h3>
                <span class="marca-badge">${produto.marca}</span>
            </div>
            <div class="card-body">
                <div class="precos-card">
                    <div class="preco-row">
                        <span>Atacado (mín 3):</span>
                        <strong>R$ ${produto.atacado.toFixed(2)}</strong>
                    </div>
                    <div class="preco-row">
                        <span>Varejo:</span>
                        <strong>R$ ${produto.varejo.toFixed(2)}</strong>
                    </div>
                </div>
                <button class="ver-detalhes" onclick="abrirDetalhes(${produto.id})">
                    Ver Detalhes
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Filtrar por marca
function filtrarMarca(marca) {
    filtroAtual = marca;
    
    // Atualizar botões de filtro
    document.querySelectorAll('.filtro-btn').forEach(btn => {
        btn.classList.remove('ativo');
    });
    event.target.classList.add('ativo');
    
    // Filtrar produtos
    if (marca === 'todos') {
        renderizarProdutos(produtos);
    } else {
        const filtrados = produtos.filter(p => p.marca === marca);
        renderizarProdutos(filtrados);
    }
}

// Abrir modal com detalhes
function abrirDetalhes(id) {
    produtoSelecionado = produtos.find(p => p.id === id);
    
    if (produtoSelecionado) {
        document.getElementById('modalNome').textContent = produtoSelecionado.nome;
        document.getElementById('modalMarca').textContent = produtoSelecionado.marca;
        document.getElementById('modalAtacado').textContent = `R$ ${produtoSelecionado.atacado.toFixed(2)}`;
        document.getElementById('modalVarejo').textContent = `R$ ${produtoSelecionado.varejo.toFixed(2)}`;
        
        document.getElementById('modalProduto').classList.add('ativo');
    }
}

// Fechar modal
function fecharModal() {
    document.getElementById('modalProduto').classList.remove('ativo');
}

// Abrir WhatsApp com produto
function abrirWhatsapp() {
    if (produtoSelecionado) {
        const mensagem = `Olá! Tenho interesse no produto: *${produtoSelecionado.nome}* (${produtoSelecionado.marca})\n\nGostaria de saber mais detalhes e valores.`;
        const url = `https://wa.me/5519981367770?text=${encodeURIComponent(mensagem)}`;
        window.open(url, '_blank');
    }
}

// Fechar modal ao clicar fora
window.onclick = function(event) {
    const modal = document.getElementById('modalProduto');
    if (event.target === modal) {
        modal.classList.remove('ativo');
    }
}
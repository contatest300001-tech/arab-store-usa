// Senha de administrador (em produção, isso deveria ser verificado no backend)
const SENHA_ADMIN = '12345';
let usuarioAutenticado = false;
let produtosAdmin = [];

// Carregar dados ao iniciar
document.addEventListener('DOMContentLoaded', () => {
    verificarAutenticacao();
    carregarProdutos();
});

// Verificar se o usuário está autenticado
function verificarAutenticacao() {
    const autenticado = localStorage.getItem('adminAutenticado');
    if (autenticado === 'true') {
        usuarioAutenticado = true;
        mostrarPainel();
    } else {
        usuarioAutenticado = false;
        mostrarLogin();
    }
}

// Mostrar tela de login
function mostrarLogin() {
    document.getElementById('loginSection').style.display = 'block';
    document.getElementById('adminPanel').style.display = 'none';
}

// Mostrar painel admin
function mostrarPainel() {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('adminPanel').style.display = 'block';
    atualizarTabelaProdutos();
}

// Verificar senha
function verificarSenha() {
    const senha = document.getElementById('senhaAdmin').value;
    if (senha === SENHA_ADMIN) {
        usuarioAutenticado = true;
        localStorage.setItem('adminAutenticado', 'true');
        mostrarPainel();
    } else {
        alert('Senha incorreta!');
        document.getElementById('senhaAdmin').value = '';
    }
}

// Toggle para mostrar/ocultar senha
function toggleSenha() {
    const input = document.getElementById('senhaAdmin');
    input.type = input.type === 'password' ? 'text' : 'password';
}

// Fazer logout
function fazerLogout() {
    localStorage.removeItem('adminAutenticado');
    usuarioAutenticado = false;
    document.getElementById('senhaAdmin').value = '';
    mostrarLogin();
}

// Carregar produtos do localStorage
function carregarProdutos() {
    const produtos = localStorage.getItem('produtosAdmin');
    if (produtos) {
        produtosAdmin = JSON.parse(produtos);
    } else {
        // Produtos padrão se nenhum for encontrado
        produtosAdmin = [
            { id: 1, nome: "ASAD ELIXIR", marca: "LATTAFA", atacado: 190.00, varejo: 200.00 },
            { id: 2, nome: "ASAD PRETO", marca: "LATTAFA", atacado: 165.00, varejo: 175.00 },
            { id: 3, nome: "ASAD BOURBON", marca: "LATTAFA", atacado: 190.00, varejo: 200.00 },
            { id: 4, nome: "YARA ROSA", marca: "LATTAFA", atacado: 165.00, varejo: 175.00 },
            { id: 5, nome: "YARA CANDE", marca: "LATTAFA", atacado: 155.00, varejo: 165.00 },
            { id: 6, nome: "FAKHAR BLACK", marca: "LATTAFA", atacado: 175.00, varejo: 185.00 },
            { id: 7, nome: "FAKHAR GOLD", marca: "LATTAFA", atacado: 165.00, varejo: 175.00 },
            { id: 8, nome: "FAKHAR ROSA", marca: "LATTAFA", atacado: 230.00, varejo: 240.00 },
            { id: 9, nome: "SABAH AL WARD", marca: "AL WATANIAH", atacado: 135.00, varejo: 145.00 },
            { id: 10, nome: "SABAH AL WARD SUGAR", marca: "AL WATANIAH", atacado: 150.00, varejo: 160.00 },
            { id: 11, nome: "AMEERATI", marca: "AL WATANIAH", atacado: 130.00, varejo: 140.00 },
            { id: 12, nome: "DURRAT AL AROOS", marca: "AL WATANIAH", atacado: 135.00, varejo: 145.00 },
            { id: 13, nome: "SHAGAF AL WARD", marca: "AL WATANIAH", atacado: 155.00, varejo: 165.00 },
            { id: 14, nome: "ATTAR AL WESAL", marca: "AL WATANIAH", atacado: 145.00, varejo: 155.00 },
            { id: 15, nome: "CLUP DE NUIT WOMAN", marca: "ARMAF", atacado: 190.00, varejo: 200.00 },
            { id: 16, nome: "CLUP DE NUIT INTENSE", marca: "ARMAF", atacado: 200.00, varejo: 210.00 },
            { id: 17, nome: "LA BELLA EAU DE PARFUM", marca: "ARQUS", atacado: 155.00, varejo: 165.00 },
            { id: 18, nome: "AL PINE HOMEM SPORT", marca: "ARQUS", atacado: 165.00, varejo: 175.00 },
            { id: 19, nome: "SALVO INTENSE EAU DE PARFUM", marca: "MAISON ALHAMBRA", atacado: 150.00, varejo: 160.00 },
            { id: 20, nome: "YEAH! MAN EAU DE PARFUM", marca: "MAISON ALHAMBRA", atacado: 165.00, varejo: 175.00 },
            { id: 21, nome: "VICTORIOSO NERO EAU DE PARFUM", marca: "MAISON ALHAMBRA", atacado: 165.00, varejo: 175.00 }
        ];
        salvarProdutos();
    }
}

// Salvar produtos no localStorage
function salvarProdutos() {
    localStorage.setItem('produtosAdmin', JSON.stringify(produtosAdmin));
}

// Adicionar novo produto
function adicionarProduto() {
    const nome = document.getElementById('nomeProduto').value.trim();
    const marca = document.getElementById('marcaProduto').value;
    const atacado = parseFloat(document.getElementById('precoAtacado').value);
    const varejo = parseFloat(document.getElementById('precoVarejo').value);

    if (!nome || !atacado || !varejo) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    const novoId = Math.max(...produtosAdmin.map(p => p.id), 0) + 1;
    const novoProduto = {
        id: novoId,
        nome: nome,
        marca: marca,
        atacado: atacado,
        varejo: varejo
    };

    produtosAdmin.push(novoProduto);
    salvarProdutos();
    atualizarTabelaProdutos();
    
    // Limpar formulário
    document.getElementById('nomeProduto').value = '';
    document.getElementById('precoAtacado').value = '';
    document.getElementById('precoVarejo').value = '';
    
    alert('Produto adicionado com sucesso!');
}

// Deletar produto
function deletarProduto(id) {
    if (confirm('Tem certeza que deseja deletar este produto?')) {
        produtosAdmin = produtosAdmin.filter(p => p.id !== id);
        salvarProdutos();
        atualizarTabelaProdutos();
        alert('Produto deletado com sucesso!');
    }
}

// Atualizar tabela de produtos
function atualizarTabelaProdutos() {
    const tbody = document.getElementById('tabelaProdutos');
    tbody.innerHTML = '';
    
    produtosAdmin.forEach(produto => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${produto.id}</td>
            <td>${produto.nome}</td>
            <td>${produto.marca}</td>
            <td>R$ ${produto.atacado.toFixed(2)}</td>
            <td>R$ ${produto.varejo.toFixed(2)}</td>
            <td>
                <button class="btn-delete" onclick="deletarProduto(${produto.id})">Deletar</button>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    // Atualizar contagem de produtos
    document.getElementById('countProdutos').textContent = produtosAdmin.length;
}

// Salvar configurações da loja
function salvarConfigurações() {
    const email = document.getElementById('emailLoja').value;
    const instagram = document.getElementById('instagramLoja').value;
    const minimo = document.getElementById('minimoAtacado').value;
    
    const configuracoes = {
        email: email,
        instagram: instagram,
        minimoAtacado: minimo
    };
    
    localStorage.setItem('configLoja', JSON.stringify(configuracoes));
    alert('Configurações salvas com sucesso!');
}
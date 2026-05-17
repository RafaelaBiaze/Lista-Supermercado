const inputBusca = document.getElementById('input-busca');
const dropdown = document.getElementById('dropdown');

let minhaLista = JSON.parse(localStorage.getItem('minhaLista')) || [];

renderizarLista();

let produtosParaBusca = [];

// Carrega o arquivo JSON direto da pasta
async function carregarBancoDeDados() {
    try {
        const resposta = await fetch('products.json');
        produtosParaBusca = await resposta.json();
        console.log("Banco de produtos carregado!");
    } catch (erro) {
        console.error("Erro ao carregar produtos.json.", erro);
    }
}

carregarBancoDeDados();

inputBusca.addEventListener('input', (e) => {
    const termo = e.target.value.toLowerCase().trim();

    if (termo.length < 2) {
        dropdown.innerHTML = '';
        return;
    }

    // Filtra os produtos aqui mesmo no Front-end
    const resultados = produtosParaBusca
        .filter(p => p.toLowerCase().includes(termo))
        .slice(0, 10); // Mostra só os 10 primeiros

    dropdown.innerHTML = '';

    resultados.forEach(nomeProduto => {
        const item = document.createElement('div');
        item.classList.add('item-dropdown');
        item.textContent = nomeProduto;
        
        item.addEventListener('click', () => {
            adicionarNaLista(nomeProduto);
        });

        dropdown.appendChild(item);
    });
});

const btnAdicionarManual = document.getElementById('btn-adicionar-manual');

btnAdicionarManual.addEventListener('click', () => {
    const nomeDoInput = inputBusca.value.trim();

    if (nomeDoInput !== "") {
        adicionarNaLista(nomeDoInput);
    } else {
        inputBusca.focus();
    }
});

inputBusca.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const nomeDoInput = inputBusca.value.trim();
        if (nomeDoInput !== "") {
            adicionarNaLista(nomeDoInput);
        }
    }
});

function adicionarNaLista(nomeDoProduto) {
    const produtoExiste = minhaLista.find(item => item.nome === nomeDoProduto);

    if (produtoExiste) {
        produtoExiste.quantidade++;
    } else {
        minhaLista.push({
            id: Date.now(), 
            nome: nomeDoProduto,
            quantidade: 1,
            unidade: 'un'
        });
    }

    inputBusca.value = '';
    dropdown.innerHTML = '';
    renderizarLista();
}

function renderizarLista() {
    localStorage.setItem('minhaLista', JSON.stringify(minhaLista));
    const containerLista = document.getElementById('container-lista');
    const contadorTotal = document.getElementById('contador-total');
    containerLista.innerHTML = '';

    const totalDeItens = minhaLista.length;

    if (contadorTotal) {
        contadorTotal.textContent = `Total: ${totalDeItens} ${totalDeItens === 1 ? 'item' : 'itens'}`;
    }

    if (minhaLista.length === 0) {
        containerLista.innerHTML = '<p style="color: #888; text-align: center;">Sua lista está vazia.</p>';
        return;
    }

    minhaLista.forEach((item, index) => {
        const linha = document.createElement('div');
        linha.classList.add('linha-produto');

        const nomeSpan = document.createElement('span');
        nomeSpan.textContent = item.nome;
        linha.appendChild(nomeSpan);

        const inputQtd = document.createElement('input');
        inputQtd.type = 'number';
        inputQtd.value = item.quantidade;
        inputQtd.min = '0.1';
        inputQtd.step = item.unidade === 'un' ? '1' : '0.1';
        
        inputQtd.addEventListener('input', (e) => {
            minhaLista[index].quantidade = Number(e.target.value);
            renderizarLista();
        });
        linha.appendChild(inputQtd);

        const selectUnidade = document.createElement('select');
        const opcoes = ['un', 'kg', 'g', 'L', 'ml'];
        
        opcoes.forEach(op => {
            const option = document.createElement('option');
            option.value = op;
            option.textContent = op;
            if (item.unidade === op) option.selected = true;
            selectUnidade.appendChild(option);
        });

        selectUnidade.addEventListener('change', (e) => {
            minhaLista[index].unidade = e.target.value;
            renderizarLista(); // Re-renderiza para ajustar o 'step' do input e o resumo
        });
        linha.appendChild(selectUnidade);

        const botaoExcluir = document.createElement('button');
        botaoExcluir.textContent = '❌';
        botaoExcluir.classList.add('btn-excluir');
        
        botaoExcluir.addEventListener('click', () => {
            excluirDaLista(item.id);
        });
        linha.appendChild(botaoExcluir);

        containerLista.appendChild(linha);
    });
}

function excluirDaLista(idProduto) {
    minhaLista = minhaLista.filter(item => item.id !== idProduto);
    renderizarLista();
}

const btnPDF = document.getElementById('btn-pdf');

btnPDF.addEventListener('click', () => {
    if (minhaLista.length === 0) return alert("Lista vazia!");

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // 1. Título do Documento
    doc.setFontSize(24);
    doc.setTextColor(40);
    doc.text("Lista de Supermercado", 14, 22);

    // 2. Data
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text(`Gerado em: ${new Date().toLocaleDateString()}`, 14, 30);

    const linhasTabela = minhaLista.map(item => [
        item.nome,
        item.unidade === 'un' ? item.quantidade : '-', 
        item.unidade !== 'un' ? `${item.quantidade} ${item.unidade}` : '-' 
    ]);

    doc.autoTable({
        startY: 38,
        head: [['Produto', 'Qtd (un)', 'Peso / Volume']],
        body: linhasTabela,
        theme: 'striped',
        headStyles: { 
            fillColor: [46, 204, 113],
            fontSize: 14, // Fonte do cabeçalho
            cellPadding: 4
        },
        styles: { 
            fontSize: 12, // Fonte do corpo da tabela
            cellPadding: 6
        },
        columnStyles: {
            1: { halign: 'center' },
            2: { halign: 'center' }
        }
    });

    // 4. Contagem do produtos
    const finalY = doc.lastAutoTable.finalY;
    const totalGeral = minhaLista.length;

    doc.setFontSize(16);
    doc.setTextColor(40);
    doc.setFont(undefined, 'bold');
    
    // Texto Total no PDF
    doc.text(`Total de Itens na Lista: ${totalGeral}`, 14, finalY + 15);
    
    doc.save('lista-compras.pdf');
});
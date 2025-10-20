// index.js

function calcularRebalanceamentoComAporte(listaDeInvestimentos, valorDoAporte) {
    // Passo 1: Calcular o valor total atual da carteira
    const valorTotalAtual = listaDeInvestimentos.reduce((acc, inv) => acc + inv.valorAtual, 0);

    // Passo 2: Calcular o novo valor total da carteira após o aporte
    const valorTotalNovo = valorTotalAtual + valorDoAporte;

    // Passo 3: Calcular quanto falta para cada ativo atingir seu objetivo
    const valoresFaltantes = listaDeInvestimentos.map(investimento => {
        const valorObjetivo = valorTotalNovo * (investimento.percentualObjetivo / 100);
        let valorFaltante = valorObjetivo - investimento.valorAtual;
        
        // Se o ativo já está acima do objetivo, não vamos aportar nele.
        if (valorFaltante < 0) {
            valorFaltante = 0;
        }

        return { nome: investimento.nome, valor: valorFaltante };
    });

    const somaDosAportesSugeridos = valoresFaltantes.reduce((acc, item) => acc + item.valor, 0);

    // Passo 4: Distribuir o aporte de forma proporcional
    let resultadoAlocacao = [];

    if (somaDosAportesSugeridos === 0) {
        // Se a carteira já está balanceada ou super-alocada, distribui conforme o objetivo
        resultadoAlocacao = listaDeInvestimentos.map(inv => ({
            nomeInvestimento: inv.nome,
            valorAportar: valorDoAporte * (inv.percentualObjetivo / 100)
        }));
    } else {
        resultadoAlocacao = valoresFaltantes.map(item => {
            const proporcao = item.valor / somaDosAportesSugeridos;
            const valorAportar = valorDoAporte * proporcao;
            return { nomeInvestimento: item.nome, valorAportar: valorAportar };
        });
    }

    // Passo 5: Retornar o resultado formatado
    return resultadoAlocacao.map(res => ({
        ...res,
        valorAportar: res.valorAportar.toFixed(2) // Formata para duas casas decimais
    }));
}

// --- Exemplo de Uso ---
const minhaCarteira = [
    { nome: 'Ações', valorAtual: 8000, percentualObjetivo: 50 },
    { nome: 'FIIs', valorAtual: 5000, percentualObjetivo: 30 },
    { nome: 'Renda Fixa', valorAtual: 4000, percentualObjetivo: 15 },
    { nome: 'Cripto', valorAtual: 3000, percentualObjetivo: 5 },
];

const meuAporte = 1350;

const alocacaoSugerida = calcularRebalanceamentoComAporte(minhaCarteira, meuAporte);

console.log("Sugestão de Alocação do Aporte:");
console.table(alocacaoSugerida);
// --- CALCULATION FUNCTION ---

function calcularRebalanceamentoComAporte(listaDeInvestimentos, valorDoAporte) {
    // Step 1: Calculate current total value
    const valorTotalAtual = listaDeInvestimentos.reduce((acc, inv) => acc + inv.valorAtual, 0);

    // Step 2: Calculate new total value after investment
    const valorTotalNovo = valorTotalAtual + valorDoAporte;

    // Step 3: Calculate how much is missing for each asset
    const valoresFaltantes = listaDeInvestimentos.map(investimento => {
        const valorObjetivo = valorTotalNovo * (investimento.percentualObjetivo / 100);
        let valorFaltante = valorObjetivo - investimento.valorAtual;
        
        if (valorFaltante < 0) {
            valorFaltante = 0;
        }
        return { nome: investimento.nome, valor: valorFaltante };
    });

    const somaDosAportesSugeridos = valoresFaltantes.reduce((acc, item) => acc + item.valor, 0);

    // Step 4: Distribute the investment proportionally
    let resultadoAlocacao = [];

    if (somaDosAportesSugeridos === 0) {
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

    // Step 5: Return the formatted result
    return resultadoAlocacao.map(res => ({
        ...res,
        valorAportar: res.valorAportar.toFixed(2) // Format to 2 decimal places
    }));
}

// --- YOUR PORTFOLIO DATA (Hardcoded for this example) ---
const minhaCarteira = [
    { nome: 'Stocks (US)', valorAtual: 8000, percentualObjetivo: 50 },
    { nome: 'REITs (FIIs)', valorAtual: 5000, percentualObjetivo: 30 },
    { nome: 'Bonds (Renda Fixa)', valorAtual: 4000, percentualObjetivo: 15 },
    { nome: 'Crypto', valorAtual: 3000, percentualObjetivo: 5 },
];


// --- CODE TO CONNECT HTML TO JAVASCRIPT ---

// 1. Get references to the HTML elements
const inputElement = document.getElementById("aporte-value");
const calculateButton = document.getElementById("calculate-btn");
const resultsDiv = document.getElementById("results-container");

// 2. Add an "event listener" to the button.
calculateButton.addEventListener("click", handleCalculation);

// 3. This function runs when the button is clicked
function handleCalculation() {
    // 3.1. Get the value from the input box and convert it to a number
    const aporteValue = parseFloat(inputElement.value);

    // 3.2. Simple validation
    if (isNaN(aporteValue) || aporteValue <= 0) {
        resultsDiv.innerHTML = "<p class='error'>Please enter a valid positive number.</p>";
        return;
    }

    // 3.3. CALL FUNCTION with the portfolio data and the user's input
    const suggestedAllocation = calcularRebalanceamentoComAporte(minhaCarteira, aporteValue);

    // 3.4. Display the results on the page
    displayResults(suggestedAllocation);
}

// 4. A helper function to build the HTML for the results
function displayResults(allocationArray) {
    // Clear any old results
    resultsDiv.innerHTML = "";

    // Loop through each item in the results and create a new HTML element for it
    allocationArray.forEach(item => {
        // Create a new <p> (paragraph) element
        const p = document.createElement("p");
        // Add a CSS class to it for styling
        p.className = "result-item";
        // Set its text content
        p.textContent = `${item.nomeInvestimento}: $${item.valorAportar}`;
        // Add the new <p> element to our results <div>
        resultsDiv.appendChild(p);
    });
}
# 📊 Portfolio Rebalancing Calculator with Contribution

![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-yellow?style=for-the-badge&logo=javascript)
![Node.js](https://img.shields.io/badge/Node.js-14%2B-green?style=for-the-badge&logo=node.js)

## 🎯 About The Project

This is a simple JavaScript script that helps investors decide how to allocate a new financial contribution (deposit) to rebalance their investment portfolio.

The main goal is to use the contribution to buy assets that are furthest "behind" their target percentage, avoiding the need to sell assets (and potentially pay taxes or fees) to rebalance the portfolio.

## ✨ Features

* Calculates the current total value and the new total value of the portfolio (with the contribution).
* Identifies the amount needed for each asset to reach its target percentage.
* Distributes the contribution proportionally **only** to the assets that are below their target.
* Formats the allocation result to two decimal places.

## 🚀 Tech Stack

* **JavaScript (ES6+)**
* **Node.js** (for local script execution)

## ⚙️ Getting Started

You will need [Node.js](https://nodejs.org/) installed on your machine.

1.  **Clone this repository:**
    ```bash
    git clone [https://github.com/YOUR-USERNAME/YOUR-PROJECT.git](https://github.com/YOUR-USERNAME/YOUR-PROJECT.git)
    ```
    (Replace `YOUR-USERNAME/YOUR-PROJECT` with your actual username and repository name)

2.  **Navigate to the project directory:**
    ```bash
    cd YOUR-PROJECT
    ```

3.  **Run the script:**
    ```bash
    node index.js
    ```

## 📋 Example Output

When running the `index.js` script with the sample data, you will see this output in your terminal:
| nomeInvestimento | valorAportar |
| :--- | :--- |
| Ações | 1508.62 |
| FIIs | 344.83 |
| Renda Fixa | 146.55 |
| Cripto | 0.00 |

*(In this example, the 'Cripto' asset received no contribution, as it was already above its target percentage after calculating the new total value.)*


## 🔧 How to Use With Your Data

To use your own portfolio, open the `index.js` file and modify these two variables at the end of the file:

```javascript
// --- Example Usage ---

// 1. Modify this variable with your assets
const minhaCarteira = [
    { nome: 'Ações', valorAtual: 8000, percentualObjetivo: 50 }, // 'Stocks'
    { nome: 'FIIs', valorAtual: 5000, percentualObjetivo: 30 }, // 'REITs'
    { nome: 'Renda Fixa', valorAtual: 4000, percentualObjetivo: 15 }, // 'Fixed Income'
    { nome: 'Cripto', valorAtual: 3000, percentualObjetivo: 5 }, // 'Crypto'
];

// 2. Modify this variable with your contribution amount
const meuAporte = 2000;

// ... the rest of the code ...

🧠 Calculation Logic
The algorithm follows these steps:

Calculate New Total: Sums the valorTotalAtual (Current Total Value) with the valorDoAporte (Contribution Amount).

Identify Deficit: For each asset, it calculates its valorObjetivo (Target Value) (e.g., 50% of the new total). Then, it subtracts the valorAtual (Current Value) to find the "missing amount".

Ignore Over-Allocated: If an asset has already exceeded its target (missing amount < 0), it is set to zero and will not receive any contribution.

Calculate Proportion: The script sums all "missing amounts" (only from assets in deficit) to get a totalAFinanciar (Total to Finance).

Distribute Contribution: The valorDoAporte is divided among the assets in deficit, proportional to the "weight" that each asset's "missing amount" has in the totalAFinanciar.

📜 License
Distributed under the MIT License. See the LICENSE file for more information.

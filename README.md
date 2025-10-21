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
